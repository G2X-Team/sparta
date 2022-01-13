import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Default as Radio } from '../stories/Radio.stories';

describe('Radio', () => {
    it('renders correctly', () => {
        // given
        render(<Radio value="something">Hello World!</Radio>);

        // when then
        expect(screen.getByText(/hello world!/i)).toBeInTheDocument();
    });

    it('triggers onChange method when clicked', () => {
        // given
        const onChange: jest.Mock<any, any> = jest.fn();
        render(
            <Radio value="something" onChange={onChange}>
                Hello World!
            </Radio>
        );
        const radio: HTMLElement = screen.getByRole('radio');

        // when
        userEvent.click(radio);

        // then
        expect(onChange).toHaveBeenCalled();
    });

    it('will not trigger onChange when disabled', () => {
        // given
        const onChange: jest.Mock<any, any> = jest.fn();
        render(
            <Radio value="something" disabled onChange={onChange}>
                Hello World!
            </Radio>
        );
        const radio: HTMLElement = screen.getByRole('radio');

        // when
        userEvent.click(radio);

        // then
        expect(onChange).not.toHaveBeenCalled();
    });
});
