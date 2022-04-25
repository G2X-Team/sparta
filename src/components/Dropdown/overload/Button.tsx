import type { FC } from 'react';
import React from 'react';
import type { Overload } from '../../../interfaces/Overload';

import type { IButton as CIButton } from '../../Button/Button';
import { Button as CButton } from '../../Button/Button';

/**
 * Component that formats buttons pertaining to Dropdown
 *
 * @return overloaded dropdown button
 */
const Button: FC<Overload<CIButton>> = ({
    parentProps: { toggleOpen, open, button },
    className = '',
    onClick,
    children,
    ...props
}: Overload<CIButton>) => {
    /**
     * Modifies the original button onClick so that it can also open and
     * close the menu
     */
    const handleClick = (): void => {
        toggleOpen(!open);
        if (onClick) onClick();
    };

    return (
        <CButton {...props} ref={button} onClick={handleClick} aria-expanded={open}>
            {children}
        </CButton>
    );
};

export default Button;
