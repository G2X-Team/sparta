import React from 'react';
import { render, screen } from '@testing-library/react';

import { Default as Divider } from '../stories/Divider.stories';

describe('Divider', () => {
    it('renders correctly', () => {
        // given
        render(<Divider />);

        // when then
        expect(screen.getByRole('separator')).toBeInTheDocument();
    })
})
