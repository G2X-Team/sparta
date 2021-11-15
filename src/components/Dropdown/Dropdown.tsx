import React, { HTMLAttributes, ReactNode } from 'react';
import { findAll, FoundChild, FoundChildren } from '../../util/findAll';
import { detectOutsideClick } from '../../util/detectOutsideClick';
import './Dropdown.css';

import { Button } from '../Button/Button'
import { Option } from '../Option/Option'

export interface Props extends HTMLAttributes<HTMLDivElement> {
    /** Determines where the menu will appear from */
    orientation?: "top" | "bottom" | "left" | "right"; 
    /** Determines menu alignment, when orientation is left or right, alignment doesn't do anything */
    alignment?: "left" | "center" | "right";
    /** Determines the max height of the menu */
    menuHeight?: string;
    /** Determines the max width of the menu */
    menuWidth?: string;
}

/**
 * The Dropdown component enables any element to have its own menu on click
 */
export const Dropdown = ({
        children, 
        orientation = "bottom", 
        alignment = "left", 
        menuHeight,
        menuWidth
    }: Props) => {
    // ref containing dropdown button
    const dropdown = React.useRef<HTMLDivElement>(null);

    // state
    const [open, toggleOpen] = detectOutsideClick(dropdown, false);

    /** Returns render-ready dropdown component */
    const renderDropdown = (): ReactNode => {
        // find all targeted components
        const components: FoundChildren = findAll(children, [Button, Option]);

        // separate comopnents
        const DropdownButton: ReactNode = getButton(components.Button);
        if (!DropdownButton) {
            console.error("Dropdown component needs button");
            return;
        }

        // get the option menu
        const Menu: ReactNode = getOptionMenu(components.Option);
        const Portal: JSX.Element = (
            <span className={`apollo-component-library-dropdown-portal ${orientation}`}>
                { Menu }
            </span>
        )
        return (
            <span className="apollo-component-library-dropdown">
                { orientation === "top" || orientation === "left" ? Portal : null }
                { DropdownButton }
                { orientation === "bottom" || orientation === "right" ? Portal : null }
            </span>
        )
    }

    /**
     * This method will only get the first button and consider it the main
     * point of entry for dropdown purposes
     * 
     * @param buttons all button components found in the dropdown
     */
    const getButton = (buttons: FoundChild[]): ReactNode => {
        // checks if there are any buttons to select from
        if (!buttons.length) return null;
        const button: JSX.Element = buttons[0].component;
        const {onClick, ...buttonProps} = button.props;

        /**
         * Modifies the original button onClick so that it can also open and 
         * close the menu
         */
        const buttonOnClick = (): void => {
            toggleOpen(!open);
            onClick && onClick();
        }

        return (
            <div 
                {...buttonProps}
                className="apollo-component-library-dropdown-button-component"
                onClick={buttonOnClick}
                ref={dropdown}
            >
                { button.props.children }
            </div>
        );
    }

    /**
     * Finds all option components and renders them in a menu
     * 
     * @param options Option components
     */
    const getOptionMenu = (options: FoundChild[]): ReactNode => {
        // get all option components and condense them in an array
        const optionComponents: JSX.Element[] = 
            options.map((option: FoundChild) => option.component);

        // define styling options
        let style: { [key: string]: string | number } = {
            display: open ? "inline-block" : "none",
        }

        if (menuHeight) style["height"] = menuHeight;
        if (menuWidth) style["minWidth"] = menuWidth;

        // return all of the options in a menu
        return (
            <div 
                className={`apollo-component-library-dropdown-menu-component o-${orientation} a-${alignment}`}
                style={style}
            >
                {optionComponents}
            </div>
        )
    }

    return (
        <div>
            {renderDropdown()}
        </div>
    )
}