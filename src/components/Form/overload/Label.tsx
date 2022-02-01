import React from 'react';
import type { FC } from 'react';
import Overload from '../../../interfaces/Overload';
import { Props, Label as CLabel } from '../../Label/Label';

/**
 * Overloads label component to pass through form functionality to children
 *
 * @return Formatted Label
 */
const Label: FC<Overload<Props>> = ({
    parentProps: { renderAll },
    children,
    ...props
}: Overload<Props>) => {
    return <CLabel {...props}>{renderAll(children)}</CLabel>;
};

export default Label;
