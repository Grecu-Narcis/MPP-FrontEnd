import axios from "axios";
import { LoginResponseDTO } from "../../types/LoginResponseDTO.types";
import { endPointUrl } from "../config";

const apiEndpoint = endPointUrl + '/api/auth';

export async function registerUser(firstName: string, lastName: string, email: string, password: string) {
    const response = await axios.post(apiEndpoint + '/register', 
        {
            'firstName': firstName,
            'lastName': lastName,
            'email': email,
            'password': password
        }
    );

    return response.data;
}

export async function loginUser(email: string, password: string) {
    try {
        const response = await axios.post(apiEndpoint + '/login',
            {
                'email': email,
                'password': password
            }
        );

        if (response.status === 200)
            return response.data as LoginResponseDTO;

        throw new Error('Failed to login!');
    }
    
    catch (error) {
        throw new Error('Failed to login!');
    }
}