import { useContext } from 'react';

import { User } from '../../models/User';
import { UserCard } from '../../features/Display Users/UserCard';
import { Layout } from '../../shared/components/layout/Layout';
import { UsersContext } from '../../contexts/UsersContext';

import './DisplayUsersPage.css';
import { DeleteUserModal } from '../../modals/DeleteUserModal';

export default function DisplayUsersPage() {
    document.title = 'Users dashboard!';

    const usersContext = useContext(UsersContext)!;

    let usersArray: User[] = usersContext.users;

    return (
        <Layout>
            <DeleteUserModal />
            <div className='main-page-container'>
                <div className='users-list' data-testid='users-list'>
                    {usersArray.map((user) => (
                        <UserCard givenUser={user} key={user.getId()} />
                    ))}
                </div>
            </div>
        </Layout>
    );
}
