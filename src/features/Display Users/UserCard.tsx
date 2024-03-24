import { useNavigate } from 'react-router-dom';
import { UserCardPropsType } from '../../types/UserCardProps.types';

import './UserCard.css';
import { useContext } from 'react';
import { ModalContext } from '../../contexts/ModalContext';

export function UserCard({ givenUser }: UserCardPropsType) {
    let path: string = 'assets/' + givenUser.getPictureUrl();

    const navigate = useNavigate();

    const handleCardOnClick = () => {
        navigate('/editUser/' + givenUser.getId());
    };

    const modalContext = useContext(ModalContext)!;
    const setUserId = modalContext.setUserId;
    const setModalStatus = modalContext.setModalStatus;

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
                    {/* <div className='user-id'>ID: {givenUser.getId()}</div> */}
                    <div className='first-name'>First Name: {givenUser.getFirstName()}</div>
                    <div className='last-name'>Last Name: {givenUser.getLastName()}</div>
                </div>
            </div>
        </div>
    );
}
