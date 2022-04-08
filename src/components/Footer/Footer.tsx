import type { HTMLAttributes, ReactNode, FC } from 'react';
import React from 'react';
import Overload from '../../interfaces/Overload';
import './Footer.css';

export interface IFooter extends Overload<HTMLAttributes<HTMLDivElement>> {
    /** Can have children of any kind */
    children?: ReactNode;
}

/**
 * Interface component that anchors to the bottom of another element
 *
 * @return Footer component
 */
export const Footer: FC<IFooter> = ({ children, className = '', parentProps, ...props }) => {
    return (
        <footer {...props} className={`apollo-component-library-footer-component ${className}`}>
            {parentProps?.renderAll ? parentProps?.renderAll(children) : children}
        </footer>
    );
};
