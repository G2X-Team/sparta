import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { Default as DateTimePicker } from '../stories/DateTimePicker.stories';

describe('DateTimePicker', () => {
    it('Should not allow year input lower than 1900', () => {
        const { getByTestId } = render(<DateTimePicker />);

        const yearInput = getByTestId('year') as HTMLInputElement;

        fireEvent.change(yearInput, { target: { value: 1899 } });

        expect(yearInput).toHaveValue(1899);
        expect(yearInput).toBeInvalid();
    });
});
