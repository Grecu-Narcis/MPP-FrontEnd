import React, { forwardRef } from 'react';

import './FormEntry.css';

const fieldNameMap: Map<string, string> = new Map();
fieldNameMap.set('ID', 'id');
fieldNameMap.set('First Name', 'firstName');
fieldNameMap.set('Last Name', 'lastName');
fieldNameMap.set('URL', 'pictureUrl');

const FormEntry = forwardRef(function FormEntry(props: any, ref: React.Ref<HTMLInputElement>) {
    return (
        <div className='form-entry'>
            <label className='form-label'>{props.label}</label>
            <input type='text' className='form-input' placeholder={props.label} name={props.label} ref={ref} />
        </div>
    );
});

export { FormEntry };
