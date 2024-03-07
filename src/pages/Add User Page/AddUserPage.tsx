import { UserForm } from '../../features/CRUD Operations/UserForm';
import { Layout } from '../../shared/components/layout/Layout';
import { User } from '../../models/user';

import './AddUserPage.css';

export function AddUserPage(props: any) {
    document.title = 'Add user';

    const handleInputChange = (newUser: User) => props.addMethod(newUser);

    return (
        <Layout>
            <div className='main-page-container'>
                <div className='main-title'>Add user</div>
                <UserForm handleAddUser={handleInputChange} />
            </div>
        </Layout>
    );
}
