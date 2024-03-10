import { User } from '../models/user';

import { ReactNode, createContext } from 'react';

type UsersContextType = {
    users: User[];
    addUser: (user: User) => void;
    removeUser: (userId: number) => void;
};

export const UsersContext = createContext<UsersContextType | null>(null);

type ProviderType = {
    userContext: UsersContextType;
    children: ReactNode;
};

function UsersContextProvider(props: ProviderType) {
    return <UsersContext.Provider value={props.userContext}>{props.children}</UsersContext.Provider>;
}

export { UsersContextProvider };
