import { useContext, useEffect, useState } from 'react';

import { User } from '../../models/User';
import { UserCard } from '../../features/Display Users/UserCard';
import { Layout } from '../../shared/components/layout/Layout';
import { UsersContext } from '../../contexts/UsersContext';

import './DisplayUsersPage.css';
import { DeleteUserModal } from '../../modals/DeleteUserModal';
import { Button } from '../../shared/components/button/Button';
import { PagingContext } from '../../contexts/PagingContext';

export default function DisplayUsersPage() {
    document.title = 'Users dashboard!';

    let [isAscending, setIsAscending] = useState<boolean>(true);
    let [showNext, setShowNext] = useState<boolean>(true);

    const usersContext = useContext(UsersContext)!;
    const pagingContext = useContext(PagingContext)!;

    let allUsers: User[] = usersContext.users;

    let currentUsers: User[] = pagingContext.currentUsers;
    let setCurrentPage = pagingContext.setCurrentPage;
    let setCurrentUsers = pagingContext.setCurrentUsers;
    let currentPage = pagingContext.currentPage;
    let pageSize = pagingContext.pageSize;

    // sorting
    useEffect(() => {
        currentUsers.sort((firstUser, secondUser) => {
            return firstUser.getAge() - secondUser.getAge();
        });
        if (!isAscending) currentUsers.reverse();
    }, [isAscending]);

    // initial setup of current users
    // useEffect(() => {
    //     setCurrentUsers(allUsers.slice(0, pageSize));
    //     setCurrentPage(currentPage + 1);
    // }, []);

    const handleOnClick = () => {
        console.log(currentPage * pageSize, (currentPage + 1) * pageSize);
        let nextPage = allUsers.slice(currentPage * pageSize, (currentPage + 1) * pageSize);

        setCurrentUsers([...currentUsers, ...nextPage]);
        setCurrentPage(currentPage + 1);
    };

    useEffect(() => {
        if (currentPage * pageSize >= allUsers.length) {
            setShowNext(false);
            return;
        }
    }, [currentPage]);

    return (
        <Layout>
            <DeleteUserModal />
            <div className='main-page-container'>
                <Button type='button' onClick={() => setIsAscending(!isAscending)} buttonMessage='Ascending/Descending' />

                <div className='users-list' data-testid='users-list'>
                    {currentUsers.map((user) => (
                        <UserCard givenUser={user} key={user.getId()} />
                    ))}
                </div>

                {showNext ? (
                    <>
                        <div>
                            {currentPage * pageSize} out of {allUsers.length}
                        </div>

                        <Button onClick={handleOnClick} type='button' buttonMessage='Show more' />
                    </>
                ) : (
                    <div>
                        {allUsers.length} out of {allUsers.length}
                    </div>
                )}
            </div>
        </Layout>
    );
}
