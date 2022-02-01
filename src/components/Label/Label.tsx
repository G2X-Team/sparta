import React, { useEffect, useState } from 'react';
import type { HTMLAttributes } from 'react';
import type { FC } from 'react';
import FormatChildren from '../../util/FormatChildren';
import './Label.css';

import { Text } from '../Text/Text';

export interface Props extends HTMLAttributes<HTMLLabelElement> {
    /** Value that will be displayed as label */
    value: string;
    /** Descriptive text that will help further describe the input */
    hint?: string;
}

/**
 * Label for all form components that will allow for label standardization across all
 * components
 *
 * @return Label component
 */
export const Label: FC<Props> = ({
    value,
    hint,
    children,
    className = '',
    ...props
}: Props): JSX.Element => {
    // will keep track if label is parent to a required input
    const [required, toggleRequired] = useState(false);

    // checks if there is a child with a required prop toggled on mount
    useEffect(() => {
        // get all formatted children
        const formatted = new FormatChildren({ children });
        if (formatted.getAll().length > 1) throw new Error('Label cannot have more than one child');

        // get required prop from child
        const [child] = formatted.getAll();
        toggleRequired(child.props.required);
    }, []);

    return (
        <label className={`apollo-component-library-label-component ${className}`} {...props}>
            {value?.length ? (
                <Text bold style={labelStyle}>{`${value}${required ? '*' : ''}`}</Text>
            ) : null}
            {children}
            {hint?.length ? (
                <Text color="gray" style={hintStyle}>
                    {hint}
                </Text>
            ) : null}
        </label>
    );
};

const labelStyle: React.CSSProperties = {
    marginBottom: 5,
};

const hintStyle: React.CSSProperties = {
    fontSize: '0.8rem',
    marginTop: 4,
};
