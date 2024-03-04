import './App.css';
import { DisplayUsersPage } from './pages/Display Data Page/DisplayUsersPage';
import { User } from './models/user';
import { AddUserPage } from './pages/Add User Page/AddUserPage';

import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';

import React from 'react';

//import users from './utils/users.utils'
let demoUser1: User = new User(1, 'Narcis', 'Grecu', 'narcis.jpg');
let demoUser2: User = new User(2, 'Bogdan', 'Ciornohac', 'bogdan.jpg');


function App() {
  let [users, setUsers] = useState([demoUser1, demoUser2]);

  const addUser = (newUser: User) => {
    setUsers((prevState: User[]) => [...prevState, newUser]);
  };

  const removeUser = (userId: number) => {
    setUsers(
      (prevState: User[]) =>
        prevState.filter(user => user.getId() !== userId));
  };

  useEffect(() => {
    console.log(users);
  }
  );

  return (
    <Routes>
      <Route path="/" element={
        <DisplayUsersPage
          users={users}
          removeMethod={removeUser}
        />
      }>
      </Route>

      <Route path="addUser" element={
        <AddUserPage
          addMethod={addUser}
        />
      }
      />
    </Routes>
  );
}

export default App;