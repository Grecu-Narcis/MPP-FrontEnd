import './DisplayUsersPage.css';

import { User } from '../../models/user';
import { UserCard } from '../../features/Display Users/UserCard';
import { Layout } from '../../shared/components/layout/Layout';

import { UsersContext } from '../../contexts/UsersContext';

import { useContext } from 'react';

export function DisplayUsersPage() {
    document.title = 'Users dashboard!';

    const usersContext = useContext(UsersContext)!;

    let usersArray: User[] = usersContext.users;
    const removeMethod = usersContext.removeUser;

    return (
        <Layout>
            <div className='main-page-container'>
                <div className='users-list'>
                    {usersArray.map((user) => (
                        <UserCard user={user} removeMethod={removeMethod} key={user.getId()} />
                    ))}
                </div>
            </div>
        </Layout>
    );
}
