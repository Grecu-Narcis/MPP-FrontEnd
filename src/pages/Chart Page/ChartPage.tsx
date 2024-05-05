import { useContext } from 'react';
import { UsersContext } from '../../contexts/UsersContext';
import { BarChart } from '@mui/x-charts';
import { Layout } from '../../shared/components/layout/Layout';

import './ChartPage.css';

export default function ChartPage() {
    const usersContext = useContext(UsersContext)!;
    const usersList = usersContext.users;

    const ageMap = new Map<number, number>();

    usersList.forEach((currentUser) => {
        if (ageMap.get(currentUser.getAge()) === undefined) ageMap.set(currentUser.getAge(), 1);
        else ageMap.set(currentUser.getAge(), ageMap.get(currentUser.getAge())! + 1);
    });

    console.log(ageMap);
    if (ageMap.size === 0)
        return (
            <Layout>
                <div className='main-page-content'>No users to display</div>
            </Layout>
        );

    return (
        <Layout>
            <BarChart
                xAxis={[
                    {
                        id: 'Age',
                        data: [...ageMap.keys()],
                        scaleType: 'band',
                    },
                ]}
                series={[
                    {
                        data: [...ageMap.values()],
                    },
                ]}
                width={500}
                height={300}
            />
        </Layout>
    );
}
