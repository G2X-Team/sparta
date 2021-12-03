import React, { HTMLAttributes } from 'react';
import './Divider.css';

export interface Props extends HTMLAttributes<HTMLHRElement> {
    /** color of desired divider */
    color?: string;
    /** height of divider in pixels */
    height?: number;
}

/**
 * Component that serves as an hr for ease of templating
 *
 * @return Divider component
 */
export const Divider = ({
    color = 'lightgray',
    className,
    height = 1,
    style,
    ...props
}: Props): JSX.Element => {
    return (
        <hr
            role="separator"
            {...props}
            className={`apollo-component-library-divider-component ${className}`}
            style={{ borderTop: `${height}px solid ${color}`, ...style }}
        />
    );
};
