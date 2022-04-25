import type { FC } from 'react';
import React from 'react';
import { View as CView } from '../../View/View';

import type { IView as CIView } from '../../View/View';
import type { Overload } from '../../../interfaces/Overload';

/**
 * Overloaded view component formatted to pass through group modifiers to enable more complex layout
 *
 * @return formatted view
 */
const View: FC<Overload<CIView>> = ({
    parentProps: { renderAll },
    children,
    ...props
}): JSX.Element => {
    return <CView {...props}>{renderAll ? renderAll(children) : null}</CView>;
};

export default View;
