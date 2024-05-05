import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Car } from '../../../models/car';
import { CarCard } from '../../../features/Display Cars/CarCard';

import './DisplayCarsPage.css';
import { Layout } from '../../../shared/components/layout/Layout';
import { getCarsCountByOwnerId, getPageOfCarsByOwnerId } from '../../../services/Cars Service/CarsService';
import { User } from '../../../models/user';
import { getUserById } from '../../../services/Users Service/UsersService';
import LoadingPage from '../../Loading Page/LoadingPage';
import InfiniteScroll from 'react-infinite-scroll-component';

export function DisplayCarsPage() {
    const [cars, setCars] = useState<Car[]>([]);

    const [isLoadingCars, setIsLoadingCars] = useState<boolean>(true);
    const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true);
    const [carsTotal, setCarsTotal] = useState<number>(0);

    const [pageNumber, setPageNumber] = useState<number>(0);

    const [user, setUser] = useState<User>();

    const { userId } = useParams();
    if (userId === undefined) return;

    const fetchCars = () => {
        getPageOfCarsByOwnerId(parseInt(userId), pageNumber, 50).then((response) => {
            setCars([...cars, ...response]);
            setPageNumber(pageNumber + 1);
        });
    };

    useEffect(() => {
        getPageOfCarsByOwnerId(parseInt(userId), pageNumber, 50).then((response) => {
            setCars(response);
            setIsLoadingCars(false);
            setPageNumber(pageNumber + 1);
        });

        getCarsCountByOwnerId(parseInt(userId)).then((response) => {
            setCarsTotal(response);
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
                <h2>
                    {carsTotal == 0 ? "You don't have any cars" : carsTotal === 1 ? 'You have one car.' : `You have ${carsTotal} cars.`}
                </h2>
                <div className='cars-list'>
                    <InfiniteScroll
                        dataLength={cars.length}
                        next={fetchCars}
                        hasMore={carsTotal > cars.length}
                        loader={<h4>Loading...</h4>}
                        className='infinite-scroll-grid'
                    >
                        {cars.map((car) => (
                            <CarCard key={car.getId()} givenCar={car} />
                        ))}
                    </InfiniteScroll>
                </div>
            </div>
        </Layout>
    );
}
