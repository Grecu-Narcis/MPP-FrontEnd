import './App.css';
import { DisplayUsersPage } from './pages/Display Data Page/DisplayUsersPage';
import { User } from './models/User';
import { AddUserPage } from './pages/Add User Page/AddUserPage';

import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { UsersContextProvider } from './contexts/UsersContext';
import { EditUserPage } from './pages/Edit User Page/EditUserPage';
import { ModalContextProvider } from './contexts/ModalContext';

let demoUser1: User = new User('Narcis', 'Grecu', 'narcis.jpg');
let demoUser2: User = new User('Bogdan', 'Ciornohac', 'bogdan.jpg');

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
                        <Route path='/' element={<DisplayUsersPage />} />
                        <Route path='/addUser' element={<AddUserPage />} />
                        <Route path='/editUser/:userId' element={<EditUserPage />} />
                    </Routes>
                </BrowserRouter>
            </ModalContextProvider>
        </UsersContextProvider>
    );
}

export default App;
