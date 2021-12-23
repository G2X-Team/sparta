import React, { HTMLAttributes, ReactNode } from 'react';
import { StyleVariant } from '../../interfaces/Properties';
import { Text } from '../Text/Text';
import './Switch.css';

export interface Props extends HTMLAttributes<HTMLInputElement> {
    /** Can assign text or element to switch */
    children?: ReactNode;
    /** Determines whether the switch is disabled */
    disabled?: boolean;
    /** Value that the switch represents */
    value?: string;
    /** Variant of switch */
    variant?: StyleVariant;
    /** Form name */
    name: string;
    /** Determines whether input is required or not */
    required?: boolean;
    /** Determines whether input is checked or not */
    checked?: boolean;
}

/**
 * UI element that slides a button from on to off.
 *
 * @return Switch component
 */
export const Switch: React.FC<Props> = ({
    children,
    variant = 'default',
    ...props
}: Props): JSX.Element => {
    return (
        <label className="apollo-component-library-switch-component-label">
            <input
                {...props}
                type="checkbox"
                role="switch"
                className="apollo-component-library-switch-component-input"
            />
            <span className={`apollo-component-library-switch-component ${variant}`} />
            <Text inline margins>
                {children}
            </Text>
        </label>
    );
};
