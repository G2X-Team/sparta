import type { FC, ReactNode, HTMLAttributes } from 'react';
import type { TableData } from '../../../interfaces/Properties';
import type { TableMeta } from '../Table';

import React from 'react';
import { Text } from '../../Text/Text';

interface ITableBody extends HTMLAttributes<HTMLTableSectionElement> {
    data: TableData;
    tableMeta: TableMeta;
    label: string;
    start: number;
    paginate?: number;
}

/**
 * Apollo table body containing all content
 *
 * @return table body
 */
const TableBody: FC<ITableBody> = ({ data, tableMeta, label, start, paginate }) => {
    /**
     * Gathers all content from data and automatically generates table cells
     * appropriately.
     *
     * @return table data
     */
    const renderAll = (): JSX.Element[] => {
        // define table object
        const tableData: JSX.Element[] = [];

        // determine upper bound of table
        const upperBound = paginate ? Math.min(data.length, start + paginate) : data.length;

        // then get table data
        for (let row = start; row < upperBound; row++) {
            // define data to be placed in singular row
            const rowData: JSX.Element[] = [];

            // get data from each cell
            for (const key of tableMeta.columnOrder) {
                // define key to contain cell
                const cellKey = `${label}-${row + 1}-${key}`;
                const alignment = tableMeta.alignmentMap[key];
                const rowHandler = tableMeta.rowHandlerMap[key];
                if (rowHandler) {
                    rowData?.push(renderCell(rowHandler(data[row]), cellKey, alignment));
                    continue;
                }

                // extract data point whether it be an array or an object
                let datum: ReactNode;
                if (Array.isArray(data?.[row])) {
                    const col: number = key as number;
                    datum = (data[row] as ReactNode[])[col];
                } else {
                    const col: string = key as string;
                    datum = (data[row] as { [key: string]: ReactNode })[col];
                }

                // check if there is a render method
                const renderMethod = tableMeta?.dataRenderMap?.[key];
                if (renderMethod) {
                    rowData?.push(renderCell(renderMethod(datum), cellKey, alignment));
                } else {
                    rowData?.push(renderCell(datum, cellKey, alignment));
                }
            }

            tableData.push(<tr key={`${label}-${row + 1}`}>{rowData}</tr>);
        }

        return tableData;
    };

    return <tbody>{renderAll()}</tbody>;
};

export default TableBody;

/**
 * Helper that can render a cell for the body
 *
 * @param payload data to be nested as child in the payload
 * @param cellKey key of specific cell
 * @param alignment alignment of content in cell
 * @return cell for the table body
 */
const renderCell = (payload: ReactNode, cellKey: string, alignment = 'left'): JSX.Element => (
    <td key={cellKey} className={`${alignment}`}>
        <Text>{payload}</Text>
    </td>
);
