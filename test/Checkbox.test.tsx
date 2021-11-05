import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Default as Checkbox } from '../stories/Checkbox.stories';

describe('Checkbox', () => {
    it('renders correctly', () => {
        // given
        render(<Checkbox value="value">Hello World!</Checkbox>);

        // when then
        expect(screen.getByText(/hello world!/i)).toBeInTheDocument();
    })

    it('triggers onChange event when checked', () => {
        // given
        const onChange: jest.Mock<any, any> = jest.fn();
        render(<Checkbox value="value" onChange={onChange}>Hello World!</Checkbox>);
        const checkbox: HTMLElement = screen.getByRole('checkbox');

        // when
        userEvent.click(checkbox);

        // then
        expect(onChange).toHaveBeenCalled();
    })

    it('will not trigger onChange when disabled', () => {
        // given
        const onChange: jest.Mock<any, any> = jest.fn();
        render(<Checkbox value="value" onChange={onChange} disabled>Failed</Checkbox>);
        const checkbox: HTMLElement = screen.getByRole('checkbox');

        // when
        userEvent.click(checkbox);

        // then
        expect(onChange).not.toHaveBeenCalled();
    })
})