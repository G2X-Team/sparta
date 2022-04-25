import type { CSSProperties, FC } from 'react';
import React from 'react';
import { Overload } from '../../../interfaces/Overload';

import type { IMenu as CIMenu } from '../../Menu/Menu';
import { Menu as CMenu } from '../../Menu/Menu';

/**
 * Formatted Menu component for the Dropdown
 *
 * @return Dropdown Menu component
 */
const Menu: FC<Overload<CIMenu>> = ({
    parentProps: { toggleOpen, open, alignment, anchor, button },
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
        toggleOpen(false);
        button.current.focus();
    };

    return (
        <div style={getPortalStyle({ parentProps: { anchor, button } })}>
            <CMenu
                {...props}
                width={width}
                style={getStyle({ style, width, parentProps: { alignment, anchor, button } })}
                handleOptionClick={() => toggleOpen(false)}
                useOutsideClick={open}
                onOutsideClick={handleExit}
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
const getPortalStyle = ({
    parentProps: { anchor },
}: Omit<Overload<CIMenu>, 'label'>): CSSProperties => {
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
    parentProps: { alignment, anchor, button },
}: Omit<Overload<CIMenu>, 'label'>): CSSProperties => {
    const menuStyle: CSSProperties = { position: 'absolute', ...style };
    const {
        current: { clientHeight: buttonHeight },
    } = button;

    switch (anchor) {
        case 'top':
            menuStyle.bottom = 5;
            if (alignment === 'start') menuStyle.left = 0;
            if (alignment === 'end') menuStyle.right = 0;
            break;
        case 'bottom':
            menuStyle.top = 5;
            if (alignment === 'start') menuStyle.left = 0;
            if (alignment === 'end') menuStyle.right = 0;
            break;
        case 'right':
            menuStyle.right = `calc((${width}px * -1) - 10px)`;
            if (alignment === 'start') menuStyle.bottom = -5;
            if (alignment === 'end') menuStyle.top = -buttonHeight - 6;
            if (alignment === 'center')
                menuStyle.transform = `translate(0, -${buttonHeight / 2}px)`;
            break;
        case 'left':
            menuStyle.left = `calc((${width}px * -1) - 10px)`;
            if (alignment === 'start') menuStyle.bottom = -buttonHeight - 6;
            if (alignment === 'end') menuStyle.top = -5;
            if (alignment === 'center')
                menuStyle.transform = `translate(0,  ${buttonHeight / 2}px)`;
    }

    return menuStyle;
};

export default Menu;
