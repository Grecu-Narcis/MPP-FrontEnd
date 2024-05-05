import { createContext, useEffect, useState } from 'react';
import { ConnectionStatusProps } from '../types/ConnectionStatusProps.types';
import { addMissingUsers, checkServerStatus } from '../services/Users Service/UsersService';
import { UserDTO } from '../types/UserDTO.types';

export const ConnectionStatusContext = createContext<ConnectionStatusProps | null>(null);

function ConnectionStatusContextProvider({ children }: any) {
    const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
    const [isServerOnline, setIsServerOnline] = useState<boolean>(true);

    useEffect(() => {
        const connectionInterval = setInterval(() => {
            setIsOnline(navigator.onLine);
            checkServerStatus()
                .then((result) => {
                    setIsServerOnline(result);

                    const users: UserDTO[] = JSON.parse(localStorage.getItem('users')!);

                    if (result) localStorage.setItem('users', JSON.stringify([]));

                    if (isOnline && users.length > 0) {
                        addMissingUsers(users);
                    }
                })
                .catch(() => {
                    setIsServerOnline(false);
                });
        }, 2000);

        return () => clearInterval(connectionInterval);
    }, []);

    const connectionStatusContext = {
        isOnline,
        setIsOnline,
        isServerOnline,
        setIsServerOnline,
    };

    return <ConnectionStatusContext.Provider value={connectionStatusContext}>{children}</ConnectionStatusContext.Provider>;
}

export { ConnectionStatusContextProvider };
