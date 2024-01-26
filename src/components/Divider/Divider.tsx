import type { HTMLAttributes, FC } from 'react';
import React from 'react';
import * as CSS from 'csstype';
import './Divider.css';

export interface IDivider extends HTMLAttributes<HTMLHRElement> {
    /** color of desired divider */
    color?: CSS.Property.Color;
    /** height of divider in pixels */
    height?: number;
}

/**
 * Component that serves as an hr for ease of templating
 *
 * @return Divider component
 */
export const Divider: FC<IDivider> = ({
    color = 'lightgray',
    className = '',
    height = 1,
    style,
    ...props
}) => {
    return (
        <hr
            role="separator"
            {...props}
            className={`sparta-component-library-divider-component ${className}`}
            style={getStyle(style, height, color)}
        />
    );
};

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
    height: number | undefined,
    color: CSS.Property.Color | undefined
): React.CSSProperties => {
    return {
        borderTop: `${height}px solid ${color}`,
        ...style,
    };
};
