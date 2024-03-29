import { UsersContext } from '../../contexts/UsersContext';
import { UserForm } from '../../features/CRUD Operations/User Form/UserForm';
import { Layout } from '../../shared/components/layout/Layout';
import { Button } from '../../shared/components/button/Button';
import { User } from '../../models/User';

import { useContext, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import './EditUserPage.css';

function handleOnClick(
    firstNameInput: React.RefObject<HTMLInputElement>,
    lastNameInput: React.RefObject<HTMLInputElement>,
    urlInput: React.RefObject<HTMLInputElement>,
    ageInput: React.RefObject<HTMLInputElement>,
) {
    if (!firstNameInput.current!.value || !lastNameInput.current!.value || !urlInput.current!.value || !ageInput.current!.value)
        throw new Error('You must provide values for each field!');

    const userFirstName: string = firstNameInput.current!.value,
        userLastName: string = lastNameInput.current!.value,
        userUrl: string = urlInput.current!.value,
        age: number = parseInt(ageInput.current!.value);

    return new User(userFirstName, userLastName, userUrl, age);
}

export default function EditUserPage() {
    document.title = 'Edit User';

    const firstNameInput = useRef<HTMLInputElement>(null);
    const lastNameInput = useRef<HTMLInputElement>(null);
    const urlInput = useRef<HTMLInputElement>(null);
    const ageInput = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();
    const usersContext = useContext(UsersContext)!;

    const { userId } = useParams();

    const givenUser = usersContext.users.find((user: User) => user.getId() === parseInt(userId!));

    useEffect(() => {
        if (!givenUser) navigate('/');
    });

    const handleOnClickWrapper = () => {
        try {
            const newUser = handleOnClick(firstNameInput, lastNameInput, urlInput, ageInput);
            usersContext.removeUser(givenUser!.getId());
            usersContext.addUser(newUser);

            navigate('/');
        } catch (error) {
            alert(error);
        }
    };

    const profileImagePath = '../assets/' + givenUser?.getPictureUrl();

    return (
        <Layout>
            <div className='main-page-container'>
                <img src={profileImagePath} alt='profile image' id='profile-picture' />

                <UserForm
                    firstNameInput={firstNameInput}
                    lastNameInput={lastNameInput}
                    urlInput={urlInput}
                    ageInput={ageInput}
                    givenUser={givenUser}
                />

                <Button type='submit' data_test_id='edit-user-button' buttonMessage='Edit User' onClick={handleOnClickWrapper} />
            </div>
        </Layout>
    );
}
