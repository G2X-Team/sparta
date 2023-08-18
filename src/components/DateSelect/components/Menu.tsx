import type { CSSProperties, FC } from 'react';
import React from 'react';
import { ComponentAlignment, ComponentOrientation } from '../../../interfaces/Properties';

import type { IMenu as CIMenu } from '../../Menu/Menu';
import { Menu as CMenu } from '../../Menu/Menu';

interface IMenu extends CIMenu {
    toggleOpen?: (open: boolean) => void;
    display?: boolean;
    alignment?: ComponentAlignment;
    anchor?: ComponentOrientation;
    inputRef?: any;
    effect?: boolean;
}

/**
 * Formatted Menu component for the Dropdown
 *
 * @return Dropdown Menu component
 */
const Menu: FC<IMenu> = ({
    parentProps,
    toggleOpen,
    display,
    alignment = 'start',
    anchor = 'bottom',
    inputRef,
    effect,
    width = 300,
    useOutsideClick,
    onOutsideClick,
    onEscape,
    style,
    ...props
}) => {
    /**
     * Handles menu exit events
     */
    const handleExit = (): void => {
        if (toggleOpen) toggleOpen(false);
    };

    return (
        <div style={getPortalStyle({ anchor, inputRef })}>
            <CMenu
                {...props}
                width={width}
                style={getStyle({
                    style,
                    width,
                    alignment,
                    anchor,
                    inputRef,
                    effect,
                })}
                description="Calendar"
                useOutsideClick={display}
                onOutsideClick={() => toggleOpen && toggleOpen(false)}
                onEscape={handleExit}
            />
        </div>
    );
};

/**
 * Gets the style from portal
 *
 * @return gets the style
 */
const getPortalStyle = ({ anchor }: Omit<IMenu, 'label'>): CSSProperties => {
    const portalStyle: CSSProperties = { display: 'flex', position: 'relative' };

    if (anchor == 'top' || anchor == 'bottom') portalStyle.justifyContent = 'space-around';
    if (anchor == 'left' || anchor == 'right') portalStyle.alignItems = 'center';

    return portalStyle;
};

/**
 * Gets the style of menu
 *
 * @return gets the style
 */
const getStyle = ({
    style,
    width,
    alignment,
    anchor,
    inputRef,
    effect,
}: Omit<IMenu, 'label'>): CSSProperties => {
    const menuStyle: CSSProperties = {
        position: 'absolute',
        opacity: effect ? 1 : 0,
        transition: 'opacity 200ms ease-out, transform 300ms ease-out',
        padding: 10,
        ...style,
    };

    const {
        current: { clientHeight: selectHeight },
    } = inputRef;

    switch (anchor) {
        case 'top':
            menuStyle.bottom = 5;
            if (alignment === 'start') {
                menuStyle.left = 0;
                menuStyle.transform = `translate(${effect ? 0 : '-5px'}, ${effect ? 0 : '5px'})`;
            } else if (alignment === 'end') {
                menuStyle.right = 0;
                menuStyle.transform = `translate(${effect ? 0 : '5px'}, ${effect ? 0 : '5px'})`;
            } else {
                menuStyle.transform = `translate(0, ${effect ? 0 : '5px'})`;
            }
            break;
        case 'bottom':
            menuStyle.top = 5;
            if (alignment === 'start') {
                menuStyle.left = 0;
                menuStyle.transform = `translate(${effect ? 0 : '-5px'}, ${effect ? 0 : '-5px'})`;
            } else if (alignment === 'end') {
                menuStyle.right = 0;
                menuStyle.transform = `translate(${effect ? 0 : '5px'}, ${effect ? 0 : '-5px'})`;
            } else {
                menuStyle.transform = `translate(0, ${effect ? 0 : '-5px'})`;
            }
            break;
        case 'right':
            menuStyle.right = `calc((${width}px * -1) - 10px)`;
            if (alignment === 'start') menuStyle.bottom = -5;
            if (alignment === 'end') menuStyle.top = -selectHeight - 6;
            if (alignment === 'center')
                menuStyle.transform = `translate(0, -${selectHeight / 2}px)`;
            break;
        case 'left':
            menuStyle.left = `calc((${width}px * -1) - 10px)`;
            if (alignment === 'start') menuStyle.bottom = -selectHeight - 6;
            if (alignment === 'end') menuStyle.top = -5;
            if (alignment === 'center')
                menuStyle.transform = `translate(0,  ${selectHeight / 2}px)`;
    }

    return menuStyle;
};

export default Menu;
