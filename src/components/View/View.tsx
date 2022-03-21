import type { HTMLAttributes, ReactNode, FC, CSSProperties } from 'react';
import React from 'react';

import type Overload from '../../interfaces/Overload';
import type * as CSS from 'csstype';

export interface IView extends Overload<HTMLAttributes<HTMLDivElement>> {
    /** May have children */
    children?: ReactNode;
    /** Change the display style of View */
    display?: CSS.Property.Display;
    /** Change the position style of View */
    position?: CSS.Property.Position;
}

/**
 * Div element that allows for extended templating options for interface components
 *
 * @return View component
 */
export const View: FC<IView> = ({ parentProps, children, display, position, style, ...props }) => {
    return (
        <div {...props} style={getViewStyle({ display, position, style })}>
            {parentProps?.renderAll ? parentProps?.renderAll(children) : children}
        </div>
    );
};

/**
 * Gets the style object for the View given props
 *
 * @return Finalized style object;
 */
const getViewStyle = ({ display, position, style }: IView): CSSProperties => {
    return {
        display,
        position,
        ...style,
    };
};
