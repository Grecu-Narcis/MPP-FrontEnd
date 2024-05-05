import './App.css';
import { User } from './models/user';

import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import React, { Suspense, useEffect, useState } from 'react';
import { UsersContextProvider } from './contexts/UsersContext';
import LoadingPage from './pages/Loading Page/LoadingPage';
import ChartPage from './pages/Chart Page/ChartPage';
import { PagingContextProvider } from './contexts/PagingContext';
import { convertDtoToUser } from './services/Users Service/UsersService';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { UserDTO } from './types/UserDTO.types';
import { DisplayCarsPage } from './pages/Display Data Page/Display Cars For User Page/DisplayCarsPage';
import { CarForm } from './features/CRUD Operations/Car Form/CarFormPage';
import { ConnectionStatusContextProvider } from './contexts/ConnectionStatusContext';
import { UploadImage } from './pages/Upload Image/UploadImage';
import { ViewImagePage } from './pages/Upload Image/GetImage';

const DisplayUsersPage = React.lazy(() => import('./pages/Display Data Page/Display Users Page/DisplayUsersPage'));
const AddUserPage = React.lazy(() => import('./pages/Add User Page/AddUserPage'));
const EditUserPage = React.lazy(() => import('./pages/Edit User Page/EditUserPage'));

const pageSize = 3;

function App() {
    const [users, setUsers] = useState<User[]>([]);

    const [currentUsers, setCurrentUsers] = useState<User[]>(users.slice(0, pageSize));
    const [currentPage, setCurrentPage] = useState<number>(1);

    const addUser = (newUser: User) => {
        setUsers((prevState: User[]) => [...prevState, newUser]);
    };

    const removeUser = (userId: number) => {
        setUsers((prevState: User[]) => prevState.filter((user) => user.getId() !== userId));
    };

    useEffect(() => {
        if (!localStorage.getItem('users')) localStorage.setItem('users', JSON.stringify([]));
        // if (!localStorage.getItem('images')) localStorage.setItem('images', JSON.stringify([]));

        // getAllUsers().then((users) => {
        //     setUsers(users);
        //     setCurrentUsers(users.slice(0, pageSize));
        // });

        const sock = new SockJS('http://localhost:8080/websocket');
        const stompClient = Stomp.over(sock);

        stompClient.connect({}, () => {
            stompClient.subscribe('/topic/users', (message) => {
                const usersDTO: UserDTO[] = JSON.parse(message.body);
                const usersReceived = usersDTO.map((userDTO) => convertDtoToUser(userDTO));

                setUsers((prevState: User[]) => [...prevState, ...usersReceived]);
            });
        });
    }, []);

    return (
        <ConnectionStatusContextProvider>
            <UsersContextProvider userContext={{ users, addUser, removeUser }}>
                <PagingContextProvider
                    pagingContext={{
                        currentUsers,
                        setCurrentUsers,
                        currentPage,
                        setCurrentPage,
                        pageSize: pageSize,
                    }}
                >
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
                            <Route path='/addImage' element={<UploadImage />} />
                            <Route path='/viewCarz' element={<ViewImagePage />} />
                            <Route path='*' element={<Navigate to={'/'} />} />
                        </Routes>
                    </BrowserRouter>
                </PagingContextProvider>
            </UsersContextProvider>
        </ConnectionStatusContextProvider>
    );
}

export default App;
