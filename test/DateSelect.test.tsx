import React from 'react';
import { screen, render } from '@testing-library/react';

import { DateSelect } from '../src';
import userEvent from '@testing-library/user-event';

describe('DateSelect', () => {
    it('renders correctly when menu is closed', () => {
        // given
        render(<DateSelect label="Test" />);

        // then
        expect(screen.getByLabelText(/test/i)).toBeInTheDocument();
        expect(screen.queryByRole('application')).not.toBeInTheDocument();
    });
});
