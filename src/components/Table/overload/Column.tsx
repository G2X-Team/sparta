import type { Sparta } from '../../../interfaces/Sparta';
import { FC, HTMLAttributes, ReactNode } from 'react';

import React from 'react';
import { Interface } from '../../../interfaces/Overload';
import { DataRenderer, RowHandler } from '../../../interfaces/Properties';

export interface IColumn
    extends Sparta<'Table.Column'>,
        Interface<HTMLAttributes<HTMLSpanElement>> {
    /**
     * Enables content sort for 3 data types by column. Only sort if the type of the data in this
     * column falls under this umbrella
     */
    sort?: 'string' | 'number' | 'date';
    /**
     * Aligns content in the cell
     */
    align?: 'center' | 'left' | 'right';
    /**
     * The key that the column should access to get appropriate data
     */
    datakey: string | number;
    /**
     * The element that will be rendered in place of the header
     */
    header?: ReactNode;
    /**
     * When a data renderer is provided, the default render method will be overridden with the
     * function provided for each corresponding cell
     */
    dataRenderer?: DataRenderer;
    /**
     * A row handler will not display any row data, it will instead render some UI whose main
     * purpose is to do something with the data of the entire row
     */
    rowHandler?: RowHandler;
}

/**
 * Sparta component that represents a Header's data in the table
 *
 * @return Header
 */
export const Column: FC<IColumn> = ({ datakey, dataRenderer, header, ...props }) => {
    return <span {...props} />;
};

Column.defaultProps = {
    'data-apollo': 'Table.Column',
};
