import { UsersContext } from '../../contexts/UsersContext';
import { UserForm } from '../../features/CRUD Operations/User Form/UserForm';
import { Layout } from '../../shared/components/layout/Layout';
import { Button } from '../../shared/components/button/Button';
import { User } from '../../models/User';

import { useContext, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function handleOnClick(
    firstNameInput: React.RefObject<HTMLInputElement>,
    lastNameInput: React.RefObject<HTMLInputElement>,
    urlInput: React.RefObject<HTMLInputElement>,
) {
    if (firstNameInput.current!.value === '' || !lastNameInput.current!.value || !urlInput.current!.value)
        throw new Error('You must provide values for each field!');

    const userFirstName: string = firstNameInput.current!.value,
        userLastName: string = lastNameInput.current!.value,
        userUrl: string = urlInput.current!.value;

    return new User(userFirstName, userLastName, userUrl);
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

    const givenUser = usersContext.users.find((user: User) => user.getId() === parseInt(userId!));

    useEffect(() => {
        if (!givenUser) navigate('/');
    });

    const handleOnClickWrapper = () => {
        try {
            const newUser = handleOnClick(firstNameInput, lastNameInput, urlInput);
            usersContext.removeUser(givenUser!.getId());
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

                <Button type='submit' data_test_id='edit-user-button' buttonMessage='Edit User' onClick={handleOnClickWrapper} />
            </div>
        </Layout>
    );
}
