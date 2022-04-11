import type { HTMLAttributes, FC } from 'react';
import React from 'react';
import './Divider.css';

import type { Apollo } from '../../interfaces/Apollo';
import type * as CSS from 'csstype';
import { gaurdApolloName } from '../../util/ErrorHandling';

export interface IDivider extends HTMLAttributes<HTMLHRElement>, Apollo<'Divider'> {
    /** color of desired divider */
    color?: CSS.Property.Color;
    /** height of divider in pixels */
    height?: CSS.Property.Height;
}

/**
 * Component that serves as an hr for ease of templating
 *
 * @return Divider component
 */
export const Divider: FC<IDivider> = ({ color, className = '', height, style, ...props }) => {
    gaurdApolloName(props, 'Divider');

    return (
        <hr
            role="separator"
            {...props}
            className={`apollo-component-library-divider-component ${className}`}
            style={getStyle(style, height, color)}
        />
    );
};

Divider.defaultProps = { 'data-apollo': 'Divider' };

/**
 * Gets the style object for the divider
 *
 * @param style original style object
 * @param height adjusted height of divider
 * @param color adjusted color of divider
 * @return style object for divider
 */
const getStyle = (
    style: React.CSSProperties | undefined,
    height: CSS.Property.Height | undefined,
    color: CSS.Property.Color | undefined
): React.CSSProperties => {
    return {
        borderTop: `${height}px solid ${color}`,
        ...style,
    };
};
