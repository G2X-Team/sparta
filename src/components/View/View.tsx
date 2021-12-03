import React, { HTMLAttributes, ReactNode } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
    /** May have children */
    children?: ReactNode;
}

/**
 * Div element that allows for extended templating options for interface components
 *
 * @return View component
 */
export const View: React.FC<Props> = ({ children, ...props }: Props): JSX.Element => {
    return <div {...props}>{children}</div>;
};
