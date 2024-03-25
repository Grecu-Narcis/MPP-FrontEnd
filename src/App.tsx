import './App.css';
import { User } from './models/User';

import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import React, { Suspense, useEffect, useState } from 'react';
import { UsersContextProvider } from './contexts/UsersContext';
import { ModalContextProvider } from './contexts/ModalContext';
import LoadingPage from './pages/Loading Page/LoadingPage';
import ChartPage from './pages/Chart Page/ChartPage';
import { PagingContextProvider } from './contexts/PagingContext';

let demoUser1: User = new User('Narcis', 'Grecu', 'narcis.jpg', 20);
let demoUser2: User = new User('Bogdan', 'Ciornohac', 'bogdan.jpg', 21);
let demoUser3: User = new User('User3', 'Test', 'dog.jpg', 18);
let demoUser4: User = new User('User4', 'Test', 'dog.jpg', 24);
let demoUser5: User = new User('User5', 'Test', 'dog.jpg', 25);
let demoUser6: User = new User('User6', 'Test', 'dog.jpg', 24);
let demoUser7: User = new User('User7', 'Test', 'dog.jpg', 28);

const DisplayUsersPage = React.lazy(() => import('./pages/Display Data Page/DisplayUsersPage'));
const AddUserPage = React.lazy(() => import('./pages/Add User Page/AddUserPage'));
const EditUserPage = React.lazy(() => import('./pages/Edit User Page/EditUserPage'));

const pageSize = 3;

function App() {
    let [users, setUsers] = useState<User[]>([demoUser1, demoUser2, demoUser3, demoUser4, demoUser5, demoUser6, demoUser7]);

    let [currentUsers, setCurrentUsers] = useState<User[]>(users.slice(0, pageSize));
    let [currentPage, setCurrentPage] = useState<number>(1);

    let [modalStatus, setModalStatus] = useState<boolean>(false);
    let [userId, setUserId] = useState<number>(-1);

    const addUser = (newUser: User) => {
        setUsers((prevState: User[]) => [...prevState, newUser]);
    };

    const removeUser = (userId: number) => {
        setUsers((prevState: User[]) => prevState.filter((user) => user.getId() !== userId));
    };

    useEffect(() => {
        console.log(users);
    });

    return (
        <UsersContextProvider userContext={{ users, addUser, removeUser }}>
            <PagingContextProvider pagingContext={{ currentUsers, setCurrentUsers, currentPage, setCurrentPage, pageSize: pageSize }}>
                <ModalContextProvider modalContext={{ modalStatus, setModalStatus, userId, setUserId, removeUser }}>
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
                </ModalContextProvider>
            </PagingContextProvider>
        </UsersContextProvider>
    );
}

export default App;
