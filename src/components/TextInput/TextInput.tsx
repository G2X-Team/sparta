import { HTMLAttributes, FC, CSSProperties, ForwardedRef, forwardRef } from 'react';
import React, { useEffect } from 'react';
import './TextInput.css';

import type { Apollo } from '../../interfaces/Apollo';
import type { FormTextData, FormValidator, StyleVariant } from '../../interfaces/Properties';
import { gaurdApolloName } from '../../util/ErrorHandling';

import { Text } from '../Text/Text';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';

export interface ITextInput extends HTMLAttributes<HTMLInputElement>, Apollo<'TextInput'> {
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
    /** choose an input that the string value must match */
    match?: string;
    /** Choose error message for when input doesn't match */
    matchMessage?: string;
    /** Determine whether the input is readonly */
    readOnly?: boolean;
    /** Reference for component */
    ref?: ForwardedRef<HTMLInputElement>;
}

/**
 * Input that allows for user input via keyboard
 *
 * @return TextInput component
 */
export const TextInput: FC<ITextInput> = forwardRef(function TextInput(
    {
        variant = 'default',
        className = '',
        password = false,
        invalid = false,
        errorMessage,
        matchMessage,
        match,
        required,
        name,
        id,
        hint,
        label,
        ...props
    }: ITextInput,
    ref
) {
    gaurdApolloName(props, 'TextInput');

    // will throw if you try to add an error message without a name
    useEffect(() => {
        if (errorMessage?.length && !name?.length)
            throw new Error(
                'To use error message in TextInput, you must specify name to use error messages' +
                    ' to comply with WCAG 2.0'
            );
    }, []);

    return (
        <div className="apollo" data-apollo-id="TextInput-Label">
            <label>
                <Text style={labelTextStyle} color="#10333F">
                    {label}{' '}
                    {required ? (
                        <Text inline color="red">
                            *
                        </Text>
                    ) : null}
                </Text>
                <input
                    {...props}
                    required={required}
                    name={name}
                    ref={ref}
                    aria-required={required}
                    aria-invalid={invalid}
                    aria-errormessage={name ? `${name}-error` : `${label}-error`}
                    type={password ? 'password' : 'text'}
                    className={`
                        apollo
                        ${variant} 
                        ${!invalid ? 'valid' : 'invalid'}
                        ${className}
                    `}
                />
                {hint?.length && !(invalid && errorMessage) ? (
                    <Text style={hintTextStyle}>{hint}</Text>
                ) : null}
            </label>
            <ErrorMessage
                id={name ? `${name}-error` : `${label}-error`}
                active={Boolean(invalid && errorMessage)}
            >
                {errorMessage}
            </ErrorMessage>
        </div>
    );
});

TextInput.defaultProps = { 'data-apollo': 'TextInput' };

const labelTextStyle: CSSProperties = {
    paddingBottom: 5,
    fontSize: 14,
};

const hintTextStyle: CSSProperties = {
    paddingBottom: 5,
    color: '#6C8189',
    fontSize: 14,
    paddingTop: 6,
};
