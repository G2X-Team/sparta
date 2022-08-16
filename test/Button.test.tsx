import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations);

import { Button } from '../src';

describe('Button', () => {
    it('renders correctly', () => {
        // given
        render(<Button>Hello World!</Button>);

        // when then
        expect(screen.getByText(/hello world!/i)).toBeInTheDocument();
    });

    it('complies with WCAG 2.0 AA', async () => {
        // given
        const { container: defaultButton } = render(<Button>Hello World!</Button>);
        const { container: loadingButton } = render(<Button loading>Hello World!</Button>);
        const { container: disabledButton } = render(<Button disabled>Hello World!</Button>);

        // when
        const results: any[] = [];
        results.push(await axe(defaultButton));
        results.push(await axe(loadingButton));
        results.push(await axe(disabledButton));

        // then
        results.forEach((result) => {
            expect(result).toHaveNoViolations();
        });
    });

    it('will not be clickable when disabled', () => {
        // given
        const onClick: jest.Mock<any, any> = jest.fn();
        render(
            <Button disabled onClick={onClick}>
                Hello World!
            </Button>
        );
        const button = screen.getByRole('button');

        // when
        userEvent.click(button);

        // then
        expect(button).toBeDisabled();
        expect(onClick).not.toHaveBeenCalled();
    });

    it('renders correctly with loading', () => {
        // given
        render(<Button loading>Hello World!</Button>);

        // when then
        expect(screen.getByRole('status')).toBeInTheDocument();
        expect(screen.queryByText(/hello world!/i)).not.toBeInTheDocument();
    });

    it('will not be clickable when loading', () => {
        // given
        const onClick: jest.Mock<any, any> = jest.fn();
        render(
            <Button loading onClick={onClick}>
                Hello World!
            </Button>
        );
        const button = screen.getByRole('button');

        // when
        userEvent.click(button);

        // then
        expect(onClick).not.toHaveBeenCalled();
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
