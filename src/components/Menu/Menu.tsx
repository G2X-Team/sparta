import type { CSSProperties, FC, HTMLAttributes, MouseEventHandler, ReactNode } from 'react';
import React, { useEffect, useState, useRef } from 'react';
import './Menu.css';

import type { Apollo } from '../../interfaces/Apollo';
import type { RenderAll, Interface } from '../../interfaces/Overload';
import type * as CSS from 'csstype';
import FormatChildren from '../../util/FormatChildren';
import { gaurdApolloName } from '../../util/ErrorHandling';
import { handleOutsideClick } from '../../util/detectOutsideClick';

import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import Option from './overload/Option';

export interface IMenu extends Interface<HTMLAttributes<HTMLDivElement>>, Apollo<'Menu'> {
    /** Determines whether the menu is meant for navigation */
    navigation?: boolean;
    /** Determines the max height of the menu */
    height?: CSS.Property.MaxHeight | number;
    /** Determines the max width of the menu */
    width?: CSS.Property.MaxWidth | number;
    /** Determine what do when you click outside the menu */
    onOutsideClick?: () => void;
    /** Determeine whether to use outside click or not */
    useOutsideClick?: boolean;
    /** Mandatory label that describes the menu */
    label: string;
    /** Mandatory descriptive text when menu is in `application` mode */
    description?: string;
    /** If the menu has options, this method will be applied on top of the options onClick method */
    handleOptionClick?: MouseEventHandler<HTMLOListElement>;
    /** Lets you change how much padding in the menu while not affecting other sides */
    padding?: CSS.Property.Padding;
    /** For handling actions on escape */
    onEscape?: () => void;
}

/**
 * Apollo's interfacing Menu, this is mean to be used by all components that require a menu for its
 * functionality
 *
 * @return Menu component
 */
export const Menu: FC<IMenu> = ({
    navigation = false,
    description,
    handleOptionClick,
    children,
    className,
    onOutsideClick,
    useOutsideClick,
    onEscape,
    label,
    ...props
}) => {
    gaurdApolloName(props, 'Menu');

    // refs
    const menu = useRef<HTMLDivElement>(null);
    const first = useRef<HTMLLIElement>(null);
    const last = useRef<HTMLLIElement>(null);

    // state
    const [hasOptions, toggleHasOptions] = useState(false);
    const [headerComponent, setHeader] = useState<JSX.Element | null>(null);
    const [footerComponent, setFooter] = useState<JSX.Element | null>(null);

    if (useOutsideClick && onOutsideClick)
        handleOutsideClick(menu, onOutsideClick, useOutsideClick);

    useEffect(() => {
        if (!hasOptions) return;

        /**
         * Navigates to first or last child depending on key press
         *
         * @param event event that occurs on keypress
         */
        const handleKeypresses = (event: KeyboardEvent): void => {
            if (onEscape && event.key === 'Escape') onEscape();
            if (event.key === 'Home') first.current?.focus();
            if (event.key === 'End') last.current?.focus();
        };

        window.addEventListener('keydown', handleKeypresses);
        return () => window.removeEventListener('keydown', handleKeypresses);
    }, []);

    /**
     * Formats and renders all children
     *
     * @return Formatted children
     */
    const renderAll: RenderAll = () => {
        // parent props
        const parentProps = { children, first, last, handleOptionClick };

        // get formatted children
        const formatted = new FormatChildren(children, { Option, Header, Footer }, parentProps);
        if (!hasOptions && formatted.get('Option').length) toggleHasOptions(true);

        // check if in application mode
        if (!hasOptions) {
            // check if there is a description
            if (!formatted.get('Option').length && !description?.length)
                throw new Error('Menu with no Option components requires description prop');
        }

        // if it is extract the headers and footers
        const extracted = formatted.extract(['Header', 'Footer']);
        if (extracted.Header) {
            const {
                Header: [header, ...otherHeaders],
            } = extracted;

            if (otherHeaders?.length)
                throw new Error('Only one Header component can exist in the Menu');

            if (header && !headerComponent) setHeader(header);
        }

        if (extracted.Footer) {
            const {
                Footer: [footer, ...otherFooters],
            } = extracted;

            if (otherFooters?.length)
                throw new Error('Only one Footer component can exist in the Menu');

            if (footer && !footerComponent) setFooter(footer);
        }

        return formatted.getAll();
    };

    // organizes formatted children
    const formattedChildren: ReactNode = hasOptions ? (
        <ul role="listbox" aria-label={label}>
            {renderAll()}
        </ul>
    ) : (
        renderAll()
    );

    return (
        <div
            {...props}
            ref={menu}
            className={`apollo ${className || ''}`}
            style={getMenuStyle(props)}
            role={!hasOptions ? 'application' : undefined}
            aria-roledescription={description}
        >
            {headerComponent}
            <div className="apollo-component-library-menu-component-inner">
                {navigation ? <nav>{formattedChildren}</nav> : formattedChildren}
            </div>
            {footerComponent}
        </div>
    );
};

Menu.defaultProps = { 'data-apollo': 'Menu' };

/**
 * Gets menu style
 *
 * @return menu style component
 */
const getMenuStyle = ({ height, width, style, padding }: Omit<IMenu, 'label'>): CSSProperties => {
    return {
        maxHeight: height,
        padding,
        width,
        ...style,
    };
};
