import React, { HTMLAttributes, ReactNode } from 'react';
import './ButtonGroup.css';

import { findAll, FoundChildren, FoundChild } from '../../util/findAll';

import { Button } from '../Button/Button';

export interface Props extends HTMLAttributes<HTMLDivElement> {
    /** Disables all buttons within button group */
    disabled?: boolean;
    /** toggle between different button group sizes */
    size?: 'small' | 'medium' | 'large';
    /** requires children */
    children: ReactNode;
    /** select from preset style */
    variant?: 'default' | 'secondary';
}

/**
 * Component that formats buttons in a way that groups them together
 *
 * @return ButtonGroup component
 */
export const ButtonGroup = ({
    children,
    variant = 'default',
    disabled = false,
    size = 'medium',
    className,
    ...props
}: Props): JSX.Element => {
    /**
     * Will look for any button components and render them appropriately
     *
     * @return array of button elements
     */
    const renderButtons = (): ReactNode[] => {
        // find all buttons
        const components: FoundChildren = findAll(children, [Button]);
        if (components.other.length > 0)
            throw new Error('ButtonGroup can only have Button elements as children');

        const buttons: JSX.Element[] = components.Button.map((button: FoundChild) => {
            // destruct props from button
            const {
                component: { props },
            } = button;

            const {
                children: buttonChildren,
                disabled: buttonDisabled,
                className: buttonClassName,
                href,
                ...buttonProps
            } = props;

            return (
                <button
                    {...buttonProps}
                    disabled={disabled}
                    key={Math.random()}
                    className={`apollo-component-library-button-group-button-component 
                            ${buttonClassName} 
                            ${variant} 
                            ${size}`}
                >
                    {href ? <a href={href}>{buttonChildren}</a> : buttonChildren}
                </button>
            );
        });

        return buttons;
    };

    return (
        <div {...props} className={`apollo-component-library-button-group-component ${className}`}>
            {renderButtons()}
        </div>
    );
};
