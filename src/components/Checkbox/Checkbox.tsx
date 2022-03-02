import { HTMLAttributes, ReactNode, FC, CSSProperties, useEffect } from 'react';
import React from 'react';
import { Text } from '../Text/Text';
import './Checkbox.css';

export interface ICheckbox extends HTMLAttributes<HTMLInputElement> {
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
    errorMessage,
    ...iCheckbox
}) => {
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
                    apollo-component-library-checkbox-component-label 
                    ${inline ? 'inline' : ''}
                `}
            >
                <input
                    {...iCheckbox}
                    aria-required={required}
                    aria-invalid={invalid}
                    aria-errormessage={id ? `${id}-error` : undefined}
                    type="checkbox"
                    disabled={disabled}
                    className={`
                        apollo-component-library-checkbox-component 
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
            {invalid && errorMessage ? (
                <div role="alert" id={id ? `${id}-error` : undefined}>
                    <Text color="#c90000" style={errorTextStyle}>
                        {errorMessage}
                    </Text>
                </div>
            ) : null}
        </>
    );
};

const errorTextStyle: CSSProperties = {
    paddingTop: 5,
    paddingBottom: 10,
};
