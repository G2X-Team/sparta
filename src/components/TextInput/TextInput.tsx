import React, { HTMLAttributes } from 'react';
import './TextInput.css'

export interface Props extends HTMLAttributes<HTMLInputElement> {
    /** Placeholder text for input */
    placeholder?: string;
    /** Determines whether user can type in the text input */
    disabled?: boolean;
    /** Determines whether the text input is a password */
    password?: boolean;
    /** Determines what type of text input will be shown */
    variant?: "default" | "secondary";
    /** Determines whether the input is required for form submission */
    required?: boolean;
    /** Function that will determine whether input is valid for form submission */
    validator?: () => { valid: boolean; message: string }
}

/** 
 * Input that allows for user input via keyboard
 */
export const TextInput = ({variant = 'default', password = false, ...props}: Props) => {
    return (
        <input 
            {...props } 
            className={`apollo-component-library-text-input ${variant}`} 
            type={password ? "password" : "text"} 
        />
    )
}