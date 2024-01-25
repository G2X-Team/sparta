import { HTMLAttributes, FC, forwardRef, ForwardedRef, MouseEvent } from 'react';
import React from 'react';
import './Option.css';

import type { Sparta } from '../../interfaces/Sparta';
import type { Interface } from '../../interfaces/Overload';
import type { ComponentWrap } from '../../interfaces/Properties';
import { guardSpartaName } from '../../util/ErrorHandling';

import { Text } from '../Text/Text';

export interface IOption
    extends Interface<Omit<HTMLAttributes<HTMLElement>, 'onClick'>>,
        Sparta<'Option'> {
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
    guardSpartaName(props, 'Option');

    /** Handles click for option */
    const handleClick = (): void => {
        if (onClick) onClick();
        if (href) window.location.replace(href);
    };

    const option = (
        <li
            {...props}
            tabIndex={0}
            ref={ref}
            onClick={handleClick}
            onKeyDown={(event) => event.key === 'Enter' && handleClick()}
            role="option"
            className={`sparta-component-library-option-component ${className || ''}`}
        >
            <Text>{children}</Text>
        </li>
    );

    return <>{wrap ? wrap(option) : option}</>;
});

Option.defaultProps = { 'data-sparta': 'Option' };
