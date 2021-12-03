import React, { HTMLAttributes, ReactNode } from 'react';
import './Header.css';

export interface Props extends HTMLAttributes<HTMLDivElement> {
    /** Can have children of any kind */
    children?: ReactNode;
}

/**
 * Interface component that's intended purpose is to anchor to the top of another element
 *
 * @return Header component
 */
export const Header = ({ children, className, ...props }: Props): JSX.Element => {
    return (
        <div {...props} className={`apollo-component-library-header-component ${className}`}>
            {children}
        </div>
    );
};
