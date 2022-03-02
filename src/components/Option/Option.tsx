import type { HTMLAttributes, FC } from 'react';
import React from 'react';
import './Option.css';

import Overload from '../../interfaces/Overload';

import { Text } from '../Text/Text';

export interface IOption extends Overload<HTMLAttributes<HTMLElement>> {
    /** Needs to have a string value in between tags */
    children: string;
    /** Can have onClick callback method */
    onClick?: () => void;
}

/**
 * Interfacing component used to describe an object pertaining to a menu.
 *
 * @return Option component
 */
export const Option: FC<IOption> = ({ children, parentProps, className = '', ...iOption }) => {
    return (
        <div {...iOption} className={`apollo-component-library-option-component ${className}`}>
            <Text margins={false}>{children}</Text>
        </div>
    );
};
