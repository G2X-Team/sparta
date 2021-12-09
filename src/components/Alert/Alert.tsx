import React, { HTMLAttributes, ReactNode } from 'react';
import './Alert.css';

export interface Props extends HTMLAttributes<HTMLParagraphElement> {
    /** Alert needs to exist between tags */
    children: ReactNode;
    /**
     * Determines AlertType, number directly relates to the kind of AlertType
     * tag i.e. AlertType={1} => warning-AlertType
     */
    AlertType?: 0 | 1 | 2 | 3;
    /** Determines whether the element has margins or not */
}

/**
 * Basic Alert component that allows for extensive customization via prop changes
 *
 * @return Alert component
 */
export const Alert = ({
    children,
    AlertType = 0,

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

        // check if its a AlertType or not
        if (AlertType == 0) customVariant += 'danger-AlertType';
        if (AlertType == 1) customVariant += 'warning-AlertType';
        if (AlertType == 2) customVariant += 'info-AlertType';
        if (AlertType == 3) customVariant += 'success-AlertType';

        return customVariant;
    };

    return (
        <p {...props} className={getVariant()}>
            {children}
        </p>
    );
};
