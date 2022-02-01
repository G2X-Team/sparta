import React, { FormEvent } from 'react';
import type { FC } from 'react';
import { Props, Checkbox as CCheckbox } from '../../Checkbox/Checkbox';
import Overload from '../../../interfaces/Overload';

/**
 * Overloaded Checkbox formatted to update group value on change
 *
 * @return Formatted Checkbox
 */
const Checkbox: FC<Overload<Props>> = ({
    parentProps: { parentDisabled, checkboxValues, setCheckboxValue, isChecked, updateChecked },
    onChange,
    disabled,
    value,
    ...props
}: Overload<Props>): JSX.Element => {
    /**
     * Updates value and fires original onChange method
     *
     * @param event input event
     */
    const checkboxOnChange = (event: FormEvent<HTMLInputElement>): void => {
        // add to values if it is checked, remove it if it isn't
        if (isChecked[value]) {
            isChecked[value] = false;
            setCheckboxValue(checkboxValues.filter((cvalue: string) => cvalue !== value));
        } else {
            isChecked[value] = true;
            setCheckboxValue([...checkboxValues, value]);
        }

        // update checked checkboxes
        updateChecked({ ...checkboxValues, [value]: isChecked });

        // run the onChange method if it exists
        onChange && onChange(event);
    };

    return (
        <CCheckbox
            {...props}
            value={value}
            disabled={parentDisabled || disabled}
            onChange={checkboxOnChange}
            checked={checkboxValues[value]}
        />
    );
};

export default Checkbox;
