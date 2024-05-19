import { Link, useNavigate } from 'react-router-dom';

import './Header.css';
import { useContext, useEffect, useState } from 'react';
import { getImageByUserId } from '../../../services/Images Service/ImagesService';
import { ConnectionStatusContext } from '../../../contexts/ConnectionStatusContext';
import { Button } from '../button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
    const [profileImage, setProfileImage] = useState<string>();
    const connectionContext = useContext(ConnectionStatusContext);

    if (!connectionContext) {
        return;
    }

    const isLoggedIn = connectionContext.isLoggedIn;
    const handleLogout = connectionContext.handleLogout;

    const navigator = useNavigate();

    const handleLogoutClick = () => {
        handleLogout();
        navigator('/home');
    };

    useEffect(() => {
        if (!localStorage.getItem('userId')) return;
        const userId = parseInt(localStorage.getItem('userId')!);

        const cachedProfileImage = localStorage.getItem('profileImage');

        if (cachedProfileImage) setProfileImage(cachedProfileImage);
        else if (userId)
            getImageByUserId(userId).then((response) => {
                setProfileImage(response);
                localStorage.setItem('profileImage', response);
            });
    }, []);

    return (
        <div className='header' data-testid='header-test-id'>
            <nav className='navbar'>
                <div className='title'>TravelWheels</div>
                <div className='links'>
                    <Link to={'/home'} className='link'>
                        Home
                    </Link>
                    {isLoggedIn ? (
                        <>
                            <Link to={'/cars/' + localStorage.getItem('userId')} className='link'>
                                View cars
                            </Link>
                            {profileImage && <img src={'data:image/jpeg;base64,' + profileImage} className='profile-image link' />}
                            <FontAwesomeIcon icon={faRightFromBracket} className='logout-icon' onClick={handleLogoutClick} />
                        </>
                    ) : (
                        <>
                            <Link to={'/login'} className='login-button'>
                                <Button type='button' buttonMessage='Log in' margin='0' />
                            </Link>

                            <Link to={'/register'} className='logout-button'>
                                <Button type='button' buttonMessage='Sign up' margin='0' backgroundColor='#E5E7E9' textColor='black' />
                            </Link>
                        </>
                    )}
                </div>
            </nav>
        </div>
    );
};

export { Header };
