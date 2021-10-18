import React, { HTMLAttributes, ReactNode } from 'react';
import './Button.css';

export interface Props extends HTMLAttributes<HTMLButtonElement> {
    /** Required ReactNode that needs to exist between component tags */
    children: ReactNode;
    /** defines the type of button to be rendered */
    variant?: 'default' | 'secondary';
    /** callback function to be called when there is a method click */
    onClick?: () => void;
}

/**
 * Button component for the Apollo Component Library
 */
export const Button = ({children, variant = "default", ...props}: Props) => {
    return (
        <button {...props} className={`button ${variant}`}>
            {children}
        </button>
    )
}