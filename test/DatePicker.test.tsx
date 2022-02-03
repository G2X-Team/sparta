import React from 'react';
import { render, screen } from '@testing-library/react';

import { Default as DatePicker } from '../stories/DatePicker.stories';

describe('DatePicker', () => {
    it('renders correctly', () => {
        // given
        render(<DatePicker />);

        // when then
        expect(screen.getByRole('separator')).toBeInTheDocument();
    });
});
