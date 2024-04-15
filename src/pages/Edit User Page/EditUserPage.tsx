import { UserForm } from '../../features/CRUD Operations/User Form/UserForm';
import { Layout } from '../../shared/components/layout/Layout';
import { Button } from '../../shared/components/button/Button';
import { User } from '../../models/user';

import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import './EditUserPage.css';
import LoadingPage from '../Loading Page/LoadingPage';
import { getUserById, updateUser } from '../../services/Users Service/UsersService';

function handleOnClick(
    givenUser: User,
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

    return new User(givenUser.getId(), userFirstName, userLastName, userUrl, age);
}

export default function EditUserPage() {
    document.title = 'Edit User';

    const firstNameInput = useRef<HTMLInputElement>(null);
    const lastNameInput = useRef<HTMLInputElement>(null);
    const urlInput = useRef<HTMLInputElement>(null);
    const ageInput = useRef<HTMLInputElement>(null);

    let [givenUser, setGivenUser] = useState<User>();
    let [isLoading, setIsLoading] = useState<boolean>(true);

    const navigate = useNavigate();
    const { userId } = useParams();

    useEffect(() => {
        getUserById(userId!).then((foundUser: User) => {
            setGivenUser(foundUser);
            setIsLoading(false);
        });
    }, []);

    useEffect(() => {
        if (isLoading) return;
        if (!givenUser) navigate('/');
    });

    const handleOnClickWrapper = () => {
        try {
            const newUser: User = handleOnClick(givenUser!, firstNameInput, lastNameInput, urlInput, ageInput);
            setIsLoading(true);
            updateUser(newUser).then(() => {
                setIsLoading(false);
                navigate('/');
            });
        } catch (error) {
            alert(error);
        }
    };

    const profileImagePath = '../assets/' + givenUser?.getPictureUrl();

    if (isLoading) return <LoadingPage />;

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
