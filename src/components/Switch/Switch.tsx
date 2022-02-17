import type { HTMLAttributes, ReactNode, FC, CSSProperties } from 'react';
import React, { useEffect } from 'react';
import { StyleVariant } from '../../interfaces/Properties';
import { Text } from '../Text/Text';
import './Switch.css';

export interface Props extends HTMLAttributes<HTMLInputElement> {
    /** Can assign text or element to switch */
    children: ReactNode;
    /** Determines whether the switch is disabled */
    disabled?: boolean;
    /** Value that the switch represents */
    value?: string;
    /** Variant of switch */
    variant?: StyleVariant;
    /** Form name */
    name: string;
    /** Determines whether input is required or not */
    required?: boolean;
    /** Determines whether input is checked or not */
    checked?: boolean;
    /** Determines whether switch is invalid */
    invalid?: boolean;
    /** Error message to be displayed when switch value is invalid */
    errorMessage?: string;
}

/**
 * UI element that slides a button from on to off.
 *
 * @return Switch component
 */
export const Switch: FC<Props> = ({
    children,
    invalid,
    name,
    errorMessage,
    variant = 'default',
    className = '',
    ...props
}) => {
    // check if the user can use error messages
    useEffect(() => {
        if (errorMessage?.length && !name?.length)
            throw new Error(
                'To use error message in Switch, you must specify name to use error messages' +
                    ' to comply with WCAG 2.0'
            );
    });

    return (
        <div className="apollo-component-library-switch-component-wrapper">
            <label className="apollo-component-library-switch-component-label">
                <input
                    {...props}
                    aria-invalid={invalid}
                    aria-errormessage={name ? `${name}-error` : undefined}
                    type="checkbox"
                    role="switch"
                    className="apollo-component-library-switch-component-input"
                />
                <span
                    className={`
                        apollo-component-library-switch-component 
                            ${variant} 
                            ${className} 
                            ${invalid ? 'invalid' : ''}
                    `}
                />
                <Text inline>{children}</Text>
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

const errorTextStyle: CSSProperties = {
    paddingTop: 5,
};
