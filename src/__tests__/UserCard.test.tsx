import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import { UserCard } from '../features/Display Users/UserCard';
import { User } from '../models/User';
import { BrowserRouter } from 'react-router-dom';

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
    const testUser = new User(1, 'Grecu', 'Narcis', 'narcis.jpg');
    const mockRemoveMethod = vi.fn();

    render(
        <BrowserRouter>
            <UserCard givenUser={testUser} removeMethod={mockRemoveMethod} />
        </BrowserRouter>,
    );

    const userCard = screen.getByTestId('user-card');
    const removeButton = screen.getByTestId('remove-button');

    const userId = screen.getByText('ID: 1');
    const userFirstName = screen.getByText('First Name: Grecu');
    const userImage = screen.getByAltText('user profile');

    expect(userCard).toBeInTheDocument();
    expect(removeButton).toBeInTheDocument();
    expect(userId).toBeInTheDocument();
    expect(userFirstName).toBeInTheDocument();
    expect(userImage).toBeInTheDocument();
});

test('test user card remove method to be called', () => {
    const testUser = new User(1, 'Grecu', 'Narcis', 'narcis.jpg');
    const mockRemoveMethod = vi.fn();

    render(
        <BrowserRouter>
            <UserCard givenUser={testUser} removeMethod={mockRemoveMethod} />
        </BrowserRouter>,
    );

    const userCard = screen.getByTestId('user-card');
    const removeButton = screen.getByTestId('remove-button');
    fireEvent.click(removeButton);
    fireEvent.click(userCard);

    expect(mockRemoveMethod.mock.calls.length).toBe(1);
    expect(mockedUseNavigate).toBeCalledWith('/editUser/1');
});
