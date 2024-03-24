export type ButtonProps = {
    type: 'button' | 'submit' | 'reset' | undefined;
    className?: string;
    onClick?: () => void;
    buttonMessage: string;
    color?: string;
    data_test_id?: string;
}