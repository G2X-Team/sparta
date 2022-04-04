import { HTMLAttributes, FC, forwardRef, ForwardedRef, MouseEvent, RefObject } from 'react';
import React, { useEffect, useRef } from 'react';
import './Option.css';

import Overload from '../../interfaces/Overload';
import type { ComponentWrap } from '../../interfaces/Properties';

import { Text } from '../Text/Text';

export interface IOption extends Overload<Omit<HTMLAttributes<HTMLElement>, 'onClick'>> {
    /** Needs to have a string value in between tags */
    children: string;
    /** Can have onClick callback method */
    onClick?: (event?: MouseEvent<HTMLLIElement>) => void;
    /** Allows for forward ref */
    ref?: ForwardedRef<HTMLLIElement>;
    /** Adds the ability to redirect to other places */
    href?: string;
    /** Method that wraps option within another element while keeping same interface name */
    wrap?: ComponentWrap;
}

/**
 * Interfacing component used to describe an object pertaining to a menu.
 *
 * @return Option component
 */
// eslint-disable-next-line react/display-name
export const Option: FC<IOption> = forwardRef(function Option(
    { children, parentProps, className, onClick, wrap, href, ...props }: IOption,
    ref
) {
    // define a fallback ref
    const optionRef = useRef<HTMLLIElement>(null);

    useEffect(() => {
        const activeRef = (ref as RefObject<HTMLLIElement>) || optionRef;
        if (!onClick || wrap) return;

        /**
         * Will execute the onClick method on enter
         *
         * @param event keyobard event
         */
        const onEnter = (event: KeyboardEvent): void => {
            if (event.key === 'Enter' && document.activeElement === activeRef.current) {
                handleClick();
            }
        };

        window.addEventListener('keydown', onEnter);
        return () => window.removeEventListener('keydown', onEnter);
    }, []);

    /** Handles click for option */
    const handleClick = (): void => {
        if (onClick) onClick();
        if (href) window.location.replace(href);
    };

    const option = (
        <li
            {...props}
            tabIndex={0}
            ref={ref || optionRef}
            onClick={handleClick}
            role="option"
            className={`apollo-component-library-option-component ${className || ''}`}
        >
            <Text>{children}</Text>
        </li>
    );

    return <>{wrap ? wrap(option) : option}</>;
});
