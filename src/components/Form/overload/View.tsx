import type { HTMLAttributes, FC } from 'react';
import React from 'react';
import Overload from '../../../interfaces/Overload';
import { View as CView } from '../../View/View';

/**
 * Overloads View component to pass through form functionality to children
 *
 * @return Formatted View
 */
const View: FC<Overload<HTMLAttributes<HTMLDivElement>>> = ({
    parentProps: { renderAll },
    children,
    ...props
}: Overload<HTMLAttributes<HTMLDivElement>>) => {
    return <CView {...props}>{renderAll(children)}</CView>;
};

export default View;
