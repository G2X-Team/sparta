import type { HTMLAttributes, FC, CSSProperties } from 'react';
import React from 'react';
import './Grid.css';

import type * as CSS from 'csstype';
import type { Interface } from '../../interfaces/Overload';
import type { Sparta } from '../../interfaces/Sparta';
import { gaurdApolloName } from '../../util/ErrorHandling';

export interface IGrid extends Interface<HTMLAttributes<HTMLDivElement>>, Sparta<'Grid'> {
    /** Grid template rows */
    rows?: CSS.Property.GridTemplateRows;
    /** Grid template columns */
    columns?: CSS.Property.GridTemplateColumns;
    /** Grid gap */
    gap?: CSS.Property.GridGap;
    /** Height of grid */
    height?: CSS.Property.Height;
    /** Width of grid */
    width?: CSS.Property.Width;
    /** Alignment of cell within grid */
    alignItems?: CSS.Property.AlignItems;
}

/**
 * Grid component used to facilitate general layout
 *
 * @return Grid component
 */
export const Grid: FC<IGrid> = ({
    parentProps,
    rows,
    columns,
    gap,
    height,
    width,
    style,
    alignItems,
    children,
    ...props
}) => {
    gaurdApolloName(props, 'Grid');

    return (
        <div
            {...props}
            style={getGridStyle({ rows, columns, gap, height, width, style, alignItems })}
        >
            {parentProps?.renderAll ? parentProps?.renderAll(children) : children}
        </div>
    );
};

/**
 * gets the grid styles
 *
 * @return grid styling
 */
const getGridStyle = ({
    rows,
    columns,
    gap,
    height,
    width,
    style,
    alignItems,
}: IGrid): CSSProperties => {
    return {
        ...style,
        gridTemplateRows: rows,
        gridTemplateColumns: columns,
        gridGap: gap,
        height: height,
        width: width,
        display: 'grid',
        alignItems,
    };
};

Grid.defaultProps = { 'data-sparta': 'Grid' };
