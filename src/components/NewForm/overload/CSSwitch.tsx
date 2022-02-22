import type { ChangeEvent, FC } from 'react';
import React, { useEffect } from 'react';

import Overload from '../../../interfaces/Overload';

import { Switch as CSwitch, Props as SwitchProps } from '../../Switch/Switch';

/**
 * Switch component formatted to integrate with form component
 *
 * @return formatted switch component
 */
const Switch: FC<Overload<SwitchProps>> = ({
    parentProps: { setValue, clearErrors, register, errors, groupExtension },
    name,
    required,
    ...props
}) => {
    useEffect(() => {
        if (!name?.length) throw new Error('Must use Switch `name` prop when using Form.');

        register(name, {
            required: { value: required, message: `This setting is required.` },
        });
    });

    /**
     * Method that will handle on change validation while also allowing user-fed onChange callback
     *
     * @param event form event containing value
     */
    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        // extract value
        const {
            target: { value },
        } = event;

        setValue(name, value);

        // check for required errors and update on input
        if (errors[name]?.type === 'required' && value.length) {
            clearErrors(name);
        }
    };

    return <CSwitch {...props} name={name} onChange={handleChange} />;
};

export default Switch;
