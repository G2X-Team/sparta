import { HTMLAttributes, ReactNode, FC, useEffect, CSSProperties } from 'react';
import React from 'react';
import './Radio.css';

import type { Apollo } from '../../interfaces/Apollo';
import { gaurdApolloName } from '../../util/ErrorHandling';

import { Text } from '../Text/Text';

export interface IRadio extends HTMLAttributes<HTMLInputElement>, Apollo<'Radio'> {
    /** String that identifies the radio */
    id?: string;
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
    /** Determines whether radio is required or not */
    required?: boolean;
    /** Describes if there is an error message for a single radio */
    errorMessage?: string;
}

/**
 * An input component that belongs to a list of others where when selected is the only
 * representative value of that group.
 *
 * @return Radio component
 */
export const Radio: FC<IRadio> = ({
    inline = false,
    children,
    className,
    invalid,
    required,
    errorMessage,
    id,
    ...props
}) => {
    gaurdApolloName(props, 'Radio');

    // check if the user can use error messages
    useEffect(() => {
        if (errorMessage?.length && !id?.length)
            throw new Error(
                'To use error message in Radio, you must specify id to comply with WCAG 2.0'
            );
    });

    return (
        <>
            <label
                className={`
                    apollo-component-library-radio-component-label 
                    ${inline ? 'inline' : ''}
                `}
            >
                <input
                    {...props}
                    id={id}
                    aria-required={required}
                    aria-invalid={invalid}
                    aria-errormessage={id ? `${id}-error` : undefined}
                    type="radio"
                    className={`
                        apollo-component-library-radio-component 
                        ${className}
                        ${invalid ? 'invalid' : ''}
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

Radio.defaultProps = { 'data-apollo': 'Radio' };

const errorTextStyle: CSSProperties = {
    paddingTop: 5,
    paddingBottom: 10,
};
