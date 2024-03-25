import './App.css';
import { User } from './models/User';

import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import React, { Suspense, useEffect, useState } from 'react';
import { UsersContextProvider } from './contexts/UsersContext';
import { ModalContextProvider } from './contexts/ModalContext';

let demoUser1: User = new User('Narcis', 'Grecu', 'narcis.jpg', 20);
let demoUser2: User = new User('Bogdan', 'Ciornohac', 'bogdan.jpg', 21);

const DisplayUsersPage = React.lazy(() => import('./pages/Display Data Page/DisplayUsersPage'));
const AddUserPage = React.lazy(() => import('./pages/Add User Page/AddUserPage'));
const EditUserPage = React.lazy(() => import('./pages/Edit User Page/EditUserPage'));

function App() {
    let [users, setUsers] = useState<User[]>([demoUser1, demoUser2]);
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
            <ModalContextProvider modalContext={{ modalStatus, setModalStatus, userId, setUserId, removeUser }}>
                <BrowserRouter>
                    <Routes>
                        <Route
                            path='/'
                            element={
                                <Suspense fallback={<div>Loading...</div>}>
                                    <DisplayUsersPage />
                                </Suspense>
                            }
                        />

                        <Route
                            path='/addUser'
                            element={
                                <Suspense fallback={<div>Loading...</div>}>
                                    <AddUserPage />
                                </Suspense>
                            }
                        />

                        <Route
                            path='/editUser/:userId'
                            element={
                                <Suspense fallback={<div>Loading...</div>}>
                                    <EditUserPage />
                                </Suspense>
                            }
                        />

                        <Route path='*' element={<Navigate to={'/'} />} />
                    </Routes>
                </BrowserRouter>
            </ModalContextProvider>
        </UsersContextProvider>
    );
}

export default App;
