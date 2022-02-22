import type { HTMLAttributes, ReactNode, FC } from 'react';
import React from 'react';
import { Text } from '../Text/Text';
import './Checkbox.css';

export interface Props extends HTMLAttributes<HTMLInputElement> {
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
}

/**
 * An input object that is a list of items where a single entry can be selected
 *
 * @return Checkbox component
 */
export const Checkbox: FC<Props> = ({
    inline = false,
    children,
    className,
    invalid,
    disabled = false,
    ...props
}) => {
    return (
        <label
            className={`
                apollo-component-library-checkbox-component-label 
                ${inline ? 'inline' : ''}
            `}
        >
            <input
                {...props}
                aria-invalid={invalid}
                type="checkbox"
                disabled={disabled}
                className={`
                    apollo-component-library-checkbox-component 
                    ${invalid ? 'invalid' : ''}
                    ${className || ''}
                `}
            />
            <Text inline>{children}</Text>
        </label>
    );
};
