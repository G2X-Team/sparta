import type { HTMLAttributes, ReactNode, FC } from 'react';
import React from 'react';
import './Footer.css';

import type { Apollo } from '../../interfaces/Apollo';
import type { Interface } from '../../interfaces/Overload';
import { gaurdApolloName } from '../../util/ErrorHandling';

export interface IFooter extends Interface<HTMLAttributes<HTMLDivElement>>, Apollo<'Footer'> {
    /** Can have children of any kind */
    children?: ReactNode;
}

/**
 * Interface component that anchors to the bottom of another element
 *
 * @return Footer component
 */
export const Footer: FC<IFooter> = ({ children, className = '', parentProps, ...props }) => {
    gaurdApolloName(props, 'Footer');

    return (
        <footer {...props} className={`apollo-component-library-footer-component ${className}`}>
            {parentProps?.renderAll ? parentProps?.renderAll(children) : children}
        </footer>
    );
};

Footer.defaultProps = { 'data-apollo': 'Footer' };
