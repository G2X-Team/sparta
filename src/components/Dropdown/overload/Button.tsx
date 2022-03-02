import type { FC } from 'react';
import React, { useEffect } from 'react';
import { IButton as CIButton } from '../../Button/Button';
import type Overload from '../../../interfaces/Overload';

export interface IButton extends Overload<CIButton> {
    /** Dropdown name */
    name: string;
}

/**
 * Component that formats buttons pertaining to Dropdown
 *
 * @return overloaded dropdown button
 */
const Button: FC<Overload<IButton>> = ({
    parentProps: { dropdownRef, toggleOpen, open, name },
    onClick,
    children,
    className = '',
    ...props
}: Overload<IButton>) => {
    useEffect(() => {
        /**
         * Will execute the onClick method on enter
         *
         * @param event keyobard event
         */
        const onEnter = (event: KeyboardEvent): void => {
            if (event.key === 'Enter') {
                buttonOnClick();
            }
        };

        window.addEventListener('keydown', onEnter);
        return () => window.removeEventListener('keydown', onEnter);
    }, []);

    /**
     * Modifies the original button onClick so that it can also open and
     * close the menu
     */
    const buttonOnClick = (): void => {
        toggleOpen(!open);
        onClick && onClick();
    };

    return (
        <span
            {...props}
            className={`apollo-component-library-dropdown-button-component ${className}`}
            onClick={buttonOnClick}
            ref={dropdownRef}
            role="button"
            tabIndex={0}
            aria-haspopup="listbox"
            aria-expanded={open}
            id={`__${name}`}
        >
            {children}
        </span>
    );
};

export default Button;
