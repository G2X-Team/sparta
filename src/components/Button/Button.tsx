import type { HTMLAttributes, ReactNode, FC } from 'react';
import React from 'react';
import type { StyleVariant } from '../../interfaces/Properties';
import './Button.css';

export interface IButton extends HTMLAttributes<HTMLButtonElement> {
    /** Required ReactNode that needs to exist between component tags */
    children: ReactNode;
    /** defines the type of button to be rendered */
    variant?: StyleVariant;
    /** callback function to be called when there is a method click */
    onClick?: () => void;
    /** will allow for http redirect */
    href?: string;
}

/**
 * Button component for the Apollo Component Library
 *
 * @return Button component
 */
export const Button: FC<IButton> = ({
    children,
    href,
    className = '',
    variant = 'default',
    ...props
}) => {
    const button: JSX.Element = (
        <button {...props} className={`apollo-component-library-button ${variant} ${className}`}>
            {children}
        </button>
    );

    // if the href element exists, render it with link capabilities, else just render button
    return href ? (
        <a href={href} target="_blank" rel="noreferrer">
            {button}
        </a>
    ) : (
        button
    );
};
