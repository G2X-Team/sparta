import React from 'react';
import type { HTMLAttributes } from 'react';
import type { FC } from 'react';
import { StyleVariant } from '../../interfaces/Properties';
import './TextInput.css';

export interface Props extends HTMLAttributes<HTMLInputElement> {
    /** Placeholder text for input */
    placeholder?: string;
    /** Determines whether user can type in the text input */
    disabled?: boolean;
    /** Determines whether the text input is a password */
    password?: boolean;
    /** Determines what type of text input will be shown */
    variant?: StyleVariant;
    /** Determines whether the input is required for form submission */
    required?: boolean;
    /** Function that will determine whether input is valid for form submission */
    validator?: (value: string) => string | null;
    /** Determines whether input is valid or not */
    valid?: boolean;
    /** Name of input */
    name?: string;
}

/**
 * Input that allows for user input via keyboard
 *
 * @return TextInput component
 */
export const TextInput: FC<Props> = ({
    variant = 'default',
    className = '',
    password = false,
    valid = true,
    ...props
}: Props): JSX.Element => {
    return (
        <input
            {...props}
            className={`apollo-component-library-text-input 
                ${variant} 
                ${valid ? 'valid' : 'invalid'}
                ${className}
            `}
            type={password ? 'password' : 'text'}
        />
    );
};
