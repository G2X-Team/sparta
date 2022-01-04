import React from 'react';
import { Props } from '../../Button/Button';
import Overload from '../../../interfaces/Overload';

/**
 * Component that formats buttons pertaining to Dropdown
 *
 * @return overloaded dropdown button
 */
const Button: React.FC<Overload<Props>> = ({
    parentProps: { dropdownRef, toggleOpen, open },
    onClick,
    children,
    className = '',
    ...props
}: Overload<Props>) => {
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
        >
            {children}
        </span>
    );
};

export default Button;
