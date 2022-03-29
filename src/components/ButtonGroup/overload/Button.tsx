import React from 'react';
import { IButton } from '../../Button/Button';
import Overload from '../../../interfaces/Overload';

/**
 * Component that formats buttons in a way that groups them together
 *
 * @return ButtonGroup component
 */
const Button: React.FC<Overload<IButton>> = ({
    parentProps: { disabled, variant, size },
    children,
    className,
    onClick,
    href,
    ...props
}: Overload<IButton>): JSX.Element => {
    /** Handles click open link if href > 0 */
    const handleClick = (): void => {
        if (onClick) onClick();
        if (href && href.length > 0) {
            window.open(href, '_blank');
        }
    };
    return (
        <button
            {...props}
            disabled={disabled}
            onClick={handleClick}
            className={`apollo-component-library-button-group-button-component 
                ${className} 
                ${variant} 
                ${size}`}
        >
            {children}
        </button>
    );
};

export default Button;
