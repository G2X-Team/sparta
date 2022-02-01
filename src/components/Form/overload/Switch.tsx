import React, { FormEvent, useEffect } from 'react';
import type { FC } from 'react';
import Overload from '../../../interfaces/Overload';
import { Props as SwitchProps, Switch as CSwitch } from '../../Switch/Switch';

interface Props extends Overload<SwitchProps> {
    /** Name required for switch nested in form */
    name: string;
}

/**
 * Overloaded Switch formatted to update form value
 *
 * @return Formatted Switch
 */
const Switch: FC<Props> = ({
    parentProps: { parentRequired, formValue, setFormValue },
    checked,
    name,
    onChange,
    required,
    children,
    ...props
}: Props): JSX.Element => {
    // set required if applicable
    useEffect(() => {
        if (required && !parentRequired[name]) {
            parentRequired[name] = `${name} is required, please toggle on.`;
        }
    }, []);

    /**
     * Modifies switch on change
     *
     * @param event input event
     */
    const modifiedOnChange = (event: FormEvent<HTMLInputElement>): void => {
        setFormValue({ ...formValue, [name]: formValue[name] ? false : true });
        onChange && onChange(event);
    };

    return (
        <CSwitch {...props} name={name} onChange={modifiedOnChange}>
            {children}
        </CSwitch>
    );
};

export default Switch;
