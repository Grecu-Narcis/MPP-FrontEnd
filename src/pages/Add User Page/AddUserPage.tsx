import { UserForm } from '../../features/CRUD Operations/UserForm';
import { Layout } from '../../shared/components/layout/Layout';

import './AddUserPage.css';

export function AddUserPage() {
    document.title = 'Add user';

    return (
        <Layout>
            <div className='main-page-container'>
                <div className='main-title'>Add user</div>
                <UserForm />
            </div>
        </Layout>
    );
}
