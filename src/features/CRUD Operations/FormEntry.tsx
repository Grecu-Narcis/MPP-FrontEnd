import { forwardRef } from 'react';

import { FormEntryPropsType } from '../../types/FormEntryProps.types';

import './FormEntry.css';

const FormEntry = forwardRef(function FormEntry({ label, ref }: FormEntryPropsType) {
    return (
        <div className='form-entry'>
            <label className='form-label'>{label}</label>
            <input type='text' className='form-input' placeholder={label} name={label} ref={ref} />
        </div>
    );
});

export { FormEntry };
