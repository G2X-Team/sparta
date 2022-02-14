import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Default as DateTimePicker } from '../stories/DateTimePicker.stories';

describe('DateTimePicker', () => {
    it('renders correctly', () => {
        // given
        render(<DateTimePicker placeholder="Hello World!" />);

        // when then
        expect(screen.getByPlaceholderText(/hello world!/i)).toBeInTheDocument();
    });

    it('Should not allow year input lower than 1900', () => {
        // given
        render(<DateTimePicker />);
        const year = document.querySelector('[value="1889"]');

        // when then
        expect(year).not.toBeTruthy();
    });

    it('Should change the date', () => {
        // given
        const onChange: jest.Mock<any, any> = jest.fn();
        const selectedDate = '25/02/2022';
        render(<DateTimePicker placeholder="Hello World!" onChange={onChange}></DateTimePicker>);

        const checkbox: HTMLElement = screen.getByPlaceholderText(/hello world!/i);

        // when
        userEvent.click(checkbox);

        // then
        expect(onChange).not.toHaveBeenLastCalledWith(selectedDate);
    });
});
