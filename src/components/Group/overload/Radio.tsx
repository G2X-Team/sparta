import type { ChangeEvent, FC } from 'react';
import React from 'react';
import { IRadio, Radio as CRadio } from '../../Radio/Radio';
import Overload from '../../../interfaces/Overload';

/**
 * Overloaded Radio formatted to update group value on change
 *
 * @return Formatted Radio
 */
const Radio: FC<Overload<IRadio>> = ({
    parentProps: { disabled: parentDisabled, onChange: groupOnChange, name, inline: parentInline },
    onChange,
    disabled,
    value,
    inline,
    ...iRadio
}: Overload<IRadio>): JSX.Element => {
    /**
     * Updates value and fires original onChange method
     *
     * @param event form event
     */
    const radioOnChange = (event: ChangeEvent<HTMLInputElement>): void => {
        // execute group on change method if any
        groupOnChange && groupOnChange(event);

        // execute standalone on change if any
        onChange && onChange(event);
    };

    return (
        <CRadio
            {...iRadio}
            name={name}
            value={value}
            inline={parentInline}
            disabled={parentDisabled || disabled}
            onChange={radioOnChange}
        />
    );
};

export default Radio;
