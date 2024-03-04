import React from 'react';

import './FormEntry.css'

const fieldNameMap: Map<string, string> = new Map();
fieldNameMap.set("ID", "id");
fieldNameMap.set("First Name", "firstName");
fieldNameMap.set("Last Name", "lastName");
fieldNameMap.set("URL", "pictureUrl");

export function FormEntry(props: any) {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.handleChange(fieldNameMap.get(event.target.name), event.target.value);
    };

    return (
        <div className='form-entry'>
            <label className='form-label'>{props.label}</label>
            <input type="text"
                className="form-input"
                placeholder={props.label}
                name={props.label}
                onChange={handleChange}
            />
        </div>
    )
}