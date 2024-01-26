import type { HTMLAttributes, ReactNode, FC } from 'react';
import React from 'react';
import './Header.css';

import type { Sparta } from '../../interfaces/Sparta';
import type { Interface } from '../../interfaces/Overload';
import { guardSpartaName } from '../../util/ErrorHandling';

export interface IHeader extends Interface<HTMLAttributes<HTMLDivElement>>, Sparta<'Header'> {
    /** Can have children of any kind */
    children?: ReactNode;
}

/**
 * Interface component that's intended purpose is to anchor to the top of another element
 *
 * @return Header component
 */
export const Header: FC<IHeader> = ({ parentProps, children, className = '', ...props }) => {
    guardSpartaName(props, 'Header');

    return (
        <header {...props} className={`sparta-component-library-header-component ${className}`}>
            {parentProps?.renderAll ? parentProps?.renderAll(children) : children}
        </header>
    );
};

Header.defaultProps = { 'data-sparta': 'Header' };
