import type { ChangeEvent, FC } from 'react';
import React, { useEffect } from 'react';

import Overload from '../../../interfaces/Overload';
import { FormToggleData } from '../../../interfaces/Properties';

import { Checkbox as CCheckbox, ICheckbox as CheckboxProps } from '../../Checkbox/Checkbox';

interface ICheckbox extends Overload<CheckboxProps> {
    id: string;
}

/**
 * Formats Checkbox to be compatible with form
 *
 * @return Formatted Checkbox compatible with form
 */
const Checkbox: FC<ICheckbox> = ({
    parentProps: { register, setValue, clearErrors, errors },
    onChange,
    required,
    id,
    ...iCheckbox
}) => {
    // make sure that an id was provided
    useEffect(() => {
        if (!id) throw new Error('Must use Checkbox `id` prop when use in Form without Group');

        // register id
        register(id, { required: { message: 'This input is required.', value: required } });
    }, []);

    /**
     * Hanndles Checkbox changes
     *
     * @param event input event on change
     */
    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const {
            target: { checked },
        } = event;

        // execute on change if any
        onChange && onChange(event);

        // clear errors if there are any
        if (errors[id]?.message) clearErrors(id);

        const data: FormToggleData = { checked };
        setValue(id, data);
    };

    return (
        <CCheckbox
            {...iCheckbox}
            id={id}
            required={required}
            onChange={handleChange}
            invalid={Boolean(errors[id])}
            errorMessage={errors[id]?.message}
        />
    );
};

export default Checkbox;
