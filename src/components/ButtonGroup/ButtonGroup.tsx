import type { HTMLAttributes, ReactNode, FC } from 'react';
import React from 'react';
import './ButtonGroup.css';

import FormatChildren from '../../util/FormatChildren';
import type { Apollo } from '../../interfaces/Apollo';
import type { StyleVariant, ComponentSize } from '../../interfaces/Properties';
import type { RenderAll } from '../../interfaces/Overload';
import { gaurdApolloName } from '../../util/ErrorHandling';

import Button from './overload/Button';

export interface IButtonGroup extends HTMLAttributes<HTMLDivElement>, Apollo<'ButtonGroup'> {
    /** Disables all buttons within button group */
    disabled?: boolean;
    /** toggle between different button group sizes */
    size?: ComponentSize;
    /** requires children */
    children: ReactNode;
    /** select from preset style */
    variant?: StyleVariant;
}

/**
 * Component that formats buttons in a way that groups them together
 *
 * @return ButtonGroup component
 */
export const ButtonGroup: FC<IButtonGroup> = ({
    children = '',
    variant = 'default',
    disabled = false,
    size = 'medium',
    className,
    ...props
}) => {
    gaurdApolloName(props, 'ButtonGroup');
    /**
     * Renders all button group buttons and caches chlidren
     *
     * @return formatted buttons
     */
    const renderAll: RenderAll = () => {
        // get new formatted children
        const formatted = new FormatChildren(children, { Button }, { disabled, size, variant });
        if (formatted.getOther().length)
            throw new Error('ButtonGroup can only accept Buttons as children');

        return formatted.getAll();
    };

    return (
        <div {...props} className={`apollo-component-library-button-group-component ${className}`}>
            {renderAll()}
        </div>
    );
};

ButtonGroup.defaultProps = { 'data-apollo': 'ButtonGroup' };
