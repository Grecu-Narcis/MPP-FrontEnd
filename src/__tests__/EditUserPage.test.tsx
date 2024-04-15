import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { expect, test, vi } from 'vitest';
import { UsersContextProvider } from '../contexts/UsersContext';

import { User } from '../models/user';
import EditUserPage from '../pages/Edit User Page/EditUserPage';

const { mockedUseNavigate } = vi.hoisted(() => {
    return {
        mockedUseNavigate: vi.fn(),
    };
});

vi.mock('react-router-dom', async () => {
    const router = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
    return {
        ...router,
        useNavigate: () => mockedUseNavigate,
    };
});

test('test rendering of edit user page', () => {
    const userId = 1;

    render(
        <UsersContextProvider
            userContext={{
                users: [new User(2, 'Grecu', 'Narcis', 'narcis.jpg', 20)],
                addUser: vi.fn(),
                removeUser: vi.fn(),
            }}
        >
            <MemoryRouter initialEntries={['/editUser/' + userId]}>
                <Routes>
                    <Route path='/editUser/:userId' element={<EditUserPage />} />
                </Routes>
            </MemoryRouter>
        </UsersContextProvider>,
    );

    const userForm = screen.getByTestId('user-form');
    expect(userForm).toBeInTheDocument();
});

test('test rendering of edit user page with invalid userId', () => {
    render(
        <UsersContextProvider
            userContext={{
                users: [new User(2, 'Grecu', 'Narcis', 'narcis.jpg', 20)],
                addUser: vi.fn(),
                removeUser: vi.fn(),
            }}
        >
            <MemoryRouter initialEntries={['/editUser/3']}>
                <Routes>
                    <Route path='/editUser/:userId' element={<EditUserPage />} />
                </Routes>
            </MemoryRouter>
        </UsersContextProvider>,
    );

    expect(mockedUseNavigate.call.length).toBe(1);
});

test('test rendering of submit form', () => {
    const mockAddUser = vi.fn();
    const mockRemoveUser = vi.fn();

    render(
        <UsersContextProvider
            userContext={{
                users: [new User(2, 'Grecu', 'Narcis', 'narcis.jpg', 20)],
                addUser: mockAddUser,
                removeUser: mockRemoveUser,
            }}
        >
            <MemoryRouter initialEntries={['/editUser/3']}>
                <Routes>
                    <Route path='/editUser/:userId' element={<EditUserPage />} />
                </Routes>
            </MemoryRouter>
        </UsersContextProvider>,
    );

    const editButton = screen.getByTestId('edit-user-button');
    expect(editButton).toBeInTheDocument();

    fireEvent.click(editButton);

    expect(mockAddUser.call.length).toBe(1);
    expect(mockRemoveUser.call.length).toBe(1);
});

test('test submit with empty field', () => {
    render(
        <UsersContextProvider
            userContext={{
                users: [new User(2, 'Grecu', 'Narcis', 'narcis.jpg', 20)],
                addUser: vi.fn(),
                removeUser: vi.fn(),
            }}
        >
            <MemoryRouter initialEntries={['/editUser/3']}>
                <Routes>
                    <Route path='/editUser/:userId' element={<EditUserPage />} />
                </Routes>
            </MemoryRouter>
        </UsersContextProvider>,
    );

    const firstNameInput = screen.getByLabelText('First Name');
    const submitButton = screen.getByTestId('edit-user-button');

    fireEvent.change(firstNameInput, {
        target: {
            value: '',
        },
    });

    window.alert = vi.fn();

    fireEvent.click(submitButton);

    expect(window.alert).toBeCalledTimes(1);
});
