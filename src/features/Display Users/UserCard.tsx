import { useNavigate } from 'react-router-dom';
import { UserCardPropsType } from '../../types/UserCardProps.types';

import './UserCard.css';

export function UserCard({ givenUser, removeMethod }: UserCardPropsType) {
    let path: string = 'assets/' + givenUser.getPictureUrl();

    const navigate = useNavigate();

    const handleCardOnClick = () => {
        navigate('/editUser/' + givenUser.getId());
    };

    return (
        <div className='card' data-testid='user-card' onClick={handleCardOnClick}>
            <button
                className='remove-button'
                onClick={(e) => {
                    e.stopPropagation();
                    removeMethod(givenUser.getId());
                }}
            >
                X
            </button>

            <div className='card-info'>
                <div className='picture'>
                    <img src={path} alt='user profile' />
                </div>

                <div className='user-info'>
                    <div className='user-id'>ID: {givenUser.getId()}</div>
                    <div className='first-name'>First Name: {givenUser.getFirstName()}</div>
                    <div className='last-name'>Last Name: {givenUser.getLastName()}</div>
                </div>
            </div>
        </div>
    );
}
