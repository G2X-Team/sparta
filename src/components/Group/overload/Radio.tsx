import type { FC } from 'react';
import React, { FormEvent } from 'react';
import { Props, Radio as CRadio } from '../../Radio/Radio';
import Overload from '../../../interfaces/Overload';

/**
 * Overloaded Radio formatted to update group value on change
 *
 * @return Formatted Radio
 */
const Radio: FC<Overload<Props>> = ({
    parentProps: { parentDisabled, radioValues, setRadioValue },
    onChange,
    disabled,
    value,
    ...props
}: Overload<Props>): JSX.Element => {
    /**
     * Updates value and fires original onChange method
     *
     * @param event form event
     */
    const radioOnChange = (event: FormEvent<HTMLInputElement>): void => {
        setRadioValue(value);
        onChange && onChange(event);
    };

    return (
        <CRadio
            {...props}
            value={value}
            disabled={parentDisabled || disabled}
            onChange={radioOnChange}
            checked={radioValues === value}
        />
    );
};

export default Radio;
