import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Default as DateTimePicker } from '../stories/DateTimePicker.stories';

describe('DateTimePicker', () => {
    it('renders correctly', () => {
        // given
        render(<DateTimePicker placeholder="Hello World!" />);

        // then
        expect(screen.getByPlaceholderText(/hello world!/i)).toBeInTheDocument();
    });

    it('Should not allow year input lower than 1900', () => {
        // given
        render(<DateTimePicker />);

        // when
        const year = document.querySelector('[value="1889"]');

        // then
        expect(year).not.toBeTruthy();
    });

    it('Should change the date', () => {
        // given
        render(<DateTimePicker placeholder="Hello World!"></DateTimePicker>);

        const dateTimePickerDiv: HTMLElement = screen.getByPlaceholderText(/hello world!/i);

        // when
        userEvent.click(dateTimePickerDiv);
        const getByLabelText: HTMLElement = screen.getByLabelText(
            'Choose Friday, February 25th, 2022'
        );
        userEvent.click(getByLabelText);
        const changedDate = document.querySelector('[value="25/02/2022"]');

        // then
        expect(changedDate).toBeTruthy();
    });
});
