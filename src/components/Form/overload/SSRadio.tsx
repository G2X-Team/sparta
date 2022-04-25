import type { FC } from 'react';
import React from 'react';

import type { Overload } from '../../../interfaces/Overload';

import { Radio as CRadio, IRadio as RadioProps } from '../../Radio/Radio';

interface IRadio extends Overload<RadioProps> {
    id: string;
}

/**
 * Formats Radio to be compatible with form
 *
 * @return Formatted Radio compatible with form
 */
const Radio: FC<IRadio> = ({
    parentProps: {
        actionData: { fields, fieldErrors },
        groupInline,
    },
    defaultChecked,
    onChange,
    required,
    value,
    inline,
    id,
    ...props
}) => {
    const isChecked: boolean = fields?.[id];
    const errorMessage: string | undefined = fieldErrors?.[id] || '';

    return (
        <CRadio
            {...props}
            id={id}
            value={value}
            inline={groupInline || inline}
            required={required}
            defaultChecked={isChecked || defaultChecked}
            invalid={Boolean(errorMessage?.length)}
            errorMessage={errorMessage}
        />
    );
};

export default Radio;
