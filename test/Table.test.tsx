import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Table } from '../src';

describe('Table', () => {
    it('renders correctly', () => {
        const data1 = [['1', 'name']];

        // given
        render(
            <Table label="Table" data={data1}>
                <Table.Column datakey="guid" header="header" />
            </Table>
        );

        // when then
        expect(screen.queryAllByRole('table')).toHaveLength(1);
    });

    it('accepts two types of data correctly', () => {
        // given
        const data1 = [['1', 'name']];
        const data2 = [
            {
                guid: '1',
                name: 'name',
            },
        ];

        // when
        render(
            <Table label="Table" data={data1}>
                <Table.Column datakey="guid" header="header" />
            </Table>
        );
        render(
            <Table label="Table" data={data2}>
                <Table.Column datakey="guid" header="header" />
            </Table>
        );

        // then
        expect(screen.queryAllByRole('table')).toHaveLength(2);
    });

    it('will only show columns displayed', () => {
        // given
        const data = [
            {
                guid: '1',
                name: 'name',
            },
        ];

        // when
        render(
            <Table label="Table" data={data}>
                <Table.Column datakey="guid" header="header" />
            </Table>
        );

        // then
        expect(screen.queryAllByRole('columnheader')).toHaveLength(1);
    });

    it('will maintain the order of columns', () => {
        // given
        const data = [
            {
                guid: '1',
                name: 'name',
            },
        ];

        // when
        render(
            <Table label="Table" data={data}>
                <Table.Column datakey="name" header="header 1" />
                <Table.Column datakey="guid" header="header 2" />
            </Table>
        );

        // then
        const cells = screen.getAllByRole('columnheader');
        expect(cells[0]).toHaveTextContent('header 1');
        expect(cells[1]).toHaveTextContent('header 2');
    });

    it('will sort data correctly', () => {
        // given
        const data = [
            {
                guid: 2,
                name: 'name',
            },
            {
                guid: 1,
                name: 'name 2',
            },
        ];

        render(
            <Table label="Table" data={data}>
                <Table.Column datakey="name" header="header 1" />
                <Table.Column datakey="guid" header="header 2" sort="number" />
            </Table>
        );

        // when
        userEvent.click(screen.getByRole('button'));

        // then
        let cells = screen.getAllByRole('cell');
        expect(cells[1]).toHaveTextContent('2');
        expect(cells[3]).toHaveTextContent('1');

        // when
        userEvent.click(screen.getByRole('button'));

        // then
        cells = screen.getAllByRole('cell');
        expect(cells[1]).toHaveTextContent('1');
        expect(cells[3]).toHaveTextContent('2');
    });

    it('will effectively paginate', () => {
        // given
        const data = [
            {
                guid: 1,
                name: 'name',
            },
            {
                guid: 2,
                name: 'name 2',
            },
            {
                guid: 3,
                name: 'name 3',
            },
            {
                guid: 4,
                name: 'name 4',
            },
        ];

        // when
        render(
            <Table label="Table" data={data} paginate={2}>
                <Table.Column datakey="name" header="header 1" />
                <Table.Column datakey="guid" header="header 2" sort="number" />
            </Table>
        );

        // then
        let cells = screen.getAllByRole('cell');
        expect(cells).toHaveLength(4);
        expect(cells[0]).toHaveTextContent('name');
        expect(cells[1]).toHaveTextContent('1');
        expect(cells[2]).toHaveTextContent('name 2');
        expect(cells[3]).toHaveTextContent('2');

        // when
        userEvent.click(screen.getByRole('button', { name: 'Next' }));

        // then
        cells = screen.getAllByRole('cell');
        expect(cells).toHaveLength(4);
        expect(cells[0]).toHaveTextContent('name 3');
        expect(cells[1]).toHaveTextContent('3');
        expect(cells[2]).toHaveTextContent('name 4');
        expect(cells[3]).toHaveTextContent('4');

        // when
        userEvent.click(screen.getByRole('button', { name: 'Previous' }));

        // then
        cells = screen.getAllByRole('cell');
        expect(cells).toHaveLength(4);
        expect(cells[0]).toHaveTextContent('name');
        expect(cells[1]).toHaveTextContent('1');
        expect(cells[2]).toHaveTextContent('name 2');
        expect(cells[3]).toHaveTextContent('2');
    });
});
