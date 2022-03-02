import type { ChangeEvent, FC } from 'react';
import React, { useEffect } from 'react';

import Overload from '../../../interfaces/Overload';
import { FormToggleData } from '../../../interfaces/Properties';

import { Radio as CRadio, IRadio as RadioProps } from '../../Radio/Radio';

interface IRadio extends Overload<RadioProps> {
    id: string;
}

/**
 * Formats radio to be compatible with form
 *
 * @return Formatted Radio compatible with form
 */
const Radio: FC<IRadio> = ({
    parentProps: { register, setValue, clearErrors, errors },
    onChange,
    required,
    id,
    ...iRadio
}) => {
    // make sure that an id was provided
    useEffect(() => {
        if (!id) throw new Error('Must use Radio `id` prop when use in Form without Group');

        // register id
        register(id, { required: { message: 'This input is required.', value: required } });
    }, []);

    /**
     * Hanndles radio changes
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
        <CRadio
            {...iRadio}
            id={id}
            required={required}
            onChange={handleChange}
            invalid={Boolean(errors[id])}
            errorMessage={errors[id]?.message}
        />
    );
};

export default Radio;
