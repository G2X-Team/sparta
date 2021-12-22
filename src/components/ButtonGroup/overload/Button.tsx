import React from 'react';
import { Props } from '../../Button/Button';
import Overload from '../../../interfaces/Overload';

/**
 * Component that formats buttons in a way that groups them together
 *
 * @return ButtonGroup component
 */
const Button: React.FC<Overload<Props>> = ({
    parentProps: { disabled, variant, size },
    children,
    className,
    href,
    ...props
}: Overload<Props>): JSX.Element => {
    return (
        <button
            {...props}
            disabled={disabled}
            className={`apollo-component-library-button-group-button-component 
                ${className} 
                ${variant} 
                ${size}`}
        >
            {href ? <a href={href}>{children}</a> : children}
        </button>
    );
};

export default Button;
