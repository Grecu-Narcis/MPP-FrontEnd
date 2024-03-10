import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import App from '../App';

test('demo-test', () => {
    render(<App />);

    const elements = screen.getAllByTestId('user-card');

    for (let element in elements) expect(elements[element]).toBeInTheDocument();
});
