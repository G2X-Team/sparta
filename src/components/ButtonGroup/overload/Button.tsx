import React from 'react';
import { IButton } from '../../Button/Button';
import type { Overload } from '../../../interfaces/Overload';

/**
 * Component that formats buttons in a way that groups them together
 *
 * @return ButtonGroup component
 */
const Button: React.FC<Overload<IButton>> = ({
    parentProps: { disabled, variant, size },
    children,
    className,
    ...props
}: Overload<IButton>): JSX.Element => {
    return (
        <button
            {...props}
            disabled={disabled}
            className={`sparta-component-library-button-group-button-component 
                ${className} 
                ${variant} 
                ${size}`}
        >
            {children}
        </button>
    );
};

export default Button;
