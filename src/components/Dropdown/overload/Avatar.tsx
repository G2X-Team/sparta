import type { CSSProperties, FC } from 'react';
import React from 'react';

import type { Overload } from '../../../interfaces/Overload';
import type { IAvatar as CIAvatar } from '../../Avatar/Avatar';
import { Avatar as CAvatar } from '../../Avatar/Avatar';
import { Icon } from '../../Icon/Icon';

/**
 * Avatar component for the Dropdown
 * @return Formatted Avatar Component
 */
const Avatar: FC<Overload<CIAvatar>> = ({
    parentProps: { toggleOpen, open, button, hideArrow },
    className = '',
    onClick,
    children,
    ...props
}: Overload<CIAvatar>) => {
    /**
     * Modifies the original Avatar onClick so that it can also open and
     * close the menu
     */
    const handleClick = (): void => {
        toggleOpen(!open);
        if (onClick) onClick();
    };

    return !hideArrow ? (
        <button ref={button} onClick={handleClick}>
            <CAvatar {...props} aria-expanded={open} clickable>
                {children}
            </CAvatar>
            <Icon name="keyboard_arrow_down" style={getIconStyle({ parentProps: { open } })} />
        </button>
    ) : (
        <CAvatar {...props} aria-expanded={open} ref={button} onClick={handleClick}>
            {children}
        </CAvatar>
    );
};

/**
 * Gets icon style
 *
 * @return icon style
 */
const getIconStyle = ({
    parentProps: { open },
}: Omit<Overload<CIAvatar>, 'children' | 'fallback'>): CSSProperties => {
    return {
        transform: `${open ? 'rotate(180deg)' : 'rotate(0deg)'}`,
        color: 'inerit',
    };
};

export default Avatar;
