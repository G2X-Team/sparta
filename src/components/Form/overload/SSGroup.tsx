import type { FC, CSSProperties } from 'react';
import React, { useEffect } from 'react';

import Overload from '../../../interfaces/Overload';
import FormatChildren from '../../../util/FormatChildren';

import type { IGroup as GroupProps } from '../../Group/Group';
import { Text } from '../../Text/Text';

import Radio from './SSRadio';
import Checkbox from './SSCheckbox';

interface IGroup extends Overload<GroupProps> {
    name: string;
}

/**
 * Formatted Group, will serve as passthrough for parent props when in remix validation mode
 *
 * @return formatted group that complies with remix validation
 */
const Group: FC<IGroup> = ({
    parentProps: { actionData = { fields: {}, fieldErrors: {} } },
    type = 'input',
    disabled = false,
    inline = false,
    children,
    name,
    onChange,
    label,
    hint,
    required,
    ...props
}) => {
    useEffect(() => {
        if (type === 'organization') return;

        if (!name?.length) throw new Error('Must use Group `name` prop when using Form.');
    });

    /**
     * Formats children components and passes the parent props through
     *
     * @return formatted children
     */
    const renderAll = (): JSX.Element[] => {
        const newParentProps = { children, groupName: name, actionData, groupInline: inline };
        const formatted = new FormatChildren(newParentProps, { Radio, Checkbox });

        return formatted.getAll();
    };

    const errorMessage = actionData?.fieldErrors ? actionData?.fieldErrors[name] : undefined;
    const invalid: boolean = errorMessage?.length;

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
                    {renderAll()}
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

const errorTextStyle: CSSProperties = {
    paddingTop: 5,
};

export default Group;
