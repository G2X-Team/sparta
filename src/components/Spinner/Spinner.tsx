import type { Sparta } from '../../interfaces/Sparta';
import type * as CSS from 'csstype';
import type { CSSProperties, FC } from 'react';

import React from 'react';
import { StyleVariant } from '../../interfaces/Properties';
import { HTMLAttributes } from 'react';
import { guardSpartaName } from '../../util/ErrorHandling';

import './Spinner.css';

interface ISpinner extends HTMLAttributes<HTMLDivElement>, Sparta<'Spinner'> {
    /** Determines the color of the spinner */
    color?: CSS.Property.Color;
    /** Determines inner color of the spinner */
    innerColor?: CSS.Property.Color;
    /** Determines the size of the spinner */
    size?: CSS.Property.Height;
    /** Determines the variant of the spinner */
    variant?: StyleVariant;
    /** Displays spinner */
    loading?: boolean;
    /** Change the label of the string (only noticeable in screen-readers) */
    label?: string;
}

/**
 * This component is the standard spinner for the Sparta Component Library.
 *
 * @return Spinner component
 */
export const Spinner: FC<ISpinner> = ({
    color = '#95a0a8',
    size = '50px',
    innerColor = 'white',
    variant,
    loading,
    style,
    label,
    ...props
}) => {
    guardSpartaName(props, 'Spinner');

    return loading ? (
        <div
            {...props}
            style={getSpinnerStyle({ color, size, style, variant })}
            className="sparta"
            role="status"
            aria-label={label ?? 'Loading...'}
        >
            <div style={{ backgroundColor: innerColor }} />
        </div>
    ) : null;
};

/**
 * Gets the style of the spinner
 *
 * @return spinner style
 */
const getSpinnerStyle = ({ color, size, style, variant }: ISpinner): CSSProperties => {
    let finalColor = color;

    if (variant) {
        switch (variant) {
            case 'secondary':
                finalColor = '#10333f';
                break;
            case 'tertiary':
                finalColor = '#1b75bc';
                break;
            default:
                finalColor = '#95a0a8';
                break;
        }
    }

    return {
        backgroundImage: `conic-gradient(${finalColor} 25%, transparent 100%)`,
        height: size,
        width: size,
        ...style,
    };
};

Spinner.defaultProps = { 'data-sparta': 'Spinner' };
