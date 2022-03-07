import type { HTMLAttributes, FC } from 'react';
import React, { useEffect } from 'react';
import * as CSS from 'csstype';
import './Icon.css';

export interface Props extends HTMLAttributes<HTMLParagraphElement> {
    /** The icon name the user wants to render */
    name: string;
    /** Specification of an onClick method will convert icon into a button */
    onClick?: () => void;
    /** Color value that you want to assign to icon */
    color?: CSS.Property.Color;
    /** determines whether icon has disabled styling or not */
    disabled?: boolean;
    /** Determines preset style of icon */
    variant?: string;
    /** This component must not have children */
    children?: undefined;
    /** Determines whether component is clickable or not */
    clickable?: boolean;
}

/**
 * Icon component that doubles as a button when necessary
 *
 * @return Icon component
 */
export const Icon: FC<Props> = ({
    name,
    onClick,
    clickable = onClick && true,
    children,
    variant = 'default',
    color = 'black',
    className = '',
    disabled,
    style,
    ...props
}) => {
    useEffect(() => {
        if (!onClick) return;

        /**
         * Will execute the onClick method on enter
         *
         * @param event keyobard event
         */
        const onEnter = (event: KeyboardEvent): void => {
            if (event.key === 'Enter') {
                onClick && onClick();
            }
        };

        window.addEventListener('keydown', onEnter);
        return () => window.removeEventListener('keydown', onEnter);
    }, []);

    return (
        <span
            {...props}
            style={getIconStyle(disabled, color, style)}
            tabIndex={onClick ? 0 : undefined}
            className={`material-icons apollo-component-library-icon-component 
                ${clickable && variant} ${className}`}
            onClick={onClick}
        >
            {name}
        </span>
    );
};

/**
 * Gets Icon style object
 *
 * @param disabled boolean determining whether icon is disabled or not
 * @param color alternative color for icon
 * @param style style component prop
 * @return icon style object
 */
const getIconStyle = (
    disabled: boolean | undefined,
    color: string,
    style: React.CSSProperties | undefined
): React.CSSProperties => {
    return { color: disabled ? 'gray' : color, ...style };
};
