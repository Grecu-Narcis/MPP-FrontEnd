import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import { UserCard } from '../features/Display Users/UserCard';
import { User } from '../models/User';
import { BrowserRouter } from 'react-router-dom';
import { ModalContextProvider } from '../contexts/ModalContext';

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

test('test user card rendering', () => {
    const testUser = new User('Grecu', 'Narcis', 'narcis.jpg');

    render(
        <BrowserRouter>
            <ModalContextProvider
                modalContext={{
                    modalStatus: false,
                    setModalStatus: vi.fn(),
                    userId: 0,
                    setUserId: vi.fn(),
                    removeUser: vi.fn(),
                }}
            >
                <UserCard givenUser={testUser} />
            </ModalContextProvider>
        </BrowserRouter>,
    );

    const userCard = screen.getByTestId('user-card');
    const removeButton = screen.getByTestId('remove-button');

    const userFirstName = screen.getByText('First Name: Grecu');
    const userImage = screen.getByAltText('user profile');

    expect(userCard).toBeInTheDocument();
    expect(removeButton).toBeInTheDocument();
    expect(userFirstName).toBeInTheDocument();
    expect(userImage).toBeInTheDocument();
});

test('test user card remove method to be called', () => {
    const testUser = new User('Grecu', 'Narcis', 'narcis.jpg');

    render(
        <BrowserRouter>
            <ModalContextProvider
                modalContext={{
                    modalStatus: false,
                    setModalStatus: vi.fn(),
                    userId: 0,
                    setUserId: vi.fn(),
                    removeUser: vi.fn(),
                }}
            >
                <UserCard givenUser={testUser} />
            </ModalContextProvider>
        </BrowserRouter>,
    );

    const userCard = screen.getByTestId('user-card');
    const removeButton = screen.getByTestId('remove-button');
    fireEvent.click(removeButton);
    fireEvent.click(userCard);

    expect(mockedUseNavigate).toBeCalledWith('/editUser/2');
});
