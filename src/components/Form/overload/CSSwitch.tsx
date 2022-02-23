import type { ChangeEvent, FC } from 'react';
import React, { useEffect } from 'react';

import Overload from '../../../interfaces/Overload';
import { CSBooleanInputValue } from '../../../interfaces/Properties';

import { Switch as CSwitch, Props as SwitchProps } from '../../Switch/Switch';

/**
 * Switch component formatted to integrate with form component
 *
 * @return formatted switch component
 */
const Switch: FC<Overload<SwitchProps>> = ({
    parentProps: { setValue, register },
    name,
    ...props
}) => {
    // make sure that an id was provided
    useEffect(() => {
        if (!name) throw new Error('Must use Checkbox `name` prop when use in Form without Group');

        // register name
        register(name);
    }, []);

    /**
     * Method that will handle on change validation while also allowing user-fed onChange callback
     *
     * @param event form event containing value
     */
    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        // extract value
        const {
            target: { checked },
        } = event;

        const data: CSBooleanInputValue = { checked };
        setValue(name, data);
    };

    return <CSwitch {...props} name={name} onChange={handleChange} />;
};

export default Switch;
