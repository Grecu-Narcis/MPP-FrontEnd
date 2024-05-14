import { useNavigate } from 'react-router-dom';
import { UserCardPropsType } from '../../types/UserCardProps.types';

import './UserCard.css';
import { useContext, useEffect, useState } from 'react';
import { ModalContext } from '../../contexts/ModalContext';
import { Button } from '../../shared/components/button/Button';
import { getImageByUserId } from '../../services/Images Service/ImagesService';

/**
 * UserCard Component
 *
 * A component representing a card view for displaying user details.
 *
 * This component renders a card displaying user information such as profile picture,
 * first name, last name, and age. It also provides buttons for editing user details,
 * viewing the user's cars, and removing the user (via modal confirmation).
 *
 * @component
 * @param {Object} props - The props object containing the givenUser data.
 * @param {User} props.givenUser - The user object containing details to be displayed.
 * @returns {JSX.Element} - Rendered UserCard component.
 * @example
 * <UserCard givenUser={userData} />
 */
export function UserCard({ givenUser }: UserCardPropsType) {
    const [path, setPath] = useState<string>('');

    const navigate = useNavigate();

    const handleCardOnClick = () => {
        navigate('/editUser/' + givenUser.getId());
    };

    const handleViewCarsClick = (event: any) => {
        event.stopPropagation();
        event.preventDefault();
        console.log('View cars button clicked');
        navigate('/cars/' + givenUser.getId());
    };

    const modalContext = useContext(ModalContext)!;
    const setUserId = modalContext.setUserId;
    const setModalStatus = modalContext.setModalStatus;

    useEffect(() => {
        getImageByUserId(givenUser.getId()).then((response) => {
            setPath('data:image/jpeg;base64,' + response);
        });
    }, []);

    return (
        <div className='card' data-testid='user-card' onClick={handleCardOnClick}>
            <button
                className='remove-button'
                data-testid='remove-button'
                onClick={(e) => {
                    e.stopPropagation();
                    setModalStatus(true);
                    setUserId(givenUser.getId());
                    // removeMethod(givenUser.getId());
                }}
            >
                X
            </button>

            <div className='card-info' data-testid='card-info'>
                <div className='picture'>
                    <img src={path} alt='user profile' />
                </div>

                <div className='user-info'>
                    <div className='first-name'>First Name: {givenUser.getFirstName()}</div>
                    <div className='last-name'>Last Name: {givenUser.getLastName()}</div>
                    <div className='age'>Age: {givenUser.getAge()}</div>
                </div>
            </div>

            <Button type='button' buttonMessage='View cars' onClick={handleViewCarsClick} />
        </div>
    );
}
