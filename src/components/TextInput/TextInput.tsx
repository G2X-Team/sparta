import type { HTMLAttributes, FC, CSSProperties } from 'react';
import React, { useEffect } from 'react';

import type { FormTextData, FormValidator, StyleVariant } from '../../interfaces/Properties';
import './TextInput.css';

import { Text } from '../Text/Text';

export interface ITextInput extends HTMLAttributes<HTMLInputElement> {
    /** To comply with WCAG 2.0, all inputs **must** have labels */
    label: string;
    /** Gives further description on what the input should have to be valid */
    hint?: string;
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
    validator?: FormValidator<FormTextData>;
    /** Determines whether input is valid or not */
    invalid?: boolean;
    /** Name of input */
    name?: string;
    /** Message displayed when input is invalid */
    errorMessage?: string;
}

/**
 * Input that allows for user input via keyboard
 *
 * @return TextInput component
 */
export const TextInput: FC<ITextInput> = ({
    variant = 'default',
    className = '',
    password = false,
    invalid = false,
    name,
    errorMessage,
    required,
    id,
    hint,
    label,
    ...iTextInput
}) => {
    // will throw if you try to add an error message without a name
    useEffect(() => {
        if (errorMessage?.length && !name?.length)
            throw new Error(
                'To use error message in TextInput, you must specify name to use error messages' +
                    ' to comply with WCAG 2.0'
            );
    }, []);

    return (
        <div className="apollo-component-library-text-input-label">
            <label>
                <Text bold style={labelTextStyle}>
                    {label}{' '}
                    {required ? (
                        <Text inline color="red">
                            *
                        </Text>
                    ) : null}
                </Text>
                {hint?.length ? <Text style={hintTextStyle}>{hint}</Text> : null}
                <input
                    {...iTextInput}
                    aria-required={required}
                    aria-invalid={invalid}
                    aria-errormessage={name ? `${name}-error` : undefined}
                    type={password ? 'password' : 'text'}
                    className={`apollo-component-library-text-input 
                        ${variant} 
                        ${!invalid ? 'valid' : 'invalid'}
                        ${className}
                    `}
                />
            </label>
            {invalid && errorMessage ? (
                <div role="alert" id={name ? `${name}-error` : undefined}>
                    <Text color="#c90000" style={errorTextStyle}>
                        {errorMessage}
                    </Text>
                </div>
            ) : null}
        </div>
    );
};

const labelTextStyle: CSSProperties = {
    paddingBottom: 5,
};

const hintTextStyle: CSSProperties = {
    fontSize: '0.9rem',
    paddingBottom: 5,
};

const errorTextStyle: CSSProperties = {
    paddingTop: 5,
};
