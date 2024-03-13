import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { expect, test, vi } from 'vitest';
import { DisplayUsersPage } from '../pages/Display Data Page/DisplayUsersPage';
import { UsersContextProvider } from '../contexts/UsersContext';
import { User } from '../models/User';

test('test display users page render', () => {
    render(
        <UsersContextProvider
            userContext={{
                users: [new User(1, 'Grecu', 'Narcis', 'narcis.jpg')],
                addUser: vi.fn(),
                removeUser: vi.fn(),
            }}
        >
            <BrowserRouter>
                <DisplayUsersPage />
            </BrowserRouter>
        </UsersContextProvider>,
    );

    const usersListDiv = screen.getByTestId('users-list');

    expect(usersListDiv.childNodes.length).toBe(1);
});
