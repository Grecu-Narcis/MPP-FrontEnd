import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { UserForm } from '../features/CRUD Operations/User Form/UserForm';
import React from 'react';
import { User } from '../models/User';

test('testing rendering of user form without user', () => {
    let ageInput = React.createRef<HTMLInputElement>();
    let firstNameInput = React.createRef<HTMLInputElement>();
    let lastNameInput = React.createRef<HTMLInputElement>();
    let urlInput = React.createRef<HTMLInputElement>();

    render(<UserForm firstNameInput={firstNameInput} lastNameInput={lastNameInput} ageInput={ageInput} urlInput={urlInput} />);

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
    let ageInput = React.createRef<HTMLInputElement>();
    let firstNameInput = React.createRef<HTMLInputElement>();
    let lastNameInput = React.createRef<HTMLInputElement>();
    let urlInput = React.createRef<HTMLInputElement>();

    let demoUser = new User('Grecu', 'Narcis', 'narcis.jpg', 20);

    render(
        <UserForm
            firstNameInput={firstNameInput}
            lastNameInput={lastNameInput}
            urlInput={urlInput}
            ageInput={ageInput}
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
