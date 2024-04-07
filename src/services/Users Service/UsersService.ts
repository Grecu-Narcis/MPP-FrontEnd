import axios from "axios";
import { User } from "../../models/User";
import { UserDTO } from "../../types/UserDTO.types";

const apiEndPoint = 'http://localhost:8080/api/users';

function convertDtoToUser(userToConvert: UserDTO) {
    return new User(userToConvert.id!, userToConvert.firstName, userToConvert.lastName, userToConvert.pictureUrl, userToConvert.age);
}

export async function getUserById(requiredId: string) {
    let response = await axios.get(apiEndPoint + '/getUser/' + requiredId);
    return convertDtoToUser(response.data);
}

export async function getAllUsers() {
    let response = await axios.get(apiEndPoint + '/getAll');
    let users: User[] = [];

    response.data.forEach((currentUser: UserDTO) => {
        users.push(convertDtoToUser(currentUser));
    });

    console.log(users);
    return users;
}

export async function getUsersPage(requiredPage: number, isAscending: boolean, pageSize: number = 3) {
    try {
    let response = await axios.get(apiEndPoint + '/getPage/?page=' + requiredPage + "&isAscending=" + isAscending + "&pageSize=" + pageSize);
    let users: User[] = [];

    response.data.forEach((currentUser: UserDTO) => {
        users.push(convertDtoToUser(currentUser));
    });

    return users;
    } catch (error) {
        console.log('eroare');
        console.error((error as Error).message);
        return [];  
    }   
}

export async function getUsersCount() {
    let response = await axios.get(apiEndPoint + '/countUsers');

    console.log(response.data);
    return response.data;
}

export async function addUser(userToAdd: UserDTO) {
    await axios.post(apiEndPoint + '/addUser', {
        ...userToAdd
    });
    
}

export async function updateUser(userToUpdate: User) {
    await axios.put(apiEndPoint + '/updateUser', {
        ...userToUpdate
    });
}

export async function deleteUser(userId: string) {
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