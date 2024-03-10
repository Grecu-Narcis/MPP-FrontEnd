import { UserFormType } from '../../types/UserFormProps.types';
import { FormEntry } from './FormEntry';

import './UserForm.css';

export function UserForm(props: UserFormType) {
    const formEntries = [
        { label: 'ID', ref: props.idInput, placeHolder: 'ID', defaultValue: '', disabled: false },
        {
            label: 'First Name',
            ref: props.firstNameInput,
            placeHolder: 'First Name',
            defaultValue: '',
            disabled: false,
        },
        { label: 'Last Name', ref: props.lastNameInput, placeHolder: 'Last Name', defaultValue: '', disabled: false },
        { label: 'URL', ref: props.urlInput, placeHolder: 'URL', defaultValue: '', disabled: false },
    ];

    if (props.givenUser !== undefined) {
        formEntries[0].disabled = true;

        formEntries[0].defaultValue = props.givenUser.getId().toString();
        formEntries[1].defaultValue = props.givenUser.getFirstName();
        formEntries[2].defaultValue = props.givenUser.getLastName();
        formEntries[3].defaultValue = props.givenUser.getPictureUrl();
    }

    return (
        <div className='form-div' data-testid='user-form'>
            <form className='user-form'>
                {formEntries.map((entry) => (
                    <FormEntry
                        key={entry.label}
                        ref={entry.ref}
                        label={entry.placeHolder}
                        placeHolder={entry.placeHolder}
                        defaultValue={entry.defaultValue}
                        disabled={entry.disabled}
                    />
                ))}
            </form>
        </div>
    );
}
