import type { FC } from 'react';
import React from 'react';
import type { Overload } from '../../../interfaces/Overload';
import FormatChildren from '../../../util/formatting/FormatChildren';

import Button from './Button';
import { IButtonGroup } from '../../ButtonGroup/ButtonGroup';

/**
 * Overloads ButtonGroup to change style and pass through modal actions
 *
 * @return Formatted ButtonGroup
 */
const ButtonGroup: FC<Overload<IButtonGroup>> = ({
    parentProps: { ...parentProps },
    className = '',
    children,
    ...props
}: Overload<IButtonGroup>) => {
    // get all props
    const allProps = { ...props, ...parentProps };

    // find the buttons in the button group
    const formattedButtonGroup = new FormatChildren(children, { Button }, allProps);

    // check that there are only buttons in the button group
    if (formattedButtonGroup.getOther().length > 0)
        throw new Error('Only buttons are allowed in button groups');

    return (
        <div className={`apollo-component-library-modal-component-button-group ${className}`}>
            {formattedButtonGroup.getAll()}
        </div>
    );
};

export default ButtonGroup;
