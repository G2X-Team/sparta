import React, { HTMLAttributes, ReactNode } from 'react';
import './Footer.css';

export interface Props extends HTMLAttributes<HTMLDivElement> {
    /** Can have children of any kind */
    children?: ReactNode;
}

/** 
 * Interface component that anchors to the bottom of another element
 */
export const Footer = ({children, className, ...props}: Props) => {
    return (
        <div 
            {...props}
            className={`apollo-component-library-footer-component ${className}`}
        >
            {children}
        </div>
    )
}