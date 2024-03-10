import { forwardRef } from 'react';

import { FormEntryProps } from '../../types/FormEntryProps.types';

import './FormEntry.css';

const FormEntry = forwardRef<HTMLInputElement, FormEntryProps>((props, ref) => {
    return (
        <div className='form-entry'>
            <label className='form-label'>{props.label}</label>
            {props.defaultValue === '' ? (
                <input
                    type='text'
                    className='form-input'
                    placeholder={props.placeHolder}
                    disabled={props.disabled}
                    ref={ref}
                />
            ) : (
                <input
                    type='text'
                    className='form-input'
                    placeholder={props.defaultValue}
                    defaultValue={props.defaultValue}
                    disabled={props.disabled}
                    ref={ref}
                />
            )}
        </div>
    );
});

export { FormEntry };
