import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Default as Table } from '../stories/Table.stories';

describe('Table', () => {
    it('renders correctly', () => {
        // given
        render(<Table />);

        // when then
        expect(screen.getByText('NAME')).toBeInTheDocument();
    });

    it('does not loads data from outside the page size', () => {
        // given
        render(<Table pageSize={15} />);

        // when then
        expect(screen.queryByText('16')).not.toBeInTheDocument();
    });

    it('loads data only mentioned in the pagesize', () => {
        // given
        render(<Table pageSize={15} />);

        // when then
        expect(screen.getByText('14')).toBeInTheDocument();
    });

    it('triggers sorting on click callback', () => {
        // given
        render(<Table pageSize={10} />);
        const sortbutton: HTMLElement = screen.getByTitle('idASC');

        // when
        userEvent.click(sortbutton);
        const rows = screen.getByRole('rows0');

        // then
        expect(within(rows).queryByText('Adam')).toBeInTheDocument();
    });
});
