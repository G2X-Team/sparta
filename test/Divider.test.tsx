import React from 'react';
import { render, screen } from '@testing-library/react';

import { Divider } from '../src';

describe('Divider', () => {
    it('renders correctly', () => {
        // given
        render(<Divider />);

        // when then
        expect(screen.getByRole('separator')).toBeInTheDocument();
    });
});
