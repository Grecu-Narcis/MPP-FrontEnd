import { User } from "../models/user";

export type UserFormType = {
    idInput: React.RefObject<HTMLInputElement>;
    firstNameInput: React.RefObject<HTMLInputElement>;
    lastNameInput: React.RefObject<HTMLInputElement>;
    urlInput: React.RefObject<HTMLInputElement>;
    givenUser?: User;
};