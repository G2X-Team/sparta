import React from 'react';
import { Props as ButtonProps } from '../Button/Button';

interface Props extends ButtonProps {
    parentProps: any;
}

/**
 * Component that formats buttons in a way that groups them together
 *
 * @return ButtonGroup component
 */
export const Button: React.FC<Props> = ({ ...props }: Props): JSX.Element => {
    // extract props from button
    const {
        children: buttonChildren,
        className: buttonClassName,
        href: buttonHref,
        parentProps: { disabled, variant, size },
        ...buttonProps
    } = props;

    return (
        <button
            {...buttonProps}
            disabled={disabled}
            className={`apollo-component-library-button-group-button-component 
                ${buttonClassName} 
                ${variant} 
                ${size}`}
        >
            {buttonHref ? <a href={buttonHref}>{buttonChildren}</a> : buttonChildren}
        </button>
    );
};

export default Button;
