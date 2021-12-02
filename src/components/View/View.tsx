import React, { HTMLAttributes } from 'react';

/**
 * Div element that allows for extended templating options for interface components
 */
export const View = ({
    children,
    ...props
}: HTMLAttributes<HTMLDivElement>) => {
    return <div {...props}>{children}</div>;
};
