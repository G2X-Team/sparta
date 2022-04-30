/* eslint-disable react/prop-types */
import type { HTMLAttributes, ReactNode, FC, ForwardedRef } from 'react';
import React, { forwardRef } from 'react';
import './Button.css';

import type { Apollo } from '../../interfaces/Apollo';
import type { StyleVariant } from '../../interfaces/Properties';
import { gaurdApolloName } from '../../util/ErrorHandling';

import { Text } from '../Text/Text';

export interface IButton extends HTMLAttributes<HTMLButtonElement>, Apollo<'Button'> {
    /** Required ReactNode that needs to exist between component tags */
    children: ReactNode;
    /** defines the type of button to be rendered */
    variant?: StyleVariant | 'area';
    /** callback function to be called when there is a method click */
    onClick?: () => void;
    /** disables button */
    disabled?: boolean;
    /** Allows use of references */
    ref?: ForwardedRef<HTMLButtonElement>;
}

/**
 * Button component for the Apollo Component Library
 *
 * @return Button component
 */
export const Button: FC<IButton> = forwardRef(function Button(
    { children, className = '', disabled, variant = 'default', ...props }: IButton,
    ref: ForwardedRef<HTMLButtonElement>
) {
    gaurdApolloName(props, 'Button');

    return (
        <button
            {...props}
            disabled={disabled}
            className={`apollo ${variant} ${className}`}
            ref={ref}
        >
            <Text>{children}</Text>
        </button>
    );
});

Button.defaultProps = { 'data-apollo': 'Button' };
