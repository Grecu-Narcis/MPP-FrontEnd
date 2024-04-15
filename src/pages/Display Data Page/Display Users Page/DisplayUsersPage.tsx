import { useEffect, useState } from 'react';

import { User } from '../../../models/user';
import { UserCard } from '../../../features/Display Users/UserCard';
import { Layout } from '../../../shared/components/layout/Layout';

import { DeleteUserModal } from '../../../modals/DeleteUserModal';
import { Button } from '../../../shared/components/button/Button';

import { checkServerStatus, getUsersCount, getUsersPage } from '../../../services/Users Service/UsersService';
import LoadingPage from '../../Loading Page/LoadingPage';
import { ModalContextProvider } from '../../../contexts/ModalContext';

import './DisplayUsersPage.css';

export default function DisplayUsersPage() {
    document.title = 'Users dashboard!';

    let [isAscending, setIsAscending] = useState<boolean>(true);
    let [showNext, setShowNext] = useState<boolean>(true);
    let [usersCount, setUsersCount] = useState<number>(0);
    let [isLoading, setIsLoading] = useState<boolean>(true);

    let [currentPage, setCurrentPage] = useState<number>(1);
    let [currentUsers, setCurrentUsers] = useState<User[]>([]);

    let [modalStatus, setModalStatus] = useState<boolean>(false);
    let [userId, setUserId] = useState<number>(0);

    let [scrollPosition, setScrollPosition] = useState<number>(0);
    let [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
    let [isServerOnline, setIsServerOnline] = useState<boolean>(true);

    const removeUser = () => {
        getUsersCount().then((result) => {
            setUsersCount(result);
            setIsLoading(false);
        });

        getUsersPage(0, isAscending, currentPage * 3).then((loadedPage) => {
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

    const handleScroll = () => {
        const position = window.scrollY;
        setScrollPosition(position);
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
        window.addEventListener('scroll', handleScroll);
        getUsersPage(0, isAscending)
            .then((loadedPage) => {
                setCurrentUsers(loadedPage);
                // setIsLoading(false);
            })
            .catch((error) => {
                console.log('eroare');
                console.log(error);
            });

        getUsersCount().then((result) => {
            setUsersCount(result);
            setIsLoading(false);
        });

        setInterval(() => {
            setIsOnline(navigator.onLine);
            checkServerStatus()
                .then((result) => {
                    setIsServerOnline(result);
                })
                .catch(() => {
                    setIsServerOnline(false);
                });
        }, 1000);
    }, []);

    // test for show more button if it needs to be disabled
    useEffect(() => {
        console.log(scrollPosition);
        if (isLoading) return;
        if (currentUsers.length === usersCount) setShowNext(false);

        getUsersCount().then((result) => {
            setUsersCount(result);
            setIsLoading(false);
        });

        window.scrollTo({ top: scrollPosition });
    });

    if (!isOnline) return <div>Offline</div>;
    if (!isServerOnline) return <div>Server is offline</div>;

    if (isLoading) return <LoadingPage />;

    return (
        <Layout>
            <ModalContextProvider modalContext={{ modalStatus, setModalStatus, userId, setUserId, removeUser }}>
                <DeleteUserModal />
                <div className='main-page-container'>
                    <Button
                        type='button'
                        onClick={() => {
                            setIsAscending(!isAscending);
                            setScrollPosition(window.scrollY);
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
                        <div>
                            Displaying {currentUsers.length} out of {usersCount}
                        </div>
                    )}
                </div>
            </ModalContextProvider>
        </Layout>
    );
}
