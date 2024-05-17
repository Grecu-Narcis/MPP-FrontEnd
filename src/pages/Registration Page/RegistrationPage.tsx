import { Link, useNavigate } from 'react-router-dom';
import { RegistrationForm } from '../../features/Authentication/Register Form/RegistrationForm';
import { Layout } from '../../shared/components/layout/Layout';

import './RegistrationPage.css';
import { registerUser } from '../../services/Authentication Service/AuthenticationService';
import { useContext, useEffect } from 'react';
import { ConnectionStatusContext } from '../../contexts/ConnectionStatusContext';

export default function RegistrationPage() {
    const navigator = useNavigate();
    const connectionContext = useContext(ConnectionStatusContext);

    if (!connectionContext) return;

    const isLoggedIn = connectionContext.isLoggedIn;

    const handleRegister = (firstName: string, lastName: string, email: string, password: string) => {
        registerUser(firstName, lastName, email, password).then((response) => {
            alert(response);
            navigator('/login');
        });
    };

    useEffect(() => {
        if (isLoggedIn) {
            navigator('/home');
            return;
        }
    }, []);

    return (
        <Layout>
            <div className='registration-wrapper'>
                <div className='register-message'>Create a new account</div>
                <RegistrationForm handleRegister={handleRegister} />

                <div className='terms-message'>By signing up, you agree to our Terms and Conditions</div>
                <Link to={'/login'} className='login-link'>
                    Already have an account? Login
                </Link>
            </div>
        </Layout>
    );
}
