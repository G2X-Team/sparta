import React from 'react';
import { render, screen } from '@testing-library/react';
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
        render(<Table />);
        const sortbutton: HTMLElement = screen.getByTitle('idASC');
        console.log(sortbutton);

        // when
        userEvent.click(sortbutton);

        // then
        expect(screen.queryByText('Ahmed')).toBeInTheDocument();
    });
});
