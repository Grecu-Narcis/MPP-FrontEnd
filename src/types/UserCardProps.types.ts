import { User } from '../models/User';

export type UserCardPropsType = {
    givenUser: User;
    removeMethod: (userId: number) => void;
};