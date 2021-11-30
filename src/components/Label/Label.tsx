import React, { HTMLAttributes, useEffect, useState } from 'react';
import { findAll, FoundChildren, FoundChild } from '../../util/findAll';
import "./Label.css";

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
 */
export const Label = ({value, hint, children, className,...props}: Props) => {
    // will keep track if label is parent to a required input
    const [required, toggleRequired] = useState(false);

    // checks if there is a child with a required prop toggled on mount
    useEffect(() => {
        // get all formatted children
        const labelChildren: FoundChildren = findAll(children, []);
        
        // loop through all other children
        labelChildren.other.forEach((child: FoundChild) => {
            // check if there is a child component with its required prop toggled
            child.component?.props?.required && toggleRequired(true);
        });
    }, []);

    return (
        <label 
            className={`apollo-component-library-label-component ${className || ""}`} 
            {...props}
        >
            { value?.length ? <Text bold style={{marginBottom: 5}}>{`${value}${required ? "*" : "" }`}</Text> : null }
            { children }
            { hint?.length ? <Text color="gray" style={{fontSize: "0.8rem", marginTop: 4}}>{hint}</Text> : null }
        </label>
    )
}