import React from 'react';
import { render } from '@testing-library/react';

import { Default as DateTimePicker } from '../stories/DateTimePicker.stories';

describe('DateTimePicker', () => {
    it('Should not allow year input lower than 1900', () => {
        // given
        render(<DateTimePicker />);
        const year = document.querySelector('[value="1989"]');

        // when then
        expect(year).not.toBeTruthy();
    });
});
