import { FC, ForwardedRef, forwardRef } from 'react';
import React from 'react';
import Overload from '../../../interfaces/Overload';

import type { IButton as CIButton } from '../../Button/Button';
import { Button as CButton } from '../../Button/Button';
import { Apollo } from '../../../interfaces/Apollo';

export interface IDrawerButton
    extends Overload<Omit<CIButton, 'data-apollo'>>,
        Apollo<'Drawer.Button'> {}

/**
 * Formats button to be sub component of Dropdown
 *
 * @return Formatted Button Component
 */
const Button: FC<Overload<IDrawerButton>> = forwardRef(function Button(
    {
        parentProps: { toggleDrawer, buttonRef, instant },
        ['data-apollo']: apolloName,
        onClick,
        children,
        ...props
    }: Overload<IDrawerButton>,
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
        <span>
            <CButton
                {...props}
                ref={buttonRef || ref}
                onClick={handleClick}
                aria-expanded={instant}
            >
                {children}
            </CButton>
        </span>
    );
});

Button.defaultProps = { 'data-apollo': 'Drawer.Button' };

export default Button;
