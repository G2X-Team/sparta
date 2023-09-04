import type { HTMLAttributes, FC } from 'react';
import React, { useEffect, useState, useRef } from 'react';
import FormatChildren from '../../util/formatting/FormatChildren';
import './Drawer.css';

import type { Sparta } from '../../interfaces/Sparta';
import type { ComponentOrientation } from '../../interfaces/Properties';
import type { RenderAll } from '../../interfaces/Overload';
import { gaurdApolloName } from '../../util/ErrorHandling';

import { View } from '../View/View';
import Menu from './overload/Menu';
import type { IDrawerButton } from './overload/Button';
import Button from './overload/Button';

export interface IDrawer extends HTMLAttributes<HTMLDivElement>, Sparta<'Drawer'> {
    /**
     * Type of drawer that will be used. `absolute` assumes the drawer is in front of everything
     * and will use a backdrop. `persistent` will have a relative width and can push other
     * elements to the side on expansion.`permanent` Just an element with its own overflow.
     */
    type?: 'absolute' | 'persistent' | 'permanent';
    /**
     * When `type="absolute"`, the values `"left"`, `"right"`, `"bottom"`, and `"top"` determine
     * the anchoring point for the drawer. When `type="persistent"` OR `type="permanent"`, the
     * values will determine where the border separating the content will appear
     */
    orientation?: ComponentOrientation;
    /** Executes a method when the **open** prop is going from `true` to `false` */
    onClose?: () => void;
    /** Determines the time in milliseconds it will take to open/close, won't do anything when
     * `permanent`
     */
    transition?: number;
    /** Method that changes **open** variable */
    toggleOpen?: () => void;
    /** Determines whether the drawer is visible or not, won't do anything when `permanent` */
    open?: boolean;
    /** Determines to what height or width the drawer will extend to */
    dimension?: string | number;
}

/**
 * A drawer represents a container that slides out or stationary to an anchored area of a
 * page. An anchor can be left, right, top, or bottom.
 *
 * @return Drawer Component
 */
export const Drawer: FC<IDrawer> & { Button: FC<IDrawerButton> } = ({
    children,
    className = '',
    type = 'absolute',
    orientation = 'left',
    open = false,
    transition = 300,
    dimension = 300,
    onClose,
    toggleOpen,
    style,
    ...props
}: IDrawer) => {
    gaurdApolloName(props, 'Drawer');

    const button = useRef<HTMLButtonElement | null>(null);

    // state variables
    const [display, toggleDisplay] = useState(type === 'permanent' || open); // shows element in DOM
    const [effect, toggleEffect] = useState(type === 'permanent' || open); // toggles effect
    const [instant, toggleInstant] = useState(type === 'permanent' || open); // is the instant state
    const [modifiedDimension, setModifiedDimension] = useState('width');

    // make a useEffect to determine what transition will be used, acts as on init
    useEffect(() => {
        if (orientation === 'bottom' || orientation === 'top') {
            setModifiedDimension('height');
        } else {
            setModifiedDimension('width');
        }
    }, [orientation]);

    // toggle a useEffect that focses on the display element
    useEffect(() => {
        // check whenever display and open are out of sync
        if (open !== display) {
            if (display) {
                toggleInstant(false);
                toggleEffect(false);
                setTimeout(() => toggleDisplay(false), transition + 100);
                if (button) button.current?.focus();
                if (onClose) {
                    onClose();
                }
            } else {
                toggleInstant(true);
                toggleDisplay(true);
                setTimeout(() => toggleEffect(true), 100);
            }
        }
    }, [open]);

    /**
     * Toggles the drawer open and closed
     */
    const toggleDrawer = (): void => {
        if (toggleOpen) toggleOpen();

        if (display) {
            toggleInstant(false);
            toggleEffect(false);
            setTimeout(() => toggleDisplay(false), transition + 100);
            if (button) button.current?.focus();
            if (onClose) {
                onClose();
            }
        } else {
            toggleInstant(true);
            toggleDisplay(true);
            setTimeout(() => toggleEffect(true), 100);
        }
    };

    /**
     * Finds all target components and renders them in final drawer component
     *
     * @param childrenProp children property of the component needing formatting
     * @return render ready drawer component
     */
    const renderAll: RenderAll = (childrenProp) => {
        // overloaded components
        const overloaded = { ['Drawer.Button']: Button, Menu, View };

        // define parent props
        const parentProps = {
            orientation,
            type,
            modifiedDimension,
            effect,
            dimension,
            transition,
            instant,
            display,
            toggleDrawer,
            toggleOpen,
            renderAll,
            buttonRef: button,
        };

        // gets all found children
        const formatted = new FormatChildren(childrenProp, overloaded, parentProps);

        // format header and footer
        const [, ...otherMenus] = formatted.get('Menu');

        if (otherMenus.length) throw new Error('Dropdown can only have one immediate Menu');

        return formatted.getAll();
    };

    return <div {...props}>{renderAll(children)}</div>;
};

Drawer.defaultProps = { 'data-sparta': 'Drawer' };
Drawer.Button = Button;
