import type { HTMLAttributes, FC } from 'react';
import React from 'react';
import { Props as DropdownProps } from '../Dropdown';

interface Props extends HTMLAttributes<HTMLDivElement>, DropdownProps {
    /** All options belonging to the menu */
    options: JSX.Element[];
}

/**
 * Menu containing all the options
 *
 * @return Menu with all options
 */
const Menu: FC<Props> = ({ orientation, alignment, menuHeight, menuWidth, options }) => {
    // define styling options
    const style: { [key: string]: string | number } = {};

    if (menuHeight) style['height'] = menuHeight;
    if (menuWidth) style['minWidth'] = menuWidth;

    return (
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
    );
};

export default Menu;
