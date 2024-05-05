import { UserForm } from '../../features/CRUD Operations/User Form/UserForm';
import { Layout } from '../../shared/components/layout/Layout';
import { Button } from '../../shared/components/button/Button';
import { User } from '../../models/user';

import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import './EditUserPage.css';
import LoadingPage from '../Loading Page/LoadingPage';
import { getUserById, updateUser } from '../../services/Users Service/UsersService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightLeft } from '@fortawesome/free-solid-svg-icons';
import { getImageByUserId, saveImage } from '../../services/Images Service/ImagesService';

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

    const [profileImage, setProfileImage] = useState<File | string | undefined>();

    const firstNameInput = useRef<HTMLInputElement>(null);
    const lastNameInput = useRef<HTMLInputElement>(null);
    const urlInput = useRef<HTMLInputElement>(null);
    const ageInput = useRef<HTMLInputElement>(null);
    const imageInput = useRef<HTMLInputElement>(null);

    const [givenUser, setGivenUser] = useState<User>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const navigate = useNavigate();
    const { userId } = useParams();

    useEffect(() => {
        getUserById(userId!).then((foundUser: User) => {
            setGivenUser(foundUser);
            setIsLoading(false);
        });

        getImageByUserId(parseInt(userId!)).then((image: string) => {
            setProfileImage('data:image/jpeg;base64,' + image);
        });
    }, []);

    useEffect(() => {
        if (isLoading) return;
        if (!givenUser) navigate('/');
    });

    const handleImageUpload = (event: any) => {
        if (!event.target.files[0]) return;
        setProfileImage(event.target.files[0]);
        console.log(event.target.files[0]);
    };

    const handleOnClickWrapper = () => {
        try {
            const newUser: User = handleOnClick(givenUser!, firstNameInput, lastNameInput, urlInput, ageInput);
            setIsLoading(true);

            if (profileImage instanceof File) {
                saveImage(profileImage, parseInt(userId!));
            }

            updateUser(newUser).then(() => {
                setIsLoading(false);
                navigate('/');
            });
        } catch (error) {
            alert(error);
        }
    };

    if (isLoading) return <LoadingPage />;

    return (
        <Layout>
            <div className='main-page-container'>
                <label htmlFor='profile-image' className='profile-image-label'>
                    <img
                        src={
                            profileImage === undefined
                                ? 'assets/default-user.png'
                                : typeof profileImage === 'string'
                                ? profileImage
                                : URL.createObjectURL(profileImage)
                        }
                        className='add-image'
                    />
                    <FontAwesomeIcon icon={faRightLeft} className='replace-button' />
                </label>
                <input type='file' id='profile-image' accept='.jpg,.jpeg,.png' onChange={handleImageUpload} ref={imageInput} />

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
