import type { HTMLAttributes, ReactNode, FC } from 'react';
import React from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
    /** May have children */
    children?: ReactNode;
}

/**
 * Div element that allows for extended templating options for interface components
 *
 * @return View component
 */
export const View: FC<Props> = ({ children, ...props }) => {
    return <div {...props}>{children}</div>;
};
