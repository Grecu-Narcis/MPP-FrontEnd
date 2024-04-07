import { User } from "../models/User";

import { ReactNode } from "react";

export type UsersContextType = {
    users: User[];
    addUser: (user: User) => void;
    removeUser: (userId: string) => void;
};

export type UsersContextProviderType = {
    userContext: UsersContextType;
    children: ReactNode;
};
