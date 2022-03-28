import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Button } from '../src';

describe('Button', () => {
    it('renders correctly', () => {
        // given
        render(<Button>Hello World!</Button>);

        // when then
        expect(screen.getByText(/hello world!/i)).toBeInTheDocument();
    });

    it('will call onClick call back', () => {
        // given
        const onClick: jest.Mock<any, any> = jest.fn();
        render(<Button onClick={onClick}>Trying my best</Button>);

        // when
        userEvent.click(screen.getByRole('button', { name: /trying my best/i }));

        // then
        expect(onClick).toHaveBeenCalledTimes(1);
    });
});
