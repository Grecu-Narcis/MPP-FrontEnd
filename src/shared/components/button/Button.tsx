import React from 'react';

import './Button.css';

export function Button(props: any) {
    return (
        <button type={props.type}
            className="button"
            onClick={props.onClick}>
            {props.buttonMessage}
        </button>
    );
}