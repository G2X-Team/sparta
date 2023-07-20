import type { HTMLAttributes, FC, ForwardedRef, CSSProperties } from 'react';
import React, { forwardRef } from 'react';
import './Icon.css';

import type { Apollo } from '../../interfaces/Apollo';
import type * as CSS from 'csstype';
import { gaurdApolloName } from '../../util/ErrorHandling';

export interface IIcon extends HTMLAttributes<HTMLSpanElement>, Apollo<'Icon'> {
    /** The icon name the user wants to render */
    name: string;
    /** Specification of an onClick method will convert icon into a button */
    onClick?: () => void;
    /** Color value that you want to assign to icon */
    color?: CSS.Property.Color;
    /** determines whether icon has disabled styling or not */
    disabled?: boolean;
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
        theme = 'primary',
        color,
        className = '',
        disabled,
        style,
        ...props
    }: IIcon,
    ref: ForwardedRef<HTMLSpanElement | HTMLButtonElement>
) {
    gaurdApolloName(props, 'Icon');

    return clickable ? (
        <button
            {...props}
            role={clickable ? 'button' : undefined}
            ref={ref as ForwardedRef<HTMLButtonElement>}
            style={getIconStyle(disabled, color, style)}
            onKeyDown={(event) =>
                (event.key === 'Enter' || event.key === ' ') && onClick && onClick()
            }
            className={`material-icons apollo
                ${clickable ? 'clickable' : ''} ${className} ${theme}`}
            onClick={onClick}
        >
            {name}
        </button>
    ) : (
        <span
            {...props}
            role={clickable ? 'button' : undefined}
            ref={ref}
            style={getIconStyle(disabled, color, style)}
            onKeyDown={(event) =>
                (event.key === 'Enter' || event.key === ' ') && onClick && onClick()
            }
            className={`material-icons apollo
                ${clickable ? 'clickable' : ''} ${className} ${theme}`}
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
    color: string | undefined,
    style: CSSProperties | undefined
): CSSProperties => {
    const newStyle: CSSProperties = style ?? {};

    if (disabled) newStyle.color = 'gray';
    else if (color) newStyle.color = color;

    return newStyle;
};
