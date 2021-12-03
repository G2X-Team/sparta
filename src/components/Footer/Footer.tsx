import React, { HTMLAttributes, ReactNode } from 'react';
import './Footer.css';

export interface Props extends HTMLAttributes<HTMLDivElement> {
    /** Can have children of any kind */
    children?: ReactNode;
}

/**
 * Interface component that anchors to the bottom of another element
 *
 * @return Footer component
 */
export const Footer: React.FC<Props> = ({ children, className, ...props }: Props): JSX.Element => {
    return (
        <div {...props} className={`apollo-component-library-footer-component ${className}`}>
            {children}
        </div>
    );
};
