export type ButtonProps = {
    type: 'button' | 'submit' | 'reset' | undefined;
    className?: string;
    onClick?: (event?: any) => void;
    buttonMessage: string;
    color?: string;
    data_test_id?: string;
}