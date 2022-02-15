import type { HTMLAttributes, FC } from 'react';
import React from 'react';
import * as CSS from 'csstype';
import './Table.css';

export interface Props extends HTMLAttributes<HTMLHRElement> {
    /** color of desired table */
    color?: CSS.Property.Color;
    /** height of table in pixels */
    height?: CSS.Property.Height;
}

/**
 * Component that serves as an hr for ease of templating
 *
 * @return Table component
 */
export const Table: FC<Props> = ({ color, className = '', height, style, ...props }) => {
    return (
        <hr
            role="separator"
            {...props}
            className={`apollo-component-library-table-component ${className}`}
        />
    );
};
