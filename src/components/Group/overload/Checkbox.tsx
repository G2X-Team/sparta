import type { ChangeEvent, FC } from 'react';
import React from 'react';
import { ICheckbox, Checkbox as CCheckbox } from '../../Checkbox/Checkbox';
import Overload from '../../../interfaces/Overload';

/**
 * Overloaded Checkbox formatted to update group value on change
 *
 * @return Formatted Checkbox
 */
const Checkbox: FC<Overload<ICheckbox>> = ({
    parentProps: { name, onChange: groupOnChange, disabled: parentDisabled, inline: parentInline },
    onChange,
    disabled,
    value,
    inline,
    ...iCheckbox
}: Overload<ICheckbox>): JSX.Element => {
    /**
     * Updates value and fires original onChange method
     *
     * @param event input event
     */
    const checkboxOnChange = (event: ChangeEvent<HTMLInputElement>): void => {
        // execute group on change if any
        groupOnChange && groupOnChange(event);

        // run the onChange method if it exists
        onChange && onChange(event);
    };

    return (
        <CCheckbox
            {...iCheckbox}
            value={value}
            name={name}
            inline={parentInline}
            disabled={parentDisabled || disabled}
            onChange={checkboxOnChange}
        />
    );
};

export default Checkbox;
