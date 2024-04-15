import axios from "axios";
import { CarDTO } from "../../types/CarDTO.types";
import { Car } from "../../models/car";

const apiEndPoint = 'http://localhost:8080/api/cars';

export function convertDtoToCar(carToConvert: CarDTO) {
    return new Car(carToConvert.id, carToConvert.brand, carToConvert.model, carToConvert.year, 
        carToConvert.price, carToConvert.pictureUrl, carToConvert.mileage, carToConvert.fuelType);
}

export async function getCarById(carId: number) {
    try {
        let response = await axios.get(apiEndPoint + '/getCar/' + carId);
        return convertDtoToCar(response.data);
    }

    catch (error) {
        console.error((error as Error).message);
        return undefined;
    }
}

export async function getAllCarsByOwnerId(ownerId: number) {
    try {
        let response = await axios.get(apiEndPoint + '/getAllByOwnerId/' + ownerId);
        let result: Car[] = [];
        response.data.forEach((currentCar: CarDTO) => {
            result.push(convertDtoToCar(currentCar));
        });

        return result;
    }

    catch (error) {
        console.error((error as Error).message);
        return [];
    }
}

export async function updateCar(carToUpdate: Car) {
    try {
        await axios.put(apiEndPoint + '/updateCar', carToUpdate);
    }

    catch (error) {
        console.error((error as Error).message);
    }
}