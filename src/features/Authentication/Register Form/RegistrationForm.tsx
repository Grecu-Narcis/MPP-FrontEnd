import { useRef } from 'react';

import './RegistrationForm.css';
import { FormEntry } from '../../CRUD Operations/User Form/Form Entry/FormEntry';
import { Button } from '../../../shared/components/button/Button';
import { RegistrationFormProps } from '../../../types/RegistrationFormProps.types';

function getUserDataFromInputs(
    firstNameInput: React.RefObject<HTMLInputElement>,
    lastNameInput: React.RefObject<HTMLInputElement>,
    emailInput: React.RefObject<HTMLInputElement>,
    passwordInput: React.RefObject<HTMLInputElement>,
) {
    if (!firstNameInput.current?.value || !lastNameInput.current?.value || !emailInput.current?.value || !passwordInput.current?.value)
        throw new Error('You must provide value for each field!');

    const firstName = firstNameInput.current.value;
    const lastName = lastNameInput.current.value;
    const email = emailInput.current.value;
    const password = passwordInput.current.value;

    return {
        firstName,
        lastName,
        email,
        password,
    };
}

export function RegistrationForm({ handleRegister }: RegistrationFormProps) {
    // const [profileImage, setProfileImage] = useState<File>();

    const firstNameInput = useRef<HTMLInputElement>(null);
    const lastNameInput = useRef<HTMLInputElement>(null);
    const emailInput = useRef<HTMLInputElement>(null);
    const passwordInput = useRef<HTMLInputElement>(null);

    // const handleImageUpload = (event: any) => {
    //     if (!event.target.files[0]) return;
    //     setProfileImage(event.target.files[0]);
    // };

    const handleRegisterSubmit = () => {
        try {
            const { firstName, lastName, email, password } = getUserDataFromInputs(
                firstNameInput,
                lastNameInput,
                emailInput,
                passwordInput,
            );

            handleRegister(firstName, lastName, email, password);
        } catch (e) {
            alert((e as Error).message);
        }
    };

    return (
        <>
            <form className='register-form'>
                {/* <label htmlFor='profile-image' className='profile-image-label'>
                    <img src={profileImage ? URL.createObjectURL(profileImage) : 'assets/default-user.png'} className='add-image' />
                    <FontAwesomeIcon icon={faPlus} className='add-button' />
                </label>
                <input type='file' id='profile-image' accept='.jpg,.jpeg,.png' onChange={handleImageUpload} /> */}

                <FormEntry label='First Name' placeHolder='First Name' ref={firstNameInput} />
                <FormEntry label='Last Name' placeHolder='Last Name' ref={lastNameInput} />
                <FormEntry label='Email' placeHolder='you@example.com' ref={emailInput} />
                <FormEntry label='Password' placeHolder='Password' ref={passwordInput} type='password' />

                <Button type='button' buttonMessage='Register' onClick={handleRegisterSubmit} margin='0.8rem 0' />
            </form>
        </>
    );
}
