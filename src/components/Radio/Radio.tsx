import type { HTMLAttributes, ReactNode, FC } from 'react';
import React from 'react';
import { Text } from '../Text/Text';
import './Radio.css';

export interface Props extends HTMLAttributes<HTMLInputElement> {
    /** You can define an element pertaining to radio */
    children?: ReactNode;
    /** Determines whether input is disabled */
    disabled?: boolean;
    /** Value that the radio represents*/
    value: string;
    /** Determines whether component is checked */
    checked?: boolean;
    /** Determines whether value in radio is invalid */
    invalid?: boolean;
    /** Describes the group it belongs to */
    name?: string;
    /** Determines whether radio is inline with other elements */
    inline?: boolean;
}

/**
 * An input component that belongs to a list of others where when selected is the only
 * representative value of that group.
 *
 * @return Radio component
 */
export const Radio: FC<Props> = ({
    inline = false,
    children,
    className,
    name,
    invalid,
    ...props
}) => {
    return (
        <label
            className={`
                apollo-component-library-radio-component-label 
                ${inline ? 'inline' : ''}
            `}
        >
            <input
                {...props}
                name={name}
                aria-invalid={invalid}
                type="radio"
                className={`
                    apollo-component-library-radio-component 
                    ${className}
                    ${invalid ? 'invalid' : ''}
                `}
            />
            <Text inline>{children}</Text>
        </label>
    );
};

Radio.displayName = 'Radio';
