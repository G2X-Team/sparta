import type { HTMLAttributes, FC, RefObject, Dispatch, SetStateAction } from 'react';
import React, { useEffect } from 'react';
import { Props as DropdownProps } from '../Dropdown';

interface Props extends HTMLAttributes<HTMLDivElement>, DropdownProps {
    /** All options belonging to the menu */
    options: JSX.Element[];
    /** Reference of first child */
    firstChild: RefObject<HTMLLIElement>;
    /** Reference of last child */
    lastChild: RefObject<HTMLLIElement>;
    /** Toggles the dropdown from open to close */
    toggleOpen: Dispatch<SetStateAction<boolean>>;
}

/**
 * Menu containing all the options
 *
 * @return Menu with all options
 */
const Menu: FC<Props> = ({
    orientation,
    alignment,
    firstChild,
    lastChild,
    menuHeight,
    menuWidth,
    options,
    toggleOpen,
    name,
}) => {
    useEffect(() => {
        /**
         * Navigates to first or last child depending on key press
         *
         * @param event event that occurs on keypress
         */
        const handleKeypresses = (event: KeyboardEvent): void => {
            if (event.key === 'Home') firstChild.current?.focus();
            if (event.key === 'End') lastChild.current?.focus();
            if (event.key === 'Escape') toggleOpen(false);
        };

        window.addEventListener('keydown', handleKeypresses);
        return () => window.removeEventListener('keydown', handleKeypresses);
    }, []);

    // define styling options
    const style: { [key: string]: string | number } = {};

    if (menuHeight) style['height'] = menuHeight;
    if (menuWidth) style['minWidth'] = menuWidth;

    return (
        <span className={`apollo-component-library-dropdown-portal ${orientation}`}>
            <ul
                role="listbox"
                aria-labelledby={`__${name}`}
                tabIndex={-1}
                className={`apollo-component-library-dropdown-menu-component 
                    o-${orientation} 
                    a-${alignment}`}
                style={style}
            >
                {options}
            </ul>
        </span>
    );
};

export default Menu;
