import React from 'react';
import type { HTMLAttributes } from 'react';
import type { ReactNode } from 'react';
import type { FC } from 'react';
import Overload from '../../interfaces/Overload';
import './Footer.css';

export interface Props extends Overload<HTMLAttributes<HTMLDivElement>> {
    /** Can have children of any kind */
    children?: ReactNode;
}

/**
 * Interface component that anchors to the bottom of another element
 *
 * @return Footer component
 */
export const Footer: FC<Props> = ({ children, className = '', parentProps, ...props }) => {
    return (
        <div {...props} className={`apollo-component-library-footer-component ${className}`}>
            {children}
        </div>
    );
};
