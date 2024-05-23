import { Button } from '../../shared/components/button/Button';
import { Layout } from '../../shared/components/layout/Layout';

import './LandingPage.css';

export default function LandingPage() {
    return (
        <Layout>
            <div className='main-div-landing'>
                <div className='welcome-header'>
                    <div className='welcome-message'>Rent your car, earn money, and get a car rental when you need it.</div>
                    <Button type='button' buttonMessage='Start renting now' className='start-renting-button' />
                </div>

                <div className='landing-info'>
                    <div className='landing-title'>Why rent a car with TravelWheels?</div>
                    <div className='landing-description'>
                        TravelWheels offers flexible car rentals that provide a convenient and affordable way to get arround. Whether you
                        need a car for a few hours, a day, or longer, we've got you covered. Plus, you can save on travel costs by renting a
                        car from a private owner, and you'll have access to a wide range of vehicles, including sedans, SUVs, trucks and
                        more.
                    </div>
                </div>
            </div>
        </Layout>
    );
}
