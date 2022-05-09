import type { FC } from 'react';
import React from 'react';

import type { Overload } from '../../../interfaces/Overload';
import type { IAvatar as CIAvatar } from '../../Avatar/Avatar';
import { Avatar as CAvatar } from '../../Avatar/Avatar';

/**
 * Avatar component for the Dropdown
 * @return Formatted Avatar Component
 */
const Avatar: FC<Overload<CIAvatar>> = ({
    parentProps: { toggleOpen, open, button },
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

    return (
        <CAvatar {...props} ref={button} onClick={handleClick} aria-expanded={open}>
            {children}
        </CAvatar>
    );
};

export default Avatar;
