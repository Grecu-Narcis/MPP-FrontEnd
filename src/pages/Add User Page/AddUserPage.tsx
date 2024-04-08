import { UserForm } from '../../features/CRUD Operations/User Form/UserForm';
import { Layout } from '../../shared/components/layout/Layout';
import { Button } from '../../shared/components/button/Button';

import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import './AddUserPage.css';
import { UserDTO } from '../../types/UserDTO.types';
import { addUser } from '../../services/Users Service/UsersService';

function handleOnClick(
    firstNameInput: React.RefObject<HTMLInputElement>,
    lastNameInput: React.RefObject<HTMLInputElement>,
    urlInput: React.RefObject<HTMLInputElement>,
    ageInput: React.RefObject<HTMLInputElement>,
): UserDTO {
    if (!firstNameInput.current!.value || !lastNameInput.current!.value || !urlInput.current!.value || !ageInput.current!.value)
        throw new Error('You must provide values for each field!');

    const firstName: string = firstNameInput.current!.value,
        lastName: string = lastNameInput.current!.value,
        pictureUrl: string = urlInput.current!.value,
        age: number = parseInt(ageInput.current!.value);

    return {
        firstName,
        lastName,
        pictureUrl,
        age,
    };
}

export default function AddUserPage() {
    document.title = 'Add user';

    const firstNameInput = useRef<HTMLInputElement>(null);
    const lastNameInput = useRef<HTMLInputElement>(null);
    const urlInput = useRef<HTMLInputElement>(null);
    const ageInput = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();
    // const usersContext = useContext(UsersContext)!;

    const handleOnClickWrapper = () => {
        try {
            const inputUser = handleOnClick(firstNameInput, lastNameInput, urlInput, ageInput);

            addUser(inputUser).then(() => navigate('/'));
            // usersContext.addUser(inputUser);
            navigate('/');
        } catch (error) {
            alert(error);
        }
    };

    return (
        <Layout>
            <div className='main-page-container' data-testid='main-page-container'>
                <div className='main-title'>Add user</div>

                <UserForm
                    firstNameInput={firstNameInput}
                    lastNameInput={lastNameInput}
                    urlInput={urlInput}
                    ageInput={ageInput}
                    data-testid='user-form'
                />

                <Button type='submit' buttonMessage='Add user' className='form-button' onClick={handleOnClickWrapper} />
            </div>
        </Layout>
    );
}
