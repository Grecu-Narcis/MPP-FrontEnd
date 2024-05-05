import axios from "axios";
import { User } from "../../models/user";
import { UserDTO } from "../../types/UserDTO.types";
import { saveImage } from "../Images Service/ImagesService";

const apiEndPoint = 'http://localhost:8080/api/users';

export function convertDtoToUser(userToConvert: UserDTO) {
    return new User(userToConvert.id!, userToConvert.firstName, userToConvert.lastName, userToConvert.pictureUrl, userToConvert.age);
}

export async function getUserById(requiredId: string) {
    const response = await axios.get(apiEndPoint + '/getUser/' + requiredId);
    return convertDtoToUser(response.data);
}

export async function getAllUsers() {
    try {
        const response = await axios.get(apiEndPoint + '/getAll');
        const users: User[] = [];
    
        response.data.forEach((currentUser: UserDTO) => {
            users.push(convertDtoToUser(currentUser));
        });
    
        return users;
    }
    catch (error) {
        return [];
    }
}

export async function getUsersPage(requiredPage: number, isAscending: boolean, pageSize: number = 6) {
    try {
    const response = await axios.get(apiEndPoint + '/getPage?page=' + requiredPage + "&isAscending=" + isAscending + "&pageSize=" + pageSize);
    const users: User[] = [];

    response.data.forEach((currentUser: UserDTO) => {
        users.push(convertDtoToUser(currentUser));
    });

    return users;
    } catch (error) {
        return [];  
    }   
}

export async function getUsersCount() {
    try {
        const response = await axios.get(apiEndPoint + '/countUsers');
        return response.data;
    }
    catch (error) {}
}

export async function addUser(userToAdd: UserDTO, profileImage: File | undefined) {

    await axios.post(apiEndPoint + '/addUser', {
        ...userToAdd,
        // image: profileImage
    })
    .then((response) => {
        console.log(response.data);

        if (!profileImage) return;
        saveImage(profileImage, response.data);
    });
}

export async function addMissingUsers(usersToAdd: UserDTO[]) {
    await axios.post(apiEndPoint + '/addUsers', usersToAdd);
}

export async function updateUser(userToUpdate: User) {
    await axios.put(apiEndPoint + '/updateUser', {
        ...userToUpdate
    });
}

export async function deleteUser(userId: number) {
    await axios.delete(apiEndPoint + '/delete/' + userId);
}

export async function checkServerStatus() {
    console.log('Checking server status...');
    try {
        await axios.get(apiEndPoint + '/ping');
        return true;
    } catch (error) {
        return false;
    }
}