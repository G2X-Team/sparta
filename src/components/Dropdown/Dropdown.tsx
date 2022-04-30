import type { HTMLAttributes, FC } from 'react';
import React, { useState, useRef, useEffect } from 'react';
import './Dropdown.css';

import type { Apollo } from '../../interfaces/Apollo';
import type { ComponentAlignment, ComponentOrientation } from '../../interfaces/Properties';
import type { RenderAll } from '../../interfaces/Overload';
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
    const [display, toggleDisplay] = useState(false);
    const [effect, toggleEffect] = useState(false);

    // effect hook that keeps track of open
    useEffect(() => {
        if (open !== display) {
            if (display) {
                toggleEffect(false);
                setTimeout(() => toggleDisplay(false), 300);
            } else {
                toggleDisplay(true);
                setTimeout(() => toggleEffect(true), 100);
            }
        }
    }, [open]);

    /**
     * Returns render-ready dropdown component
     *
     * @return dropdown component
     */
    const renderDropdown: RenderAll = () => {
        // define parentProps props
        const parentProps = {
            button: buttonRef || iconRef,
            open,
            display,
            effect,
            anchor,
            alignment,
            toggleOpen,
        };

        // find all targeted components
        const formatted = new FormatChildren(children, { Button, Menu, Icon }, parentProps);

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
            <>
                {(anchor === 'top' || anchor === 'left') && display ? menu : null}
                {button || icon}
                {(anchor === 'bottom' || anchor === 'right') && display ? menu : null}
            </>
        );
    };

    return (
        <div {...props} className={`apollo ${className}`}>
            {renderDropdown()}
        </div>
    );
};

Dropdown.defaultProps = { 'data-apollo': 'Dropdown' };
