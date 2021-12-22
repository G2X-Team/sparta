import React, { FormEvent } from 'react';
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
const Switch: React.FC<Props> = ({
    parentProps: { parentRequired, setParentRequired, formValue, setFormValue },
    checked,
    name,
    onChange,
    required,
    children,
    ...props
}: Props): JSX.Element => {
    // set required if applicable
    if (required && !parentRequired[name]) {
        setParentRequired({
            ...parentRequired,
            [name]: `${name} is required, please toggle on.`,
        });
    }

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
