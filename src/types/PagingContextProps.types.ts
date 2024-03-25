import { User } from "../models/User"

export type PagingContextProps = {
    currentUsers: User[],
    setCurrentUsers: (newUsers: User[]) => void,
    currentPage: number,
    setCurrentPage: (newPage: number) => void,
    pageSize: number
}