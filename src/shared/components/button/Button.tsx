import './Button.css';

export function Button(props: any) {
    return (
        <button
            type={props.type}
            className={
                'button' + ' ' + (props.className ? props.className : '')
            }
            onClick={props.onClick}
        >
            {props.buttonMessage}
        </button>
    );
}
