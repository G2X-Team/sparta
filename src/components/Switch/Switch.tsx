import React, { HTMLAttributes, ReactNode } from 'react';
import { Text } from '../Text/Text'
import './Switch.css';

export interface Props extends HTMLAttributes<HTMLInputElement> {
    /** Can assign text or element to switch */
    children?: ReactNode;
    /** Determines whether the switch is disabled */
    disabled?: boolean;
    /** Value that the switch represents */
    value?: string;
    /** Variant of switch */
    variant?: "default" | "secondary";
}

/**
 * UI element that slides a button from on to off.
 */
export const Switch = ({children, variant="default", ...props}: Props) => {
    return (
        <label className="apollo-component-library-switch-component-label">
            <input 
                {...props} 
                type="checkbox" 
                role="switch"
                className="apollo-component-library-switch-component-input"
            />
            <span className={`apollo-component-library-switch-component ${variant}`}/>
            <Text inline>{children}</Text>
        </label>
    )
}