import { HTMLAttributes, ReactNode, FC, useEffect } from 'react';
import React from 'react';
import './Checkbox.css';

import type { Sparta } from '../../interfaces/Sparta';
import { gaurdApolloName } from '../../util/ErrorHandling';

import { Text } from '../Text/Text';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';

export interface ICheckbox extends HTMLAttributes<HTMLInputElement>, Sparta<'Checkbox'> {
    /** String that identifies the checkbox */
    id?: string;
    /**  Can have children between tags */
    children?: ReactNode;
    /** Value that the checkbox represents */
    value: string;
    /** Determines whether the user can change the input */
    disabled?: boolean;
    /** Determines whether component is checked or not */
    checked?: boolean;
    /** Determines whether component is invalid */
    invalid?: boolean;
    /** Determines what group it belongs to */
    name?: string;
    /** Determines whether checkbox is inline with other elements */
    inline?: boolean;
    /** Determines whether checkbox is required or not */
    required?: boolean;
    /** Describes checkbox error */
    errorMessage?: string;
}

/**
 * An input object that is a list of items where a single entry can be selected
 *
 * @return Checkbox component
 */
export const Checkbox: FC<ICheckbox> = ({
    inline = false,
    disabled = false,
    children,
    id,
    className,
    invalid,
    required,
    value,
    errorMessage,
    ...props
}) => {
    gaurdApolloName(props, 'Checkbox');

    // check if the user can use error messages
    useEffect(() => {
        if (errorMessage?.length && !id?.length)
            throw new Error(
                'To use error message in Checkbox, you must specify id to comply with WCAG 2.0'
            );
    });

    return (
        <>
            <label
                className={`
                    sparta-component-library-checkbox-component-label 
                    ${inline ? 'inline' : ''}
                `}
            >
                <input
                    {...props}
                    id={id}
                    value={value}
                    aria-required={required}
                    aria-invalid={invalid}
                    aria-errormessage={id ? `${id}-error` : undefined}
                    type="checkbox"
                    disabled={disabled}
                    className={`
                        sparta-component-library-checkbox-component 
                        ${invalid ? 'invalid' : ''}
                        ${className || ''}
                    `}
                />
                <Text inline>
                    {children}
                    {required ? (
                        <Text color="red" inline>
                            *
                        </Text>
                    ) : null}
                </Text>
            </label>
            {invalid && errorMessage && inline ? <br /> : null}
            <ErrorMessage
                id={id ? `${id}-error` : `${value}-error`}
                active={Boolean(invalid && errorMessage)}
            >
                {errorMessage}
            </ErrorMessage>
        </>
    );
};

Checkbox.defaultProps = { 'data-sparta': 'Checkbox' };
