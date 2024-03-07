import './DisplayUsersPage.css';

import { User } from '../../models/user';
import { UserCard } from '../../features/Display Users/UserCard';
import { Layout } from '../../shared/components/layout/Layout';

import { UsersContext } from '../../App';

import { useContext } from 'react';
// import { Button } from "../../shared/components/button/Button";

// import { Link } from "react-router-dom";

export function DisplayUsersPage() {
    document.title = 'Users dashboard!';

    const usersContext = useContext(UsersContext);
    if (!usersContext) throw new Error('Users Context is undefined!');

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

                {/* <Link to="addUser">
          <Button type="button" buttonMessage="Add user" />
        </Link> */}
            </div>
        </Layout>
    );
}
