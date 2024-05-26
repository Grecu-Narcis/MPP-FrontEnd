import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Car } from '../../../models/car';
import { CarCard } from '../../../features/Display Cars/CarCard';

import './DisplayCarsPage.css';
import { Layout } from '../../../shared/components/layout/Layout';
import { getCarsCountByOwnerId, getPageOfCarsByOwnerId } from '../../../services/Cars Service/CarsService';
import { User } from '../../../models/user';
import LoadingPage from '../../Loading Page/LoadingPage';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getDealerById } from '../../../services/Dealers Service/DealersService';

/**
 * DisplayCarsPage
 * A component that displays a user's cars with infinite scroll functionality.
 *
 * Props: None
 *
 * Example:
 * <DisplayCarsPage />
 */
export default function DisplayCarsPage() {
    const [cars, setCars] = useState<Car[]>([]);

    const [isLoadingCars, setIsLoadingCars] = useState<boolean>(true);
    const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true);
    const [carsTotal, setCarsTotal] = useState<number>(0);

    const [pageNumber, setPageNumber] = useState<number>(0);

    const [user, setUser] = useState<User>();

    const navigator = useNavigate();

    const { userId } = useParams();
    if (userId === undefined) {
        navigator('/home');
        return;
    }

    const handleError = () => {
        navigator('/home');
        return;
    };

    const fetchCars = () => {
        getPageOfCarsByOwnerId(parseInt(userId), pageNumber, 50)
            .then((response) => {
                setCars([...cars, ...response]);
                setPageNumber(pageNumber + 1);
            })
            .catch(handleError);
    };

    useEffect(() => {
        getPageOfCarsByOwnerId(parseInt(userId), pageNumber, 50)
            .then((response) => {
                setCars(response);
                setIsLoadingCars(false);
                setPageNumber(pageNumber + 1);
            })
            .catch(handleError);

        getCarsCountByOwnerId(parseInt(userId))
            .then((response) => {
                setCarsTotal(response);
            })
            .catch(handleError);

        getDealerById(userId)
            .then((response) => {
                setUser(response);
                setIsLoadingUser(false);
            })
            .catch(handleError);
    }, []);

    if (isLoadingCars || isLoadingUser) return <LoadingPage />;

    return (
        <Layout userId={parseInt(userId)}>
            <h1>{user?.getFirstName() + ' ' + user?.getLastName()}</h1>
            <h2>{carsTotal == 0 ? 'No cars available' : carsTotal === 1 ? 'One car available.' : `${carsTotal} cars available.`}</h2>
            <div className='cars-list'>
                <InfiniteScroll
                    dataLength={cars.length}
                    next={fetchCars}
                    hasMore={carsTotal > cars.length}
                    loader={<h4>Loading...</h4>}
                    className='infinite-scroll-grid'
                >
                    {cars.map((car) => (
                        <CarCard
                            key={car.getId()}
                            givenCar={car}
                            readOnly={userId != localStorage.getItem('userId') && localStorage.getItem('userRole') != 'ADMIN'}
                        />
                    ))}
                </InfiniteScroll>
            </div>
        </Layout>
    );
}
