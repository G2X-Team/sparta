import type { HTMLAttributes, FC } from 'react';
import React, { useState, useRef } from 'react';
import './Dropdown.css';

import type { Apollo } from '../../interfaces/Apollo';
import type { ComponentAlignment, ComponentOrientation } from '../../interfaces/Properties';
import { gaurdApolloName } from '../../util/ErrorHandling';
import FormatChildren from '../../util/FormatChildren';

import Button from './overload/Button';
import Icon from './overload/Icon';
import Menu from './overload/Menu';

export interface IDropdown extends HTMLAttributes<HTMLDivElement>, Apollo<'Dropdown'> {
    /** Determines where the menu will appear from */
    anchor?: ComponentOrientation;
    /** Determines menu alignment, when orientation is left or right */
    alignment?: ComponentAlignment;
}

/**
 * The Dropdown component enables any element to have its own menu on click
 *
 * @return Dropdown component
 */
export const Dropdown: FC<IDropdown> = ({
    children,
    className = '',
    anchor = 'bottom',
    alignment = 'start',
    ...props
}) => {
    gaurdApolloName(props, 'Dropdown');

    // reference to buttons
    const buttonRef = useRef<HTMLButtonElement>(null);
    const iconRef = useRef<HTMLSpanElement>(null);

    // state
    const [open, toggleOpen] = useState(false);

    /**
     * Returns render-ready dropdown component
     *
     * @return dropdown component
     */
    const renderDropdown = (): JSX.Element => {
        // define parentProps props
        const parentProps = {
            button: buttonRef || iconRef,
            children,
            open,
            anchor,
            alignment,
            toggleOpen,
        };

        // find all targeted components
        const formatted = new FormatChildren(parentProps, { Button, Menu, Icon });

        // get button
        const [icon, ...otherIcons]: JSX.Element[] = formatted.get('Icon');
        const [button, ...otherButtons]: JSX.Element[] = formatted.get('Button');

        // handles multiple button and icon components cases
        if (icon) {
            if (button) throw new Error('Dropdown cannot have both an icon and a button');
            if (otherIcons.length > 0) throw new Error('Dropdown cannot have more than one icon');
        } else if (button) {
            if (icon) throw new Error('Dropdown cannot have both an icon and a button');
            if (otherButtons.length > 0)
                throw new Error('Dropdown cannot have more than one button');
        } else {
            throw new Error('Dropdown must have either an icon or a button');
        }

        // get menu
        const [menu, ...otherMenus]: JSX.Element[] = formatted.get('Menu');
        if (!menu) throw new Error('Dropdown component needs menu');
        if (otherMenus.length) throw new Error('Dropdown component can only have one menu');

        return (
            <div className={`apollo-component-library-dropdown ${className}`}>
                {(anchor === 'top' || anchor === 'left') && open ? menu : null}
                {button || icon}
                {(anchor === 'bottom' || anchor === 'right') && open ? menu : null}
            </div>
        );
    };

    return renderDropdown();
};

Dropdown.defaultProps = { 'data-apollo': 'Dropdown' };
