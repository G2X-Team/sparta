import React from 'react';
import { render, screen } from '@testing-library/react';

import { Default as Table } from '../stories/Table.stories';

describe('Table', () => {
    it('renders correctly', () => {
        // given
        render(<Table />);

        // when then
        expect(screen.getByText(/row /i)).toBeInTheDocument();
    });
});
