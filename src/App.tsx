import './App.css';
import { DisplayUsersPage } from './pages/Display Data Page/DisplayUsersPage';
import { User } from './models/user';
import { AddUserPage } from './pages/Add User Page/AddUserPage';

import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { UsersContextProvider } from './contexts/UsersContext';
import { EditUserPage } from './pages/Edit User Page/EditUserPage';

let demoUser1: User = new User(1, 'Narcis', 'Grecu', 'narcis.jpg');
let demoUser2: User = new User(2, 'Bogdan', 'Ciornohac', 'bogdan.jpg');

function App() {
    let [users, setUsers] = useState<User[]>([demoUser1, demoUser2]);

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
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<DisplayUsersPage />} />
                    <Route path='/addUser' element={<AddUserPage />} />
                    <Route path='/editUser/:userId' element={<EditUserPage />} />
                </Routes>
            </BrowserRouter>
        </UsersContextProvider>
    );
}

export default App;
