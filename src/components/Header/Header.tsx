import React, { HTMLAttributes, ReactNode } from 'react';
import './Header.css';

export interface Props extends HTMLAttributes<HTMLDivElement> {
    /** Can have children of any kind */
    children?: ReactNode;
}

/** 
 * Interface component that anchors to the top of another element
 */
export const Header = ({children, className, ...props}: Props) => {
    return (
        <div 
            {...props}
            className={`apollo-component-library-header-component ${className}`}
        >
            {children}
        </div>
    )
}