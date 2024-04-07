import { ReactNode } from "react";

export type ModalContextType = {
    modalStatus: boolean;
    setModalStatus: (newStatus: boolean) => void;
    userId: string;
    setUserId: (newId: string) => void;
    removeUser: (userId: string) => void;
}

export type ModalContextProviderType = {
    modalContext: ModalContextType;
    children: ReactNode;
}