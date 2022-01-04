import React from 'react';
import Overload from '../../../interfaces/Overload';
import { Props } from '../../Button/Button';

/**
 * Overloaded Button that is formatted to use modal functions on click
 *
 * @return Button component
 */
const Button: React.FC<Overload<Props>> = ({
    parentProps: { toggleModal, manual, open },
    onClick,
    variant,
    className = '',
    ...props
}: Overload<Props>): JSX.Element => {
    /**
     * Will toggle the modal to close after executing original on click call back
     * if manual prop is set to false
     */
    const buttonOnClick = (): void => {
        onClick && onClick();
        !manual && toggleModal && toggleModal(!open);
    };

    return (
        <button
            {...props}
            onClick={buttonOnClick}
            className={`apollo-component-library-modal-component-button-group-button 
                ${className} ${variant}`}
        />
    );
};

export default Button;
