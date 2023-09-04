/* eslint-disable react/prop-types */
import { HTMLAttributes, ReactNode, FC, ForwardedRef } from 'react';
import React, { forwardRef } from 'react';
import './Button.css';

import type { Sparta } from '../../interfaces/Sparta';
import { gaurdApolloName } from '../../util/ErrorHandling';

import { Text } from '../Text/Text';
import { Spinner } from '../Spinner/Spinner';
import { Section } from '../Section/Section';

export interface IButton extends HTMLAttributes<HTMLButtonElement>, Sparta<'Button'> {
    /** Required ReactNode that needs to exist between component tags */
    children: ReactNode;
    /** defines the type of button to be rendered */
    variant?: 'solid' | 'outline' | 'none';
    /** callback function to be called when there is a method click */
    onClick?: () => void;
    /** disables button */
    disabled?: boolean;
    /** Allows use of references */
    ref?: ForwardedRef<HTMLButtonElement>;
    /** Determines the type of button */
    type?: 'button' | 'submit' | 'reset';
    /** Determines whether the button is loading or not */
    loading?: boolean;
}

/**
 * Button component for the Sparta Component Library
 *
 * @return Button component
 */
export const Button: FC<IButton> = forwardRef(function Button(
    {
        children,
        className = '',
        theme = 'primary',
        variant = 'solid',
        loading,
        disabled,
        ...props
    }: IButton,
    ref: ForwardedRef<HTMLButtonElement>
) {
    gaurdApolloName(props, 'Button');

    return (
        <button
            {...props}
            aria-busy={loading}
            disabled={disabled || loading}
            className={`apollo ${variant} ${theme} ${className}`}
            ref={ref}
        >
            {!loading ? (
                <Text ignoreTheme>{children}</Text>
            ) : (
                <Section center>
                    <Spinner size="1rem" loading innerColor="#edeff1" />
                </Section>
            )}
        </button>
    );
});

Button.defaultProps = { 'data-apollo': 'Button' };
