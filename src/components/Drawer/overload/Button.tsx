import { FC, ForwardedRef, forwardRef } from 'react';
import React from 'react';
import Overload from '../../../interfaces/Overload';

import type { IButton as CIButton } from '../../Button/Button';
import { Button as CButton } from '../../Button/Button';

/**
 * Formats button to be sub component of Dropdown
 *
 * @return Formatted Button Component
 */
const Button: FC<Overload<CIButton>> = forwardRef(function Button(
    {
        parentProps: { toggleDrawer, buttonRef, instant },
        onClick,
        children,
        ...props
    }: Overload<CIButton>,
    ref: ForwardedRef<HTMLButtonElement>
) {
    /**
     * Handles the button click
     */
    const handleClick = (): void => {
        if (onClick) onClick();
        toggleDrawer();
    };

    return (
        <CButton {...props} ref={buttonRef || ref} onClick={handleClick} aria-expanded={instant}>
            {children}
        </CButton>
    );
});

Button.displayName = 'Drawer.Button';

export default Button;
