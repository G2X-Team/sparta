import type { HTMLAttributes, FC, CSSProperties } from 'react';
import React, { ReactNode, useState, useEffect } from 'react';
import FormatChildren from '../../util/FormatChildren';
import './Group.css';

import { Text } from '../Text/Text';
import Radio from './overload/Radio';
import Checkbox from './overload/Checkbox';
import View from './overload/View';

export interface Props extends Omit<HTMLAttributes<HTMLFieldSetElement>, 'onChange'> {
    /** Group must contain element between tags */
    children: ReactNode;
    /** Identifies the group's selection */
    name?: string;
    /** Type of inputs this group will focus on */
    type: 'radio' | 'checkbox';
    /** Method that impacts onChange */
    onChange?: (groupValue: string[] | string) => void;
    /** Determines whether inputs are disabled or not */
    disabled?: boolean;
    /** Validates group value and determines whether it is submission ready */
    validator?: (value: string | string[]) => string | null;
    /** Determines whether the group requires a selection */
    required?: boolean;
    /** Mandatory label to comply to WCAG 2.0 */
    label: string;
    /** Gives further description on what the input should have to be valid */
    hint?: string;
    /** Determines whether component is invalid or not */
    invalid?: boolean;
    /** Message that displays when component is invalid */
    errorMessage?: string;
}

/**
 * Component that will represent values derived from radios and checkboxes and pass them
 * as parameters to its repsective on change function
 *
 * @return Group component
 */
export const Group: FC<Props> = ({
    children,
    name,
    type,
    disabled = false,
    onChange,
    label,
    hint,
    required,
    invalid,
    errorMessage,
    ...props
}) => {
    // define group value
    const [radioValues, setRadioValue] = useState('');
    const [checkboxValues, setCheckboxValue] = useState<string[]>([]);

    // for checkboxes we want instant access to whether a checkbox is checked or not
    const [isChecked, updateChecked] = useState<{ [key: string]: boolean }>({});

    // check if the user is using error message invalidly
    useEffect(() => {
        if (errorMessage?.length && !name?.length)
            throw new Error(
                'To use error message in Group, you must specify name to use error messages' +
                    ' to comply with WCAG 2.0'
            );
    });

    // every time there is a state change, invoke the onChange method if it exists
    useEffect(() => {
        if (type === 'radio') {
            onChange && onChange(radioValues);
        } else {
            onChange && onChange(checkboxValues);
        }
    }, [checkboxValues, radioValues]);

    /**
     * Renders all inputs determinant on the specific type
     *
     * @param childrenProp implements children view when available
     * @return rendered components
     */
    const renderAll = (childrenProp: ReactNode): ReactNode[] => {
        // create updated prop values
        const parentProps = {
            parentDisabled: disabled,
            children: childrenProp,
            renderAll,
            radioValues,
            setRadioValue,
            checkboxValues,
            setCheckboxValue,
            isChecked,
            updateChecked,
        };

        // determine what component we are looking for
        const Input: React.FC<any> = type === 'radio' ? Radio : Checkbox;
        const inputName: string = type === 'radio' ? 'Radio' : 'Checkbox';

        // get all instances of the input
        const formatted = new FormatChildren(parentProps, { [inputName]: Input, View });

        return formatted.getAll();
    };

    return (
        <>
            <fieldset
                {...props}
                className={`apollo-component-library-group ${invalid ? 'invalid' : ''}`}
                aria-errormessage={name ? `${name}-error` : undefined}
                aria-invalid={invalid}
            >
                <legend>
                    <Text bold style={labelTextStyle}>
                        {label}{' '}
                        {required ? (
                            <Text color="red" inline>
                                *
                            </Text>
                        ) : null}
                    </Text>
                    {hint ? <Text style={hintTextStyle}>{hint}</Text> : null}
                </legend>
                <div
                    className={`
                        apollo-component-library-group-wrapper 
                        ${invalid ? 'invalid' : ''}
                    `}
                >
                    {renderAll(children)}
                </div>
                {invalid && errorMessage ? (
                    <div role="alert" id={name ? `${name}-error` : undefined}>
                        <Text color="#c90000" style={errorTextStyle}>
                            {errorMessage}
                        </Text>
                    </div>
                ) : null}
            </fieldset>
        </>
    );
};

const labelTextStyle: CSSProperties = {
    paddingBottom: 5,
};

const hintTextStyle: CSSProperties = {
    fontSize: '0.8rem',
    paddingBottom: 5,
};

const errorTextStyle: CSSProperties = {
    paddingTop: 5,
};
