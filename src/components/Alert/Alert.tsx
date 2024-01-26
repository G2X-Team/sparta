import type { HTMLAttributes, ReactNode, FC } from 'react';
import React from 'react';
import './Alert.css';

import type { Sparta } from '../../interfaces/Sparta';
import { guardSpartaName } from '../../util/ErrorHandling';

export interface IAlert extends HTMLAttributes<HTMLParagraphElement>, Sparta<'Alert'> {
    /** Alert needs to exist between tags */
    children: ReactNode;
    /**
     * Determines type, number directly relates to the kind of type
     * tag i.e. type=warning => warning
     */
    type?: 'danger' | 'warning' | 'info' | 'success';
}

/**
 * Basic Alert component that allows for extensive customization via prop changes
 *
 * @return Alert component
 */
export const Alert: FC<IAlert> = ({ children, type = 'danger', ...props }) => {
    guardSpartaName(props, 'Alert');

    /**
     * Gets all the special conditions and translates it to a special className combination
     * granting all conditions
     *
     * @return the full variant title
     */
    const getVariant = (): string => {
        // determine custom variant
        let customVariant = 'sparta-component-library-alert-component ';

        // check if its a type or not
        if (type == 'danger') customVariant += 'danger';
        if (type == 'warning') customVariant += 'warning';
        if (type == 'info') customVariant += 'info';
        if (type == 'success') customVariant += 'success';

        return customVariant;
    };

    return (
        <div {...props} className={getVariant()}>
            {children}
        </div>
    );
};

Alert.defaultProps = { 'data-sparta': 'Alert' };
