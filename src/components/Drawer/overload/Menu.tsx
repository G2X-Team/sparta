import type { CSSProperties, FC } from 'react';
import React from 'react';

import Overload from '../../../interfaces/Overload';

import { Icon } from '../../Icon/Icon';
import { IMenu as CIMenu } from '../../Menu/Menu';
import { Menu as CMenu } from '../../Menu/Menu';
import { IDrawer } from '../Drawer';

interface IMenu extends Overload<CIMenu>, Omit<IDrawer, 'data-apollo'> {}

/**
 * Formats menu component to be styled like drawer menu
 *
 * @return formatted Menu
 */
const Menu: FC<IMenu> = ({
    parentProps: {
        orientation,
        type,
        modifiedDimension,
        effect,
        dimension,
        transition,
        display,
        toggleDrawer,
        label,
    },
    onEscape,
    children,
    className,
    style,
    ...props
}) => {
    // define the conatiner style
    const containerStyle = getDrawerContainerStyle({
        orientation,
        modifiedDimension,
        type,
        effect,
        dimension,
        transition,
        style,
    });

    // define the body style
    const bodyStyle = getDrawerBodyStyle({ modifiedDimension, dimension, style });

    /**
     * Handles what happens on escape
     */
    const handleEscape = (): void => {
        if (onEscape) onEscape();
        toggleDrawer();
    };

    return (
        <>
            {type === 'permanent' || display ? (
                <div
                    {...props}
                    className={`apollo-component-library-drawer-component-container ${type}`}
                >
                    <div>
                        <div
                            style={containerStyle}
                            className={`
                                apollo-component-library-drawer-component 
                                ${className} ${type} ${orientation}
                            `}
                        >
                            <CMenu
                                {...props}
                                style={bodyStyle}
                                onEscape={handleEscape}
                                label={label}
                                useOutsideClick={type !== 'permanent' && display}
                                onOutsideClick={toggleDrawer}
                                className="apollo-component-library-drawer-component-body"
                            >
                                {type === 'absolute' ? (
                                    <Icon
                                        name="close"
                                        onClick={toggleDrawer}
                                        style={closeButtonStyle}
                                    />
                                ) : null}
                                {children}
                            </CMenu>
                        </div>
                        {type === 'absolute' ? (
                            <div
                                className={`apollo-component-library-drawer-component-backdrop 
                                    ${type}`}
                                style={getBackdropStyle(effect)}
                            />
                        ) : null}
                    </div>
                </div>
            ) : null}
        </>
    );
};

/**
 * Gets the drawer container style
 *
 * @return style object
 */
const getDrawerContainerStyle = ({
    orientation,
    modifiedDimension,
    type,
    effect,
    dimension,
    transition,
}: IDrawer & { modifiedDimension: number; effect: boolean }): React.CSSProperties => {
    const drawerStyle: CSSProperties = {
        [modifiedDimension]: type === 'permanent' || effect ? dimension : 0,
        transition: `${modifiedDimension} ${transition}ms`,
    };

    if (orientation) drawerStyle[orientation] = 0;

    return drawerStyle;
};

/**
 * Gets body drawer style
 *
 * @return style object
 */
const getDrawerBodyStyle = ({
    modifiedDimension,
    dimension,
    style,
}: IDrawer & { modifiedDimension: string }): React.CSSProperties => {
    return {
        [modifiedDimension]: dimension,
        boxShadow: 'none',
        border: 'none',
        margin: 0,
        ...style,
    };
};

/**
 * Gets the style for the drawer backdrop
 *
 * @param effect boolean determining when to change the opacity
 * @return style object
 */
const getBackdropStyle = (effect: boolean): CSSProperties => {
    return { opacity: effect ? 1 : 0 };
};

const closeButtonStyle: CSSProperties = {
    position: 'absolute',
    right: 15,
    top: 15,
};

export default Menu;
