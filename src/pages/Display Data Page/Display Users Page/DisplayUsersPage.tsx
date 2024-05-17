import { useContext, useEffect, useState } from 'react';

import { User } from '../../../models/user';
import { UserCard } from '../../../features/Display Users/UserCard';
import { Layout } from '../../../shared/components/layout/Layout';

import { DeleteUserModal } from '../../../modals/DeleteUserModal';
import { Button } from '../../../shared/components/button/Button';

import { getUsersCount, getUsersPage } from '../../../services/Users Service/UsersService';
import LoadingPage from '../../Loading Page/LoadingPage';
import { ModalContextProvider } from '../../../contexts/ModalContext';

import './DisplayUsersPage.css';
import { ConnectionStatusContext } from '../../../contexts/ConnectionStatusContext';

/**
 * DisplayUsersPage Component
 *
 * A page component for displaying and managing users.
 *
 * This component represents a dashboard for managing users, including sorting, pagination,
 * and interaction with user cards (viewing, editing, and deleting users).
 *
 * @component
 * @returns {JSX.Element} - Rendered DisplayUsersPage component.
 * @example
 * <DisplayUsersPage />
 */
export default function DisplayUsersPage() {
    document.title = 'Users dashboard!';

    const [isAscending, setIsAscending] = useState<boolean>(true);
    const [showNext, setShowNext] = useState<boolean>(true);
    const [usersCount, setUsersCount] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [currentUsers, setCurrentUsers] = useState<User[]>([]);

    const [modalStatus, setModalStatus] = useState<boolean>(false);
    const [userId, setUserId] = useState<number>(0);

    const removeUser = () => {
        getUsersCount().then((result) => {
            setUsersCount(result);
            setIsLoading(false);
        });

        getUsersPage(0, isAscending, currentPage * 6).then((loadedPage) => {
            setCurrentUsers(loadedPage);
        });
    };

    const handleShowMore = () => {
        setIsLoading(true);

        getUsersPage(currentPage, isAscending)
            .then((nextPage) => {
                if (nextPage.length === 0) {
                    setShowNext(false);
                    setIsLoading(false);
                    return;
                }

                setCurrentUsers([...currentUsers, ...nextPage]);
                setCurrentPage(currentPage + 1);
                setIsLoading(false);
            })
            .catch(() => {
                setIsLoading(false);
                setShowNext(false);
            });
    };

    // sorting
    useEffect(() => {
        getUsersPage(0, isAscending).then((loadedPage) => {
            setCurrentPage(1);
            setCurrentUsers(loadedPage);
            setShowNext(true);
        });
    }, [isAscending]);

    // load first time
    useEffect(() => {
        getUsersPage(0, isAscending)
            .then((loadedPage) => {
                setCurrentUsers(loadedPage);
            })
            .catch((error) => {
                console.log('eroare');
                console.log(error);
            });

        getUsersCount().then((result) => {
            setUsersCount(result);
            setIsLoading(false);
        });
    }, []);

    const connectionContext = useContext(ConnectionStatusContext)!;

    const isOnline = connectionContext.isOnline;
    const isServerOnline = connectionContext.isServerOnline;

    // test for show more button if it needs to be disabled
    useEffect(() => {
        if (isLoading) return;
        if (currentUsers.length === usersCount) setShowNext(false);

        getUsersCount().then((result) => {
            setUsersCount(result);
            setIsLoading(false);
        });
    });

    if (!isOnline)
        return (
            <Layout>
                <div className='main-page-container'>You are offline</div>
            </Layout>
        );
    if (!isServerOnline)
        return (
            <Layout>
                <div className='main-page-container'>Server is offline</div>
            </Layout>
        );

    if (isLoading) return <LoadingPage />;

    return (
        <Layout>
            <ModalContextProvider modalContext={{ modalStatus, setModalStatus, userId, setUserId, removeUser }}>
                <DeleteUserModal />
                <Button
                    type='button'
                    onClick={() => {
                        setIsAscending(!isAscending);
                    }}
                    buttonMessage='Ascending/Descending'
                />

                <div className='users-list' data-testid='users-list'>
                    {currentUsers.map((user) => (
                        <UserCard givenUser={user} key={user.getId()} />
                    ))}
                </div>

                {showNext ? (
                    <>
                        <div>
                            Displaying {currentUsers.length} out of {usersCount}
                        </div>

                        <Button onClick={handleShowMore} type='button' buttonMessage='Show more' />
                    </>
                ) : (
                    <div className='users-count'>
                        Displaying {currentUsers.length} out of {usersCount}
                    </div>
                )}
            </ModalContextProvider>
        </Layout>
    );
}
