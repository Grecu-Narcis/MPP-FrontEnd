import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Car } from '../../../models/car';
import { CarCard } from '../../../features/Display Cars/CarCard';

import './DisplayCarsPage.css';
import { Layout } from '../../../shared/components/layout/Layout';
import { getAllCarsByOwnerId } from '../../../services/Cars Service/CarsService';
import { User } from '../../../models/user';
import { getUserById } from '../../../services/Users Service/UsersService';
import LoadingPage from '../../Loading Page/LoadingPage';

export function DisplayCarsPage() {
    let [cars, setCars] = useState<Car[]>([
        // new Car(1, 'Audi', 'A4', 2018, 20000, 'audi-a4.jpg', 10000, 'Diesel'),
        // new Car(2, 'BMW', 'X6', 2019, 30000, 'bmw-x6.jpg', 20000, 'Gasoline'),
        // new Car(3, 'Mercedes', 'C180', 2017, 15000, 'mercedes-c180.jpg', 30000, 'Diesel'),
        // new Car(4, 'Seat', 'Ibiza', 2011, 5499, 'seat-ibiza.jpg', 295345, 'Diesel'),
        // new Car(5, 'Ford', 'Mustang', 2015, 10000, 'mustang.jpg', 40000, 'Gasoline'),
        // new Car(6, 'Mazda', 'Miata', 2022, 5235, 'miata.jpg', 5234, 'Gasoline'),
        // new Car(7, 'Volkswagen', 'Golf', 2022, 30000, 'golf.jpg', 20000, 'Gasoline'),
        // new Car(4, 'Ford', 'Focus', 2015, 10000, 'ford-focus.jpg', 40000, 'Gasoline'),
    ]);
    let [isLoadingCars, setIsLoadingCars] = useState<boolean>(true);
    let [isLoadingUser, setIsLoadingUser] = useState<boolean>(true);

    let [user, setUser] = useState<User>();

    const { userId } = useParams();
    if (userId === undefined) return;

    useEffect(() => {
        getAllCarsByOwnerId(parseInt(userId)).then((response) => {
            setCars(response);
            setIsLoadingCars(false);
        });

        getUserById(userId).then((response) => {
            setUser(response);
            setIsLoadingUser(false);
        });
    }, []);

    if (isLoadingCars || isLoadingUser) return <LoadingPage />;

    return (
        <Layout>
            <div className='main-content'>
                <h1>Hi, {user?.getFirstName() + ' ' + user?.getLastName()}</h1>
                <div className='cars-list'>
                    {cars.map((car) => (
                        <CarCard key={car.getId()} givenCar={car} />
                    ))}
                </div>
            </div>
        </Layout>
    );
}
