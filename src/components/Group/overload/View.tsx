import type { HTMLAttributes, FC } from 'react';
import React from 'react';
import { View as CView } from '../../View/View';
import Overload from '../../../interfaces/Overload';

/**
 * Overloaded view component formatted to pass through group modifiers to enable more complex layout
 *
 * @return formatted view
 */
const View: FC<Overload<HTMLAttributes<HTMLDivElement>>> = ({
    parentProps: { renderAll },
    children,
    ...props
}: Overload<HTMLAttributes<HTMLDivElement>>): JSX.Element => {
    return <CView {...props}>{renderAll(children)}</CView>;
};

export default View;
