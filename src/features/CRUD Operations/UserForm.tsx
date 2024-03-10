import { UserFormType } from '../../types/UserFormProps.types';
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
        <div className='form-div' data-testid='user-form'>
            <form className='user-form'>
                {formEntries.map((entry) => (
                    <FormEntry key={entry.label} label={entry.label} ref={entry.ref} />
                ))}
            </form>
        </div>
    );
}
