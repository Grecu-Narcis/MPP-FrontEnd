import { User } from '../models/user';

export type UserCardPropsType = {
    givenUser: User;
    removeMethod: (userId: number) => void;
};