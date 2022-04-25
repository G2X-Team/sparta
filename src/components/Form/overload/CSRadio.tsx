import type { ChangeEvent, FC } from 'react';
import React, { useEffect, useState } from 'react';

import type { Overload } from '../../../interfaces/Overload';
import { FormToggleData } from '../../../interfaces/Properties';
import { getFormError } from '../../../util/Form';

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
    parentProps: { register, setValue, clearErrors, errors, actionData },
    onChange,
    required,
    defaultChecked,
    id,
    ...props
}) => {
    const [ignoreFieldError, setIgnoreFieldError] = useState(
        Boolean(!actionData?.fieldErrors?.[id])
    );

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
        if (!ignoreFieldError) setIgnoreFieldError(true);
        const {
            target: { checked },
        } = event;

        // execute on change if any
        if (onChange) onChange(event);

        // clear errors if there are any
        if (errors[id]?.message) clearErrors(id);

        const data: FormToggleData = { checked };
        setValue(id, data);
    };

    // get error if any
    const error = getFormError(id, errors, actionData, ignoreFieldError);

    return (
        <CRadio
            {...props}
            id={id}
            required={required}
            defaultChecked={actionData?.fields?.[id] || defaultChecked}
            onChange={handleChange}
            invalid={Boolean(error?.length)}
            errorMessage={error}
        />
    );
};

export default Radio;
