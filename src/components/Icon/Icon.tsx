import React, { HTMLAttributes, useEffect } from 'react';
import FormattedChildren from '../../util/FormattedChildren';
import './Icon.css';

export interface Props extends HTMLAttributes<HTMLParagraphElement> {
    /** The icon name the user wants to render */
    name: string;
    /** Specification of an onClick method will convert icon into a button */
    onClick?: () => void;
    /** Color value that you want to assign to icon */
    color?: string;
    /** determines whether icon has disabled styling or not */
    disabled?: boolean;
    /** Determines preset style of icon */
    variant?: string;
}

/**
 * Icon component that doubles as a button when necessary
 *
 * @return Icon component
 */
export const Icon: React.FC<Props> = ({
    name,
    onClick,
    children,
    variant = 'default',
    color = 'black',
    disabled,
    style,
    ...props
}: Props): JSX.Element => {
    // check on render if the component has hany children
    useEffect(() => {
        const formatted = new FormattedChildren(children, []);
        if (formatted.getOther().length > 0) throw new Error('Icon component cannot have children');
    }, []);

    return (
        <i
            {...props}
            style={{ color: disabled ? 'gray' : color, ...style }}
            className={`material-icons apollo-component-library-icon-component 
                ${onClick && variant}`}
            onClick={onClick}
        >
            {name}
        </i>
    );
};
