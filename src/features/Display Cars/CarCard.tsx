import { useNavigate } from 'react-router-dom';
import { CarCardProps } from '../../types/CarCardProps.types';

import './CarCard.css';

export function CarCard({ givenCar }: CarCardProps) {
    const imagePath: string = '/assets/cars/' + givenCar.getPictureUrl();

    const navigate = useNavigate();

    const handleViewCar = () => {
        navigate('/viewCar/' + givenCar.getId());
    };

    return (
        <div className='car-card'>
            <div className='car-image-details'>
                <img src={imagePath} className='car-image' alt='car' />
                <div className='car-info'>
                    <div className='make-mileage'>
                        <div className='make-brand'>{givenCar.getBrand() + ' ' + givenCar.getModel()}</div>
                        <div className='car-details'>
                            <div className='mileage-fuel'>{givenCar.getMileage().toLocaleString() + ' km, ' + givenCar.getFuelType()}</div>
                            <div className='make-year'>{givenCar.getYear()}</div>
                        </div>
                    </div>
                </div>

                <div className='price-view'>
                    <div className='price'>{givenCar.getPrice().toLocaleString() + ' €'}</div>
                    <button type='button' className='view-button' onClick={handleViewCar}>
                        View
                    </button>
                </div>
            </div>
        </div>
    );
}
