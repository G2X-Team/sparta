import type { HTMLAttributes, ReactNode, FC } from 'react';
import React from 'react';
import Overload from '../../interfaces/Overload';
import './Header.css';

export interface Props extends Overload<HTMLAttributes<HTMLDivElement>> {
    /** Can have children of any kind */
    children?: ReactNode;
}

/**
 * Interface component that's intended purpose is to anchor to the top of another element
 *
 * @return Header component
 */
export const Header: FC<Props> = ({ children, className = '', parentProps, ...props }) => {
    return (
        <div {...props} className={`apollo-component-library-header-component ${className}`}>
            {children}
        </div>
    );
};
