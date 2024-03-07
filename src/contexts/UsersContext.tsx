import { User } from '../models/user';

import { ReactNode, createContext, useContext } from 'react';

type UsersContextType = {
    users: User[];
    addUser: (user: User) => void;
    removeUser: (userId: number) => void;
};

const UsersContext = createContext<UsersContextType | null>(null);

type ProviderType = {
    userContext: UsersContextType;
    children: ReactNode;
};

function UsersContextProvider(props: ProviderType) {
    return <UsersContext.Provider value={props.userContext}>{props.children}</UsersContext.Provider>;
}

function useUsersContext() {
    const context = useContext(UsersContext);

    if (!context) throw new Error('Users Context must be used inside context provider');

    return context;
}

export { UsersContextProvider, useUsersContext };
