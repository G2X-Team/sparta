import type { HTMLAttributes, ReactNode, FC } from 'react';
import React from 'react';

interface IView extends HTMLAttributes<HTMLDivElement> {
    /** May have children */
    children?: ReactNode;
}

/**
 * Div element that allows for extended templating options for interface components
 *
 * @return View component
 */
export const View: FC<IView> = ({ children, ...iView }) => {
    return <div {...iView}>{children}</div>;
};
