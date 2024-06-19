import axios from "axios";
import { endPointUrl } from "../config";

const apiEndpoint = endPointUrl + '/api/ai';

export async function requestResponse(carId: string, message: string) {
    const response = await axios.post(apiEndpoint + '/generate', 
        {
            carId: carId,
            message: message
        }
    );

    return response.data;
}