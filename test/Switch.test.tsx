import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Default as Switch } from '../stories/Switch.stories';

describe('Switch', () => {
    it('renders correctly', () => {
        // given
        render(<Switch>Hello World!</Switch>);

        // when then
        expect(screen.getByText(/hello world!/i)).toBeInTheDocument();
    })

    it('can be found in the document by its role', () => {
        // given
        render(<Switch>This is a switch</Switch>);

        // when then
        expect(screen.getByRole('switch')).toBeInTheDocument();
    })

    it('will trigger onChange when clicked', () => {
        // given
        const onChange: jest.Mock<any, any> = jest.fn();
        render(<Switch onChange={onChange}>Hello World!</Switch>);

        // when
        userEvent.click(screen.getByRole('switch'));

        // then
        expect(onChange).toHaveBeenCalled();
    })

    it('will not trigger onChange when disabled', () => {
        // given
        const onChange: jest.Mock<any, any> = jest.fn();
        render(<Switch disabled onChange={onChange}>Hello World!</Switch>);

        // when
        userEvent.click(screen.getByRole('switch'));

        // then
        expect(onChange).not.toHaveBeenCalled();
    })
})