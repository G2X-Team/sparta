import type { FC } from 'react';
import React from 'react';

import Overload from '../../../interfaces/Overload';

import { Switch as CSwitch, ISwitch as SwitchProps } from '../../Switch/Switch';

/**
 * Formats Switch to be compatible with form
 *
 * @return Formatted Switch compatible with form
 */
const Switch: FC<Overload<SwitchProps>> = ({
    parentProps: {
        actionData: { fields },
    },
    onChange,
    required,
    name,
    id,
    ...iSwitch
}) => {
    const isChecked: boolean = fields ? fields[name] : false;

    return (
        <CSwitch {...iSwitch} id={id} name={name} required={required} defaultChecked={isChecked} />
    );
};

export default Switch;
