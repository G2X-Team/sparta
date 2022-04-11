import type { HTMLAttributes, ReactNode, FC } from 'react';
import React from 'react';
import './Header.css';

import type { Apollo } from '../../interfaces/Apollo';
import type Overload from '../../interfaces/Overload';
import { gaurdApolloName } from '../../util/ErrorHandling';

export interface IHeader extends Overload<HTMLAttributes<HTMLDivElement>>, Apollo<'Header'> {
    /** Can have children of any kind */
    children?: ReactNode;
}

/**
 * Interface component that's intended purpose is to anchor to the top of another element
 *
 * @return Header component
 */
export const Header: FC<IHeader> = ({ parentProps, children, className = '', ...props }) => {
    gaurdApolloName(props, 'Header');

    return (
        <header {...props} className={`apollo-component-library-header-component ${className}`}>
            {parentProps?.renderAll ? parentProps?.renderAll(children) : children}
        </header>
    );
};

Header.defaultProps = { 'data-apollo': 'Header' };
