import type { HTMLAttributes, FC } from 'react';
import React from 'react';
import './DatePicker.css';

export interface Props extends HTMLAttributes<HTMLHRElement> {
    /** Name given to the datepicker */
    name?: string;
    /** Text placeholder that will apear on an empty datepicker */
    placeholder?: string;
}

/**
 * Component that serves as an datepicker for ease of implamenting date timestamp
 *
 * @return DatePicker component
 */
export const DatePicker: FC<Props> = ({ name, className = '', placeholder, style, ...props }) => {
    return (
        <hr
            role="separator"
            {...props}
            className={`apollo-component-library-datepicker-component ${className}`}
        />
    );
};
