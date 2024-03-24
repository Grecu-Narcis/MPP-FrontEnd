import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { UserForm } from '../features/CRUD Operations/User Form/UserForm';
import React from 'react';
import { User } from '../models/User';

test('testing rendering of user form without user', () => {
    let idInput = React.createRef<HTMLInputElement>();
    let firstNameInput = React.createRef<HTMLInputElement>();
    let lastNameInput = React.createRef<HTMLInputElement>();
    let urlInput = React.createRef<HTMLInputElement>();

    render(<UserForm idInput={idInput} firstNameInput={firstNameInput} lastNameInput={lastNameInput} urlInput={urlInput} />);

    const renderedUserForm = screen.getByTestId('user-form');
    const firstNameFormInput = screen.getByPlaceholderText('First Name');
    const lastNameFormLabel = screen.getByText('Last Name');
    const urlFormLabel = screen.getByText('URL');

    expect(renderedUserForm).toBeInTheDocument();
    expect(firstNameFormInput).toBeInTheDocument();
    expect(lastNameFormLabel).toBeInTheDocument();
    expect(urlFormLabel).toBeInTheDocument();
});

test('testing rendering of user form with user', () => {
    let idInput = React.createRef<HTMLInputElement>();
    let firstNameInput = React.createRef<HTMLInputElement>();
    let lastNameInput = React.createRef<HTMLInputElement>();
    let urlInput = React.createRef<HTMLInputElement>();

    let demoUser = new User('Grecu', 'Narcis', 'narcis.jpg');

    render(
        <UserForm
            idInput={idInput}
            firstNameInput={firstNameInput}
            lastNameInput={lastNameInput}
            urlInput={urlInput}
            givenUser={demoUser}
        />,
    );

    const renderedUserForm = screen.getByTestId('user-form');
    const firstNameFormInput = screen.getByDisplayValue('Grecu');
    const firstNameFormLabel = screen.getByText('First Name');

    expect(renderedUserForm).toBeInTheDocument();
    expect(firstNameFormInput).toBeInTheDocument();
    expect(firstNameFormLabel).toBeInTheDocument();
});
