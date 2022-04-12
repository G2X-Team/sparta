import type { HTMLAttributes, FC, CSSProperties, ChangeEvent } from 'react';
import React, { ReactNode, useEffect } from 'react';
import './Group.css';

import type { Apollo } from '../../interfaces/Apollo';
import type { FormGroupData, FormValidator } from '../../interfaces/Properties';
import { gaurdApolloName } from '../../util/ErrorHandling';
import FormatChildren from '../../util/FormatChildren';

import { Text } from '../Text/Text';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import Radio from './overload/Radio';
import Checkbox from './overload/Checkbox';
import View from './overload/View';

export interface IGroup
    extends Omit<HTMLAttributes<HTMLFieldSetElement>, 'onChange'>,
        Apollo<'Group'> {
    /** Group must contain element between tags */
    children: ReactNode;
    /** Identifies the group's selection */
    name: string;
    /** Method that impacts onChange */
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    /** Determines whether inputs are disabled or not */
    disabled?: boolean;
    /** Validates group value and determines whether it is submission ready */
    validator?: FormValidator<FormGroupData>;
    /** Determines whether the group requires a selection */
    required?: boolean;
    /** Mandatory label to comply to WCAG 2.0 */
    label: string;
    /** Gives further description on what the input should have to be valid */
    hint?: string | JSX.Element;
    /** Determines whether component is invalid or not */
    invalid?: boolean;
    /** Message that displays when component is invalid */
    errorMessage?: string;
    /** Determines whether checkboxes and radios are inline or blocks */
    inline?: boolean;
    /**
     * Describes behavior of group, if the value is `input` it will register radios and checkboxes,
     * otherwise, it will just serve the purpose of general organization, will replace label with
     * header styling
     */
    type?: 'input' | 'organization';
}

/**
 * Component that will represent values derived from radios and checkboxes and pass them
 * as parameters to its repsective on change function
 *
 * @return Group component
 */
export const Group: FC<IGroup> = ({
    type = 'input',
    disabled = false,
    inline = false,
    children,
    name,
    onChange,
    label,
    hint,
    required,
    invalid,
    errorMessage,
    defaultValue,
    ...props
}) => {
    gaurdApolloName(props, 'Group');

    // check if the user is using error message invalidly
    useEffect(() => {
        if (errorMessage?.length && !name?.length)
            throw new Error(
                'To use error message in Group, you must specify name to use error messages' +
                    ' to comply with WCAG 2.0'
            );
    });

    /**
     * Renders all inputs determinant on the specific type
     *
     * @param childrenProp implements children view when available
     * @return rendered components
     */
    const renderAll = (childrenProp: ReactNode): ReactNode[] => {
        // create updated prop values
        const parentProps = {
            onChange,
            name,
            children: childrenProp,
            renderAll,
            disabled,
            inline,
            defaultValue,
        };

        // get all instances of the input
        const formatted = new FormatChildren(parentProps, { Radio, Checkbox, View });

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
                    <Text
                        bold
                        style={labelTextStyle}
                        header={type === 'input' ? 0 : 1}
                        margins={type === 'organization' && !Boolean(hint)}
                    >
                        {label}{' '}
                        {required ? (
                            <Text color="red" inline>
                                *
                            </Text>
                        ) : null}
                    </Text>
                    {hint ? (
                        <Text style={getHintTextStyle(type)} margins={type === 'organization'}>
                            {hint}
                        </Text>
                    ) : null}
                </legend>
                <div
                    className={`
                        apollo-component-library-group-wrapper 
                        ${invalid ? 'invalid' : ''}
                    `}
                >
                    {renderAll(children)}
                </div>
                <ErrorMessage id={`${name}-error`} active={Boolean(invalid && errorMessage)}>
                    {errorMessage}
                </ErrorMessage>
            </fieldset>
        </>
    );
};

Group.defaultProps = { 'data-apollo': 'Group' };

const labelTextStyle: CSSProperties = {
    paddingBottom: 5,
};

/**
 * gets the hint text style given the type
 *
 * @param type type that describes what kind of group is being used
 * @return hint style object
 */
const getHintTextStyle = (type: string): CSSProperties => {
    return {
        fontSize: type === 'organization' ? '1rem' : '0.9rem',
        paddingBottom: 5,
        marginTop: 0,
    };
};
