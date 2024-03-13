import { UsersContext } from '../../contexts/UsersContext';
import { UserForm } from '../../features/CRUD Operations/User Form/UserForm';
import { Layout } from '../../shared/components/layout/Layout';
import { Button } from '../../shared/components/button/Button';
import { User } from '../../models/User';

import { useContext, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function handleOnClick(
    idInput: React.RefObject<HTMLInputElement>,
    firstNameInput: React.RefObject<HTMLInputElement>,
    lastNameInput: React.RefObject<HTMLInputElement>,
    urlInput: React.RefObject<HTMLInputElement>,
) {
    if (!idInput.current || !firstNameInput.current || !lastNameInput.current || !urlInput.current)
        throw new Error('Inputs references are null');

    if (!idInput.current.value || !firstNameInput.current.value || !lastNameInput.current.value || !urlInput.current.value)
        throw new Error('You must provide values for each field!');

    const userId: number = parseInt(idInput.current.value),
        userFirstName: string = firstNameInput.current.value,
        userLastName: string = lastNameInput.current.value,
        userUrl: string = urlInput.current.value;

    return new User(userId, userFirstName, userLastName, userUrl);
}

export function EditUserPage() {
    document.title = 'Edit User';

    const idInput = useRef<HTMLInputElement>(null);
    const firstNameInput = useRef<HTMLInputElement>(null);
    const lastNameInput = useRef<HTMLInputElement>(null);
    const urlInput = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();
    const usersContext = useContext(UsersContext)!;

    const { userId } = useParams();
    if (!userId) {
        navigate('/');
        return;
    }

    const givenUser = usersContext.users.find((user: User) => user.getId() === parseInt(userId));
    const handleOnClickWrapper = () => {
        try {
            const newUser = handleOnClick(idInput, firstNameInput, lastNameInput, urlInput);
            usersContext.removeUser(newUser.getId());
            usersContext.addUser(newUser);

            navigate('/');
        } catch (error) {
            alert(error);
        }
    };

    return (
        <Layout>
            <div className='main-page-container'>
                <UserForm
                    idInput={idInput}
                    firstNameInput={firstNameInput}
                    lastNameInput={lastNameInput}
                    urlInput={urlInput}
                    givenUser={givenUser}
                />

                <Button type='submit' buttonMessage='Edit User' onClick={handleOnClickWrapper} />
            </div>
        </Layout>
    );
}
