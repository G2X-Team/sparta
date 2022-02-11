import React from 'react';
import { screen, render } from '@testing-library/react';

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
        render(<DateTimePicker selectedDate={'25/02/2022'} />);
        const date = document.querySelector('input[value="24/02/2022"]');

        // when then
        expect(date).not.toBeTruthy();
    });
});
