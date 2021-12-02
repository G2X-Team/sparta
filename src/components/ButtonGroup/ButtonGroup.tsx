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

export const ButtonGroup = ({
    children,
    variant = 'default',
    disabled = false,
    size = 'medium',
    ...props
}: Props) => {
    /**
     * Will look for any button components and render them appropriately
     *
     * @return array of button elements
     */
    const renderButtons = (): ReactNode[] => {
        // find all buttons
        const components: FoundChildren = findAll(children, [Button]);
        if (components.other.length > 0)
            throw new Error(
                'ButtonGroup can only have Button elements as children'
            );

        const groupDisabled: boolean = disabled;
        const buttons: JSX.Element[] = components.Button.map(
            (button: FoundChild) => {
                // abstract component from button
                const component: JSX.Element = button.component;
                const { disabled, className, href, ...buttonProps } =
                    component.props;

                return (
                    <button
                        {...buttonProps}
                        disabled={groupDisabled}
                        key={Math.random()}
                        className={`apollo-component-library-button-group-button-component ${className} ${variant} ${size}`}
                    >
                        {href ? (
                            <a href={href}>{component.props.children}</a>
                        ) : (
                            component.props.children
                        )}
                    </button>
                );
            }
        );

        return buttons;
    };

    return (
        <div {...props} className="apollo-component-library-button-group">
            {renderButtons()}
        </div>
    );
};
