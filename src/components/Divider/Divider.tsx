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
export const Divider: React.FC<Props> = ({
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
    height: number,
    color: string
): React.CSSProperties => {
    return {
        borderTop: `${height}px solid ${color}`,
        ...style,
    };
};
