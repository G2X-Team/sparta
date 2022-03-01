import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations);

import { Switch } from '../src';

describe('Switch', () => {
    it('complies with WCAG', async () => {
        // given
        const { container: validSwitch } = render(<Switch name="switch">hello</Switch>);

        // when
        const results = [];
        results[0] = await axe(validSwitch);

        // then
        results.forEach((result: any) => expect(result).toHaveNoViolations());
    });

    it('renders correctly', () => {
        // given
        render(<Switch name="switch">Hello World!</Switch>);

        // when then
        expect(screen.getByText(/hello world!/i)).toBeInTheDocument();
    });

    it('can be found in the document by its role', () => {
        // given
        render(<Switch name="switch">This is a switch</Switch>);

        // when then
        expect(screen.getByRole('switch')).toBeInTheDocument();
    });

    it('will trigger onChange when clicked', () => {
        // given
        const onChange: jest.Mock<any, any> = jest.fn();
        render(
            <Switch name="switch" onChange={onChange}>
                Hello World!
            </Switch>
        );

        // when
        userEvent.click(screen.getByRole('switch'));

        // then
        expect(onChange).toHaveBeenCalled();
    });

    it('will not trigger onChange when disabled', () => {
        // given
        const onChange: jest.Mock<any, any> = jest.fn();
        render(
            <Switch name="switch" disabled onChange={onChange}>
                Hello World!
            </Switch>
        );

        // when
        userEvent.click(screen.getByRole('switch'));

        // then
        expect(onChange).not.toHaveBeenCalled();
    });
});
