import { FC, ForwardedRef, forwardRef } from 'react';
import React from 'react';
import type { Interface } from '../../../interfaces/Overload';

import type { IButton as CIButton } from '../../Button/Button';
import { Button as CButton } from '../../Button/Button';
import { Sparta } from '../../../interfaces/Sparta';

export interface IDrawerButton
    extends Interface<Omit<CIButton, 'data-sparta'>>,
        Sparta<'Drawer.Button'> {}

/**
 * Formats button to be sub component of Dropdown
 *
 * @return Formatted Button Component
 */
const Button: FC<IDrawerButton> = forwardRef(function Button(
    {
        parentProps,
        ['data-sparta']: spartaName,
        onClick,
        children,
        ...props
    }: Interface<IDrawerButton>,
    ref: ForwardedRef<HTMLButtonElement>
) {
    /**
     * Handles the button click
     */
    const handleClick = (): void => {
        if (onClick) onClick();
        parentProps?.toggleDrawer();
    };

    return (
        <span>
            <CButton
                {...props}
                ref={parentProps?.buttonRef || ref}
                onClick={handleClick}
                aria-expanded={parentProps?.instant}
            >
                {children}
            </CButton>
        </span>
    );
});

Button.defaultProps = { 'data-sparta': 'Drawer.Button' };

export default Button;
