import { UserFormType } from '../../pages/Add User Page/AddUserPage';
import { FormEntry } from './FormEntry';

import './UserForm.css';

export function UserForm(props: UserFormType) {
    const formEntries = [
        { label: 'ID', ref: props.idInput },
        { label: 'First Name', ref: props.firstNameInput },
        { label: 'Last Name', ref: props.lastNameInput },
        { label: 'URL', ref: props.urlInput },
    ];

    return (
        <div className='form-div'>
            <form className='user-form'>
                {formEntries.map((entry) => (
                    <FormEntry key={entry.label} label={entry.label} ref={entry.ref} />
                ))}
            </form>
        </div>
    );
}
