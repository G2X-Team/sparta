import React, { HTMLAttributes, ReactNode } from 'react';
import { Text } from '../Text/Text'
import './Radio.css';

export interface Props extends HTMLAttributes<HTMLInputElement> {
    /** You can define an element pertaining to radio */
    children?: ReactNode;
    /** Determines whether input is disabled */
    disabled?: boolean;
    /** Value that the radio represents*/
    value: string;
}

/** 
 * An input object that is a list of items where a single entry can be selected
 */
export const Radio = ({children, ...props}: Props) => {
    return (
        <label>
            <input 
                {...props} 
                type="radio" 
                className="apollo-component-library-radio-component"    
            />
            <Text inline margins>{children}</Text>
        </label>
    )
}

Radio.displayName = "Radio";