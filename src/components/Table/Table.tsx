import { HTMLAttributes, FC, ReactNode, CSSProperties } from 'react';
import type { Apollo } from '../../interfaces/Apollo';
import type * as CSS from 'csstype';
import type { TableData } from '../../interfaces/Properties';

import React, { useState } from 'react';
import { gaurdApolloName } from '../../util/ErrorHandling';
import { Column, IColumn } from './overload/Column';

import ChildrenMeta from '../../util/ChildrenMeta';
import TableHead from './components/TableHead';
import TableBody from './components/TableBody';
import './Table.css';
import { Grid } from '../Grid/Grid';
import { TableNav } from './components/TableNav';

export interface ITable
    extends Omit<HTMLAttributes<HTMLTableElement>, 'onSelect'>,
        Apollo<'Table'> {
    /** Data to be displayed in table */
    data: TableData;
    /** Label describing the table (required for ID purposes) */
    label: string;
    /** Paginate is the number that will determine how many rows are displayed per page in table */
    paginate?: number;
    /** Impacts the  */
    width?: CSS.Property.Width;
    height?: CSS.Property.Height;
    /**
     * For more control over formatting, you can use template grid columns to space your table
     * effectively
     */
    columns?: CSS.Property.GridTemplateColumns;
    /** Determines the outline between cells */
    grid?: 'horizontal' | 'vertical' | 'both' | 'none';
}

export interface TableMeta {
    /** Is an array with the keys sorted in the desired column orientation */
    columnOrder: Array<string | number>;
    /** Map that stores all render methods by key */
    dataRenderMap: { [key: string]: ((data: ReactNode) => ReactNode) | undefined };
    /** Map that stores all row handling methods by key */
    rowHandlerMap: { [key: string]: IColumn['rowHandler'] };
    /** Map that stores desired render format */
    headerRenderMap: { [key: string]: ReactNode };
    /** Map that stores all storable keys */
    canSort: { [key: string]: 'string' | 'number' | 'date' | undefined };
    /** Map that stores all alignment preferences by key */
    alignmentMap: { [key: string]: 'center' | 'left' | 'right' | undefined };
}

/** Object that keeps track of last sort */
export type LastSort = {
    [key: string]: 'up' | 'down';
} | null;

/**
 * Apollo table component
 *
 * @return Table Component
 */
export const Table: FC<ITable> & { Column: FC<IColumn> } = ({
    data: d,
    className = '',
    grid = 'horizontal',
    children,
    paginate,
    label,
    width,
    height,
    style,
    columns,
    ...props
}: ITable) => {
    gaurdApolloName(props, 'Table');

    const [data, setData] = useState(d);
    const [lastSort, setLastSort] = useState<LastSort>(null);
    const [start, setStart] = useState(0);

    /**
     * Will render all table components based on given meta
     *
     * @return Table rows
     */
    const renderTable = (): JSX.Element => {
        // define desired table meta object
        const tableMeta: TableMeta = {
            columnOrder: [],
            dataRenderMap: {},
            headerRenderMap: {},
            rowHandlerMap: {},
            alignmentMap: {},
            canSort: {},
        };

        // extract meta from children
        const meta = new ChildrenMeta(children, { ['Table.Column']: Column });

        // determine other components
        if (meta.hasOther()) throw new Error('Only table columns allowed as children');

        // extract data from columns
        const columns = meta.get<IColumn>('Table.Column');
        columns?.forEach((column, index) => {
            // get all relevant props
            const { datakey, dataRenderer } = column.props;

            // start assigning values
            tableMeta.columnOrder[index] = datakey;
            tableMeta.dataRenderMap[datakey] = dataRenderer;
            tableMeta.rowHandlerMap[datakey] = column.props?.rowHandler;
            tableMeta.headerRenderMap[datakey] = column.props?.header;
            tableMeta.canSort[datakey] = column.props?.sort;
            tableMeta.alignmentMap[datakey] = column.props?.align;
        });

        return (
            <>
                <TableHead
                    data={data}
                    setData={setData}
                    lastSort={lastSort}
                    setLastSort={setLastSort}
                    tableMeta={tableMeta}
                    label={label}
                />
                <TableBody
                    tableMeta={tableMeta}
                    label={label}
                    data={data}
                    start={start}
                    paginate={paginate}
                />
            </>
        );
    };

    // class name after all modifications
    const moddedClassName = `apollo ${className} ${columns ? 'has-columns' : ''} grid-${grid}`;

    return (
        <Grid
            style={{ maxWidth: width, minHeight: height }}
            data-apollo-id="TableWrapper"
            className={moddedClassName}
            rows={paginate ? 'auto auto' : undefined}
        >
            <table {...props} style={getStyle({ style, columns, data, width, height })}>
                {renderTable()}
            </table>
            <TableNav
                paginate={paginate}
                dataLength={data.length}
                start={start}
                setStart={setStart}
            />
        </Grid>
    );
};

Table.defaultProps = {
    'data-apollo': 'Table',
};
Table.Column = Column;

/**
 * Gets table style
 * @return table style
 */
const getStyle = ({ columns, style }: Omit<ITable, 'label'>): CSSProperties => {
    return {
        gridTemplateColumns: columns ?? '',
        ...style,
    };
};
