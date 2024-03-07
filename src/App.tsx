import './App.css';
import { DisplayUsersPage } from './pages/Display Data Page/DisplayUsersPage';
import { User } from './models/user';
import { AddUserPage } from './pages/Add User Page/AddUserPage';

import { Routes, Route } from 'react-router-dom';
import { createContext, useEffect, useState } from 'react';

let demoUser1: User = new User(1, 'Narcis', 'Grecu', 'narcis.jpg');
let demoUser2: User = new User(2, 'Bogdan', 'Ciornohac', 'bogdan.jpg');

type UsersContextType = {
    users: User[];
    addUser: (user: User) => void;
    removeUser: (userId: number) => void;
};

export const UsersContext = createContext<UsersContextType | null>(null);

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
        <UsersContext.Provider value={{ users, addUser, removeUser }}>
            <Routes>
                <Route path='/' element={<DisplayUsersPage />}></Route>

                <Route path='addUser' element={<AddUserPage />} />
            </Routes>
        </UsersContext.Provider>
    );
}

export default App;
