import type { FC } from 'react';
import React from 'react';

import Overload from '../../../interfaces/Overload';

import type { IIcon as CIIcon } from '../../Icon/Icon';
import { Icon as CIcon } from '../../Icon/Icon';

/**
 * Icon component for the Dropdown
 * @return Formatted Icon Component
 */
const Icon: FC<Overload<CIIcon>> = ({
    parentProps: { toggleOpen, open, button },
    className = '',
    onClick,
    children,
    ...props
}: Overload<CIIcon>) => {
    /**
     * Modifies the original icon onClick so that it can also open and
     * close the menu
     */
    const handleClick = (): void => {
        toggleOpen(!open);
        if (onClick) onClick();
    };

    return (
        <CIcon {...props} ref={button} onClick={handleClick} aria-expanded={open}>
            {children}
        </CIcon>
    );
};

export default Icon;
