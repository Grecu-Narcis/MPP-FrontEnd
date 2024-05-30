import { useNavigate } from 'react-router-dom';
import { Layout } from '../../shared/components/layout/Layout';

import './ProfilePage.css';
import { useEffect, useRef, useState } from 'react';
import { User } from '../../models/user';
import { getUserById, updateUser } from '../../services/Users Service/UsersService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FormEntry } from '../../features/CRUD Operations/User Form/Form Entry/FormEntry';
import { Button } from '../../shared/components/button/Button';
import { saveImage } from '../../services/Images Service/ImagesService';
import LoadingPage from '../Loading Page/LoadingPage';

function getUserDataFromInputs(
    firstNameInput: React.RefObject<HTMLInputElement>,
    lastNameInput: React.RefObject<HTMLInputElement>,
    emailInput: React.RefObject<HTMLInputElement>,
) {
    if (!firstNameInput.current?.value || !lastNameInput.current?.value || !emailInput.current?.value)
        throw new Error('You must provide value for each field!');

    const firstName = firstNameInput.current.value;
    const lastName = lastNameInput.current.value;
    const email = emailInput.current.value;

    return {
        firstName,
        lastName,
        email,
    };
}

export default function ProfilePage() {
    const navigate = useNavigate();
    const [user, setUser] = useState<User>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const firstNameInput = useRef<HTMLInputElement>(null);
    const lastNameInput = useRef<HTMLInputElement>(null);
    const emailInput = useRef<HTMLInputElement>(null);

    const [profileImage, setProfileImage] = useState<File>();

    const handleImageUpload = (event: any) => {
        if (!event.target.files[0]) return;
        setProfileImage(event.target.files[0]);
    };

    const handleUpdateClick = () => {
        const { firstName, lastName, email } = getUserDataFromInputs(firstNameInput, lastNameInput, emailInput);
        console.log(firstName, lastName, email);

        const userDTO = {
            id: user!.getId(),
            firstName: firstName,
            lastName: lastName,
            email: email,
            userRole: user!.getRole(),
        };

        updateUser(userDTO).then(() => {
            console.log('update success!');
        });

        if (profileImage !== undefined)
            saveImage(profileImage, user!.getId()).then(() => {
                console.log('image upload!');
                localStorage.removeItem('profileImage');
            });
    };

    useEffect(() => {
        if (!localStorage.getItem('userId')) navigate('/login');

        getUserById(localStorage.getItem('userId')!).then((response) => {
            setUser(response);
            console.log(response);
            setIsLoading(false);
        });
    }, []);

    if (isLoading) return <LoadingPage />;

    return (
        <Layout>
            <div className='main-content-profile'>
                <label htmlFor='profile-image' className='profile-image-label'>
                    <img src={profileImage ? URL.createObjectURL(profileImage) : 'assets/default-user.png'} className='add-image' />
                    <FontAwesomeIcon icon={faPlus} className='add-button' />
                </label>
                <input type='file' id='profile-image' accept='.jpg,.jpeg,.png' onChange={handleImageUpload} />
                <div className='profile-details'>
                    <FormEntry label='First name' defaultValue={user?.getFirstName()} ref={firstNameInput} />
                    <FormEntry label='Last name' defaultValue={user?.getLastName()} ref={lastNameInput} />
                    <FormEntry label='Email' defaultValue={user?.getEmail()} ref={emailInput} />
                    <FormEntry label='Role' defaultValue={user?.getRole()} disabled={true} />
                </div>

                <Button type='button' buttonMessage='Update' onClick={handleUpdateClick} />
            </div>
        </Layout>
    );
}
