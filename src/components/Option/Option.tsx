import React, { HTMLAttributes } from 'react';
import './Option.css';

import { Text } from '../Text/Text';

export interface Props extends HTMLAttributes<HTMLElement> {
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
export const Option: React.FC<Props> = ({ children, ...props }: Props): JSX.Element => {
    return (
        <div {...props} className="apollo-component-library-option-component">
            <Text margins={false}>{children}</Text>
        </div>
    );
};
