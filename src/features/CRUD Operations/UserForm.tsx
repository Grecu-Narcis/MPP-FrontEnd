import { FormEntry } from './FormEntry';
import { User } from '../../models/user';
import { Button } from '../../shared/components/button/Button';

import { UsersContext } from '../../App';

import { useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserForm.css';

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

export function UserForm() {
    const idInput = useRef<HTMLInputElement>(null);
    const firstNameInput = useRef<HTMLInputElement>(null);
    const lastNameInput = useRef<HTMLInputElement>(null);
    const urlInput = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();

    const usersContext = useContext(UsersContext);
    if (!usersContext) throw new Error('Users Context is undefined!');

    const formEntries = [
        { label: 'ID', ref: idInput },
        { label: 'First Name', ref: firstNameInput },
        { label: 'Last Name', ref: lastNameInput },
        { label: 'URL', ref: urlInput },
    ];

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
        <div className='form-div'>
            <form className='user-form'>
                {formEntries.map((entry) => (
                    <FormEntry label={entry.label} ref={entry.ref} />
                ))}
            </form>

            <Button type='submit' buttonMessage='Add user' className='form-button' onClick={handleOnClickWrapper} />
        </div>
    );
}
