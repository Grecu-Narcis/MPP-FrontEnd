import { Link } from 'react-router-dom';

import './Header.css';

const Header = () => {
    return (
        <div className='header' data-testid='header-test-id'>
            <nav className='navbar'>
                <div className='title'>Rentify</div>
                <div className='links'>
                    <div>
                        <Link to='/' className='link'>
                            List users
                        </Link>
                    </div>

                    <div>
                        <Link to='/addUser' className='link'>
                            Add user
                        </Link>
                    </div>

                    <div>
                        <Link to='/chart' className='link'>
                            Chart
                        </Link>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export { Header };
