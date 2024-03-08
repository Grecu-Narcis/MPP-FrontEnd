import { UserForm } from '../../features/CRUD Operations/UserForm';
import { Layout } from '../../shared/components/layout/Layout';
import { Button } from '../../shared/components/button/Button';
import { User } from '../../models/user';

import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { useUsersContext } from '../../contexts/UsersContext';

import './AddUserPage.css';

export type UserFormType = {
    idInput: React.RefObject<HTMLInputElement>;
    firstNameInput: React.RefObject<HTMLInputElement>;
    lastNameInput: React.RefObject<HTMLInputElement>;
    urlInput: React.RefObject<HTMLInputElement>;
};

function handleOnClick(
    idInput: React.RefObject<HTMLInputElement>,
    firstNameInput: React.RefObject<HTMLInputElement>,
    lastNameInput: React.RefObject<HTMLInputElement>,
    urlInput: React.RefObject<HTMLInputElement>,
): User {
    if (!idInput.current || !firstNameInput.current || !lastNameInput.current || !urlInput.current)
        throw new Error('Inputs references are null');

    if (
        !idInput.current.value ||
        !firstNameInput.current.value ||
        !lastNameInput.current.value ||
        !urlInput.current.value
    )
        throw new Error('You must provide values for each field!');

    const userId: number = parseInt(idInput.current.value),
        userFirstName: string = firstNameInput.current.value,
        userLastName: string = lastNameInput.current.value,
        userUrl: string = urlInput.current.value;

    return new User(userId, userFirstName, userLastName, userUrl);
}

export function AddUserPage() {
    document.title = 'Add user';

    const idInput = useRef<HTMLInputElement>(null);
    const firstNameInput = useRef<HTMLInputElement>(null);
    const lastNameInput = useRef<HTMLInputElement>(null);
    const urlInput = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();
    const usersContext = useUsersContext();

    const handleOnClickWrapper = () => {
        try {
            const inputUser = handleOnClick(idInput, firstNameInput, lastNameInput, urlInput);
            usersContext.addUser(inputUser);
            navigate('/');
        } catch (error) {
            alert(error);
        }
    };

    return (
        <Layout>
            <div className='main-page-container'>
                <div className='main-title'>Add user</div>

                <UserForm
                    idInput={idInput}
                    firstNameInput={firstNameInput}
                    lastNameInput={lastNameInput}
                    urlInput={urlInput}
                />

                <Button type='submit' buttonMessage='Add user' className='form-button' onClick={handleOnClickWrapper} />
            </div>
        </Layout>
    );
}
