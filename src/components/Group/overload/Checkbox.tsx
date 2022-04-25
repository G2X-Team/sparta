import type { ChangeEvent, FC } from 'react';
import React from 'react';
import { ICheckbox, Checkbox as CCheckbox } from '../../Checkbox/Checkbox';
import type { Overload } from '../../../interfaces/Overload';

/**
 * Overloaded Checkbox formatted to update group value on change
 *
 * @return Formatted Checkbox
 */
const Checkbox: FC<Overload<ICheckbox>> = ({
    parentProps: {
        name,
        onChange: groupOnChange,
        disabled: parentDisabled,
        inline: parentInline,
        defaultValue: groupDefaultValue,
    },
    defaultChecked,
    onChange,
    disabled,
    value,
    inline,
    ...props
}: Overload<ICheckbox>): JSX.Element => {
    /**
     * Updates value and fires original onChange method
     *
     * @param event input event
     */
    const checkboxOnChange = (event: ChangeEvent<HTMLInputElement>): void => {
        // execute group on change if any
        if (groupOnChange) groupOnChange(event);

        // run the onChange method if it exists
        if (onChange) onChange(event);
    };

    /**
     * Gets the default value of the checkbox
     *
     * @return default checkbox value
     */
    const getDefaultValue = (): boolean => {
        if (
            !groupDefaultValue ||
            typeof groupDefaultValue !== 'object' ||
            !Array.isArray(groupDefaultValue)
        )
            return false;

        return Boolean(groupDefaultValue.filter((v: string) => v === value).length);
    };

    return (
        <CCheckbox
            {...props}
            value={value}
            defaultChecked={getDefaultValue() || defaultChecked}
            name={name}
            inline={parentInline}
            disabled={parentDisabled || disabled}
            onChange={checkboxOnChange}
        />
    );
};

export default Checkbox;
