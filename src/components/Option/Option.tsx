import { HTMLAttributes, FC, forwardRef, ForwardedRef } from 'react';
import React, { useEffect } from 'react';
import './Option.css';

import Overload from '../../interfaces/Overload';

import { Text } from '../Text/Text';

export interface Props extends Overload<HTMLAttributes<HTMLElement>> {
    /** Needs to have a string value in between tags */
    children: string;
    /** Can have onClick callback method */
    onClick?: () => void;
    /** Allows for forward ref */
    ref?: ForwardedRef<HTMLLIElement>;
}

/**
 * Interfacing component used to describe an object pertaining to a menu.
 *
 * @return Option component
 */
// eslint-disable-next-line react/display-name
export const Option: FC<Props> = forwardRef(function Option(
    { children, parentProps, className, onClick, ...props }: Props,
    ref
) {
    useEffect(() => {
        if (!onClick) return;

        /**
         * Will execute the onClick method on enter
         *
         * @param event keyobard event
         */
        const onEnter = (event: KeyboardEvent): void => {
            if (event.key === 'Enter') {
                onClick && onClick();
            }
        };

        window.addEventListener('keydown', onEnter);
        return () => window.removeEventListener('keydown', onEnter);
    }, []);

    return (
        <li
            {...props}
            tabIndex={0}
            ref={ref}
            onClick={onClick}
            role="option"
            className={`apollo-component-library-option-component ${className}`}
        >
            <Text margins={false}>{children}</Text>
        </li>
    );
});
