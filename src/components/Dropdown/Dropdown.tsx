import React, { HTMLAttributes } from 'react';
import FormattedChildren from '../../util/FormattedChildren';
import { detectOutsideClick } from '../../util/detectOutsideClick';
import './Dropdown.css';

import { Button } from '../Button/Button';
import { Option } from '../Option/Option';

export interface Props extends HTMLAttributes<HTMLDivElement> {
    /** Determines where the menu will appear from */
    orientation?: 'top' | 'bottom' | 'left' | 'right';
    /** Determines menu alignment, when orientation is left or right */
    alignment?: 'left' | 'center' | 'right';
    /** Determines the max height of the menu */
    menuHeight?: string;
    /** Determines the max width of the menu */
    menuWidth?: string;
}

/**
 * The Dropdown component enables any element to have its own menu on click
 *
 * @return Dropdown component
 */
export const Dropdown: React.FC<Props> = ({
    children,
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
     * This method will only get the first button and consider it the main
     * point of entry for dropdown purposes
     *
     * @param buttons all button components found in the dropdown
     * @return button component
     */
    const formatButton = (button: JSX.Element): JSX.Element => {
        // get props from first component
        const { props } = button;
        const { onClick, children: buttonChildren, ...buttonProps } = props;

        /**
         * Modifies the original button onClick so that it can also open and
         * close the menu
         */
        const buttonOnClick = (): void => {
            toggleOpen(!open);
            onClick && onClick();
        };

        return (
            <div
                {...buttonProps}
                className="apollo-component-library-dropdown-button-component"
                onClick={buttonOnClick}
                ref={dropdown}
            >
                {buttonChildren}
            </div>
        );
    };

    /**
     * Finds all option components and renders them in a menu
     *
     * @param options Option components
     * @return menu of options
     */
    const getOptionMenu = (options: JSX.Element[]): JSX.Element | null => {
        // define styling options
        const style: { [key: string]: string | number } = {};

        if (menuHeight) style['height'] = menuHeight;
        if (menuWidth) style['minWidth'] = menuWidth;

        return open ? (
            <span className={`apollo-component-library-dropdown-portal ${orientation}`}>
                <div
                    className={`apollo-component-library-dropdown-menu-component 
                        o-${orientation} 
                        a-${alignment}`}
                    style={style}
                >
                    {options}
                </div>
            </span>
        ) : null;
    };

    /**
     * Returns render-ready dropdown component
     *
     * @return dropdown component
     */
    const renderDropdown = (): JSX.Element => {
        // find all targeted components
        const formatted = new FormattedChildren(children, [Button, Option]);

        // format button
        formatted.format(Button, formatButton);

        // get buttons
        const buttons: JSX.Element[] = formatted.get(Button);
        if (!buttons.length) throw new Error('Dropdown component needs button');

        // get button
        const [button] = buttons;

        // get the option menu
        const menu: JSX.Element | null = getOptionMenu(formatted.get(Option));

        return (
            <span className="apollo-component-library-dropdown">
                {orientation === 'top' || orientation === 'left' ? menu : null}
                {button}
                {orientation === 'bottom' || orientation === 'right' ? menu : null}
            </span>
        );
    };

    return renderDropdown();
};
