import './App.css';
import { User } from './models/user';

import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import React, { Suspense, useEffect, useState } from 'react';
import LoadingPage from './pages/Loading Page/LoadingPage';
import ChartPage from './pages/Chart Page/ChartPage';
import { PagingContextProvider } from './contexts/PagingContext';
import { convertDtoToUser } from './services/Users Service/UsersService';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { UserDTO } from './types/UserDTO.types';
import { ConnectionStatusContextProvider } from './contexts/ConnectionStatusContext';
import { endPointUrl } from './services/config';

const RegistrationPage = React.lazy(() => import('./pages/Registration Page/RegistrationPage'));
const LoginPage = React.lazy(() => import('./pages/Login Page/LoginPage'));
const LandingPage = React.lazy(() => import('./pages/Landing Page/LandingPage'));
const DisplayCarsPage = React.lazy(() => import('./pages/Display Data Page/Display Cars For User Page/DisplayCarsPage'));
const CarDetailsPage = React.lazy(() => import('./pages/Car Details Page/CarFormPage'));

const pageSize = 3;

document.title = 'TravelWheels';

function App() {
    const [users, setUsers] = useState<User[]>([]);

    const [currentUsers, setCurrentUsers] = useState<User[]>(users.slice(0, pageSize));
    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {
        if (!localStorage.getItem('users')) localStorage.setItem('users', JSON.stringify([]));
        // if (!localStorage.getItem('images')) localStorage.setItem('images', JSON.stringify([]));

        // getAllUsers().then((users) => {
        //     setUsers(users);
        //     setCurrentUsers(users.slice(0, pageSize));
        // });

        const sock = new SockJS(endPointUrl + '/websocket');
        const stompClient = Stomp.over(sock);

        stompClient.connect({}, () => {
            stompClient.subscribe('/topic/users', (message) => {
                const usersDTO: UserDTO[] = JSON.parse(message.body);
                const usersReceived = usersDTO.map((userDTO) => convertDtoToUser(userDTO));

                setUsers((prevState: User[]) => [...prevState, ...usersReceived]);
            });
        });

        const handleBeforeUnload = () => {
            localStorage.removeItem('authToken');
            localStorage.removeItem('userId');
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, []);

    return (
        <ConnectionStatusContextProvider>
            {/* <UsersContextProvider userContext={{ users, addUser, removeUser }}> */}
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
                        <Route
                            path='/register'
                            element={
                                <Suspense fallback={<LoadingPage />}>
                                    <RegistrationPage />
                                </Suspense>
                            }
                        />
                        <Route
                            path='/login'
                            element={
                                <Suspense fallback={<LoadingPage />}>
                                    <LoginPage />
                                </Suspense>
                            }
                        />

                        <Route
                            path='/Home'
                            element={
                                <Suspense fallback={<LoadingPage />}>
                                    <LandingPage />
                                </Suspense>
                            }
                        />

                        <Route path='/chart' element={<ChartPage />} />

                        <Route
                            path='/cars/:userId'
                            element={
                                <Suspense fallback={<LoadingPage />}>
                                    <DisplayCarsPage />
                                </Suspense>
                            }
                        />

                        <Route
                            path='/viewCar/:carId'
                            element={
                                <Suspense fallback={<LoadingPage />}>
                                    <CarDetailsPage />
                                </Suspense>
                            }
                        />
                        <Route path='*' element={<Navigate to={'/home'} />} />
                    </Routes>
                </BrowserRouter>
            </PagingContextProvider>
            {/* </UsersContextProvider> */}
        </ConnectionStatusContextProvider>
    );
}

export default App;
