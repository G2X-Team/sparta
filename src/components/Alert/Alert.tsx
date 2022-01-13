import React, { HTMLAttributes, ReactNode } from 'react';
import './Alert.css';

export interface Props extends HTMLAttributes<HTMLParagraphElement> {
    /** Alert needs to exist between tags */
    children: ReactNode;
    /**
     * Determines type, number directly relates to the kind of type
     * tag i.e. type=warning => warning
     */
    type?: 'danger' | 'warning' | 'info' | 'success';
    /** Determines whether the element has margins or not */
}

/**
 * Basic Alert component that allows for extensive customization via prop changes
 *
 * @return Alert component
 */
export const Alert = ({
    children,
    type = 'danger',

    ...props
}: Props): JSX.Element => {
    /**
     * Gets all the special conditions and translates it to a special className combination
     * granting all conditions
     *
     * @return the full variant title
     */
    const getVariant = (): string => {
        // determine custom variant
        let customVariant = 'apollo-component-library-alert-component ';

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
