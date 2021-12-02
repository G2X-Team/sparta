import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Default as Button } from '../stories/Button.stories';

describe('Button', () => {
    it('renders correctly', () => {
        // given
        render(<Button>Hello World!</Button>);

        // when then
        expect(screen.getByText(/hello world!/i)).toBeInTheDocument();
    });

    it('can be clicked', () => {
        // given
        let onClick: jest.Mock<any, any> = jest.fn();
        render(<Button onClick={onClick}>Trying my best</Button>);

        // when
        userEvent.click(
            screen.getByRole('button', { name: /trying my best/i })
        );

        // then
        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('will render anchor element when provided an href', () => {
        // given
        render(<Button href="https://google.com">Click me</Button>);

        // when then
        expect(screen.getByText(/click me/i).closest('a')).toHaveAttribute(
            'href',
            'https://google.com'
        );
    });
});
