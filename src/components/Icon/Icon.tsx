import type { HTMLAttributes, FC, ForwardedRef, RefObject } from 'react';
import React, { useEffect, forwardRef, useRef } from 'react';
import './Icon.css';

import type { Apollo } from '../../interfaces/Apollo';
import type * as CSS from 'csstype';
import { gaurdApolloName } from '../../util/ErrorHandling';

export interface IIcon extends HTMLAttributes<HTMLParagraphElement>, Apollo<'Icon'> {
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
    /** Allows use of references */
    ref?: ForwardedRef<HTMLSpanElement>;
}

/**
 * Icon component that doubles as a button when necessary
 *
 * @return Icon component
 */
export const Icon: FC<IIcon> = forwardRef(function Icon(
    {
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
    }: IIcon,
    ref: ForwardedRef<HTMLSpanElement>
) {
    gaurdApolloName(props, 'Icon');

    // define a fallback ref
    const iconRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const activeRef = (ref as RefObject<HTMLSpanElement>) || iconRef;
        if (!onClick) return;

        /**
         * Will execute the onClick method on enter
         *
         * @param event keyobard event
         */
        const onEnter = (event: KeyboardEvent): void => {
            if (
                (event.key === 'Enter' || event.key === ' ') &&
                document.activeElement === activeRef.current
            ) {
                if (onClick) onClick();
            }
        };

        window.addEventListener('keydown', onEnter);
        return () => window.removeEventListener('keydown', onEnter);
    }, [ref, iconRef]);

    return (
        <span
            {...props}
            role={clickable ? 'button' : undefined}
            ref={ref || iconRef}
            style={getIconStyle(disabled, color, style)}
            tabIndex={onClick ? 0 : undefined}
            className={`material-icons apollo-component-library-icon-component 
                ${clickable && variant} ${className}`}
            onClick={onClick}
        >
            {name}
        </span>
    );
});

Icon.defaultProps = { 'data-apollo': 'Icon' };

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
