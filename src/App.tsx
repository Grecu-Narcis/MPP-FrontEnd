import './App.css';
import { User } from './models/User';

import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import React, { Suspense, useEffect, useState } from 'react';
import { UsersContextProvider } from './contexts/UsersContext';
import LoadingPage from './pages/Loading Page/LoadingPage';
import ChartPage from './pages/Chart Page/ChartPage';
import { PagingContextProvider } from './contexts/PagingContext';
import { getAllUsers } from './services/Users Service/UsersService';

const DisplayUsersPage = React.lazy(() => import('./pages/Display Data Page/DisplayUsersPage'));
const AddUserPage = React.lazy(() => import('./pages/Add User Page/AddUserPage'));
const EditUserPage = React.lazy(() => import('./pages/Edit User Page/EditUserPage'));

const pageSize = 3;

function App() {
    let [users, setUsers] = useState<User[]>([
        /*demoUser1, demoUser2, demoUser3, demoUser4, demoUser5, demoUser6, demoUser7*/
    ]);

    let [currentUsers, setCurrentUsers] = useState<User[]>(users.slice(0, pageSize));
    let [currentPage, setCurrentPage] = useState<number>(1);

    const addUser = (newUser: User) => {
        setUsers((prevState: User[]) => [...prevState, newUser]);
    };

    const removeUser = (userId: string) => {
        setUsers((prevState: User[]) => prevState.filter((user) => user.getId() !== userId));
    };

    useEffect(() => {
        getAllUsers().then((users) => {
            setUsers(users);
            setCurrentUsers(users.slice(0, pageSize));
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

                        <Route path='*' element={<Navigate to={'/'} />} />
                    </Routes>
                </BrowserRouter>
            </PagingContextProvider>
        </UsersContextProvider>
    );
}

export default App;
