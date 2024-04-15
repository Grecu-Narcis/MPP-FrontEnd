import './App.css';
import { User } from './models/user';

import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import React, { Suspense, useEffect, useState } from 'react';
import { UsersContextProvider } from './contexts/UsersContext';
import LoadingPage from './pages/Loading Page/LoadingPage';
import ChartPage from './pages/Chart Page/ChartPage';
import { PagingContextProvider } from './contexts/PagingContext';
import { convertDtoToUser, getAllUsers } from './services/Users Service/UsersService';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { UserDTO } from './types/UserDTO.types';
import { DisplayCarsPage } from './pages/Display Data Page/Display Cars For User Page/DisplayCarsPage';
import { CarForm } from './features/CRUD Operations/Car Form/CarFormPage';

const DisplayUsersPage = React.lazy(() => import('./pages/Display Data Page/Display Users Page/DisplayUsersPage'));
const AddUserPage = React.lazy(() => import('./pages/Add User Page/AddUserPage'));
const EditUserPage = React.lazy(() => import('./pages/Edit User Page/EditUserPage'));

const pageSize = 3;

function App() {
    let [users, setUsers] = useState<User[]>([
        /*demoUser1, demoUser2, demoUser3, demoUser4, demoUser5, demoUser6, demoUser7*/
    ]);

    let [currentUsers, setCurrentUsers] = useState<User[]>(users.slice(0, pageSize));
    let [currentPage, setCurrentPage] = useState<number>(1);

    // const socket = new WebSocket('ws://localhost:8080/websocket');

    const addUser = (newUser: User) => {
        setUsers((prevState: User[]) => [...prevState, newUser]);
    };

    const removeUser = (userId: number) => {
        setUsers((prevState: User[]) => prevState.filter((user) => user.getId() !== userId));
    };

    useEffect(() => {
        getAllUsers().then((users) => {
            setUsers(users);
            setCurrentUsers(users.slice(0, pageSize));
        });

        const sock = new SockJS('http://localhost:8080/websocket');
        const stompClient = Stomp.over(sock);

        stompClient.connect({}, () => {
            stompClient.subscribe('/topic/users', (message) => {
                // console.log('-------------------------------');
                // console.log('Received message: ', message.body);
                let usersDTO: UserDTO[] = JSON.parse(message.body);
                let usersReceived = usersDTO.map((userDTO) => convertDtoToUser(userDTO));

                setUsers((prevState: User[]) => [...prevState, ...usersReceived]);
            });
        });
    }, []);

    return (
        <UsersContextProvider userContext={{ users, addUser, removeUser }}>
            <PagingContextProvider pagingContext={{ currentUsers, setCurrentUsers, currentPage, setCurrentPage, pageSize: pageSize }}>
                <BrowserRouter>
                    <Routes>
                        <Route path='/loading' element={<LoadingPage />} />
                        <Route
                            path='/'
                            element={
                                <Suspense fallback={<LoadingPage />}>
                                    <DisplayUsersPage />
                                </Suspense>
                            }
                        />
                        <Route
                            path='/addUser'
                            element={
                                <Suspense fallback={<LoadingPage />}>
                                    <AddUserPage />
                                </Suspense>
                            }
                        />
                        <Route
                            path='/editUser/:userId'
                            element={
                                <Suspense fallback={<LoadingPage />}>
                                    <EditUserPage />
                                </Suspense>
                            }
                        />
                        <Route path='/chart' element={<ChartPage />} />

                        <Route path='/cars/:userId' element={<DisplayCarsPage />} />

                        <Route path='/viewCar/:carId' element={<CarForm />} />
                        <Route path='*' element={<Navigate to={'/'} />} />
                    </Routes>
                </BrowserRouter>
            </PagingContextProvider>
        </UsersContextProvider>
    );
}

export default App;
