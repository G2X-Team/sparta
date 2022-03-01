import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Table } from '../src';

describe('Table', () => {
    it('renders correctly', () => {
        // given
        render(
            <Table
                colNames={['id', 'name', 'Age'] as any}
                data={
                    [
                        {
                            id: 12,
                            name: 'Name12',
                            Age: 30,
                        },
                        {
                            id: 2,
                            name: 'Name2',
                            Age: 30,
                        },
                    ] as any
                }
            />
        );

        // when then
        expect(screen.getByText('NAME')).toBeInTheDocument();
    });

    it('does not loads data from outside the page size', () => {
        // given
        render(
            <Table
                colNames={['id', 'name', 'Age'] as any}
                data={
                    [
                        {
                            Age: 30,
                            id: 12,
                            name: 'Name12',
                        },
                        {
                            Age: 30,
                            id: 2,
                            name: 'Name2',
                        },
                        {
                            Age: 30,
                            id: 3,
                            name: 'Name3',
                        },
                        {
                            Age: 30,
                            id: 4,
                            name: 'Name4',
                        },
                        {
                            Age: 30,
                            id: 5,
                            name: 'Name5',
                        },
                        {
                            Age: 30,
                            id: 6,
                            name: 'Name6',
                        },
                        {
                            Age: 30,
                            id: 7,
                            name: 'Name7',
                        },
                        {
                            Age: 30,
                            id: 8,
                            name: 'Name8',
                        },
                        {
                            Age: 30,
                            id: 9,
                            name: 'Name9',
                        },
                        {
                            Age: 30,
                            id: 10,
                            name: 'Name10',
                        },
                        {
                            Age: 30,
                            id: 11,
                            name: 'Name11',
                        },
                        {
                            Age: 30,
                            id: 1,
                            name: 'Adam',
                        },
                        {
                            Age: 30,
                            id: 13,
                            name: 'Name13',
                        },
                        {
                            Age: 30,
                            id: 14,
                            name: 'Name14',
                        },
                        {
                            Age: 30,
                            id: 15,
                            name: 'Name15',
                        },
                        {
                            Age: 30,
                            id: 16,
                            name: 'Name16',
                        },
                        {
                            Age: 30,
                            id: 17,
                            name: 'Name17',
                        },
                        {
                            Age: 30,
                            id: 18,
                            name: 'Name18',
                        },
                    ] as any
                }
                pageSize={15}
            />
        );

        // when then
        expect(screen.queryByText('16')).not.toBeInTheDocument();
    });

    it('loads data only mentioned in the pagesize', () => {
        // given
        render(
            <Table
                colNames={['id', 'name', 'Age'] as any}
                data={
                    [
                        {
                            Age: 30,
                            id: 12,
                            name: 'Name12',
                        },
                        {
                            Age: 30,
                            id: 2,
                            name: 'Name2',
                        },
                        {
                            Age: 30,
                            id: 3,
                            name: 'Name3',
                        },
                        {
                            Age: 30,
                            id: 4,
                            name: 'Name4',
                        },
                        {
                            Age: 30,
                            id: 5,
                            name: 'Name5',
                        },
                        {
                            Age: 30,
                            id: 6,
                            name: 'Name6',
                        },
                        {
                            Age: 30,
                            id: 7,
                            name: 'Name7',
                        },
                        {
                            Age: 30,
                            id: 8,
                            name: 'Name8',
                        },
                        {
                            Age: 30,
                            id: 9,
                            name: 'Name9',
                        },
                        {
                            Age: 30,
                            id: 10,
                            name: 'Name10',
                        },
                        {
                            Age: 30,
                            id: 11,
                            name: 'Name11',
                        },
                        {
                            Age: 30,
                            id: 1,
                            name: 'Adam',
                        },
                        {
                            Age: 30,
                            id: 13,
                            name: 'Name13',
                        },
                        {
                            Age: 30,
                            id: 14,
                            name: 'Name14',
                        },
                        {
                            Age: 30,
                            id: 15,
                            name: 'Name15',
                        },
                        {
                            Age: 30,
                            id: 16,
                            name: 'Name16',
                        },
                        {
                            Age: 30,
                            id: 17,
                            name: 'Name17',
                        },
                        {
                            Age: 30,
                            id: 18,
                            name: 'Name18',
                        },
                    ] as any
                }
                pageSize={15}
            />
        );

        // when then
        expect(screen.getByText('14')).toBeInTheDocument();
    });

    it('triggers sorting on click callback', () => {
        // given
        render(
            <Table
                colNames={['id', 'name', 'Age'] as any}
                data={
                    [
                        {
                            id: 12,
                            name: 'Name12',
                            Age: 30,
                        },
                        {
                            id: 2,
                            name: 'Adam',
                            Age: 30,
                        },
                        {
                            id: 1,
                            name: 'broda',
                            Age: 30,
                        },
                    ] as any
                }
                pageSize={10}
            />
        );
        const sortbutton: HTMLElement = screen.getByTitle('idASC');

        // when
        userEvent.click(sortbutton);
        const rows = screen.getByRole('rows0');

        // then
        expect(within(rows).queryByText('1')).toBeInTheDocument();
    });

    it('triggers sorting on click callback for string', () => {
        // given
        render(
            <Table
                colNames={['id', 'name', 'Age'] as any}
                data={
                    [
                        {
                            id: 12,
                            name: 'Name12',
                            Age: 30,
                        },
                        {
                            id: 2,
                            name: 'Adam',
                            Age: 30,
                        },
                        {
                            id: 1,
                            name: 'broda',
                            Age: 30,
                        },
                    ] as any
                }
                pageSize={10}
            />
        );
        const sortbutton: HTMLElement = screen.getByTitle('nameASC');

        // when
        userEvent.click(sortbutton);
        const rows = screen.getByRole('rows0');

        // then
        expect(within(rows).queryByText('Adam')).toBeInTheDocument();
    });
});
