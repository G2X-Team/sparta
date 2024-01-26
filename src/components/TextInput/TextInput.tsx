import { HTMLAttributes, FC, ForwardedRef, forwardRef } from 'react';
import React, { useEffect } from 'react';
import './TextInput.css';

import type { Sparta } from '../../interfaces/Sparta';
import type { FormTextData, FormValidator } from '../../interfaces/Properties';
import { guardSpartaName } from '../../util/ErrorHandling';

import { Text } from '../Text/Text';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';

export interface ITextInput extends HTMLAttributes<HTMLInputElement>, Sparta<'TextInput'> {
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
    /**
     * Hides the label from users. **Note:** Try to avoid this unless the placeholder is
     * descriptive enough
     */
    hideLabel?: boolean;
    /** Value of the input */
    value?: string;
}

/**
 * Input that allows for user input via keyboard
 *
 * @return TextInput component
 */
export const TextInput: FC<ITextInput> = forwardRef(function TextInput(
    {
        className = '',
        password = false,
        invalid = false,
        hideLabel,
        errorMessage,
        theme = 'primary',
        matchMessage,
        onFocus,
        onBlur,
        disabled,
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
    guardSpartaName(props, 'TextInput');

    // will throw if you try to add an error message without a name
    useEffect(() => {
        if (errorMessage?.length && !name?.length)
            throw new Error(
                'To use error message in TextInput, you must specify name to use error messages' +
                    ' to comply with WCAG 2.0'
            );
    }, []);

    return (
        <div className={`sparta ${theme}`} data-sparta="TextInputLabel">
            <label>
                {!hideLabel ? (
                    <div className="label">
                        {label}{' '}
                        {required ? (
                            <Text inline color="red">
                                *
                            </Text>
                        ) : null}
                    </div>
                ) : null}
                <input
                    {...props}
                    required={required}
                    disabled={disabled}
                    name={name}
                    ref={ref}
                    aria-label={hideLabel ? label : undefined}
                    aria-required={required}
                    aria-invalid={invalid}
                    aria-errormessage={name ? `${name}-error` : `${label}-error`}
                    type={password ? 'password' : 'text'}
                    className={`
                        sparta
                        ${!invalid ? 'valid' : 'invalid'}
                        ${className}
                        ${theme}
                    `}
                />
                {hint?.length && !(invalid && errorMessage) ? (
                    <div className="hint">{hint}</div>
                ) : null}
            </label>
            <ErrorMessage
                className="invalid"
                id={name ? `${name}-error` : `${label}-error`}
                active={Boolean(invalid && errorMessage)}
            >
                {errorMessage}
            </ErrorMessage>
        </div>
    );
});

TextInput.defaultProps = { 'data-sparta': 'TextInput' };
