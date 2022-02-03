import React from 'react';
import type { HTMLAttributes } from 'react';
import type { FC } from 'react';
import FormatChildren from '../../util/FormatChildren';
import { detectOutsideClick } from '../../util/detectOutsideClick';
import './Dropdown.css';

import Button from './overload/Button';
import Menu from './components/Menu';
import * as CSS from 'csstype';
import { Option } from '../Option/Option';
import type { ComponentAlignment } from '../../interfaces/Properties';
import type { ComponentOrientation } from '../../interfaces/Properties';

export interface Props extends HTMLAttributes<HTMLDivElement> {
    /** Determines where the menu will appear from */
    orientation?: ComponentOrientation;
    /** Determines menu alignment, when orientation is left or right */
    alignment?: ComponentAlignment;
    /** Determines the max height of the menu */
    menuHeight?: CSS.Property.MaxHeight;
    /** Determines the max width of the menu */
    menuWidth?: CSS.Property.MaxWidth;
}

/**
 * The Dropdown component enables any element to have its own menu on click
 *
 * @return Dropdown component
 */
export const Dropdown: FC<Props> = ({
    children,
    className = '',
    orientation = 'bottom',
    alignment = 'left',
    menuHeight,
    menuWidth,
}: Props): JSX.Element => {
    // ref containing dropdown button
    const dropdown = React.useRef<HTMLDivElement>(null);

    // state
    const [open, toggleOpen] = detectOutsideClick(dropdown, false);

    /**
     * Returns render-ready dropdown component
     *
     * @return dropdown component
     */
    const renderDropdown = (): JSX.Element => {
        // define structured props
        const structured = {
            dropdownRef: dropdown,
            children,
            toggleOpen,
            open,
        };

        // find all targeted components
        const formatted = new FormatChildren(structured, { Button, Option });

        // get buttons
        const buttons: JSX.Element[] = formatted.get(Button);
        if (!buttons.length) throw new Error('Dropdown component needs button');

        // get button
        const [button] = buttons;

        // get the option menu
        const menu = open ? (
            <Menu
                options={formatted.get(Option)}
                orientation={orientation}
                alignment={alignment}
                menuHeight={menuHeight}
                menuWidth={menuWidth}
            />
        ) : null;

        return (
            <>
                {orientation === 'top' || orientation === 'left' ? menu : null}
                {button}
                {orientation === 'bottom' || orientation === 'right' ? menu : null}
            </>
        );
    };

    return (
        <span className={`apollo-component-library-dropdown ${className}`}>{renderDropdown()}</span>
    );
};
