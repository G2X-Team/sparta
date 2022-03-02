import type { FC } from 'react';
import React from 'react';

import Overload from '../../../interfaces/Overload';

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
        groupName,
        actionData: { fields, fieldErrors },
        groupInline,
    },
    onChange,
    required,
    name,
    value,
    inline,
    id,
    ...iRadio
}) => {
    const isChecked: boolean = fields
        ? groupName?.length
            ? fields[groupName] === value
            : fields[id]
        : false;

    const errorMessage: string | undefined = fieldErrors ? fieldErrors[id] : undefined;

    return (
        <CRadio
            {...iRadio}
            id={id}
            value={value}
            inline={groupInline || inline}
            name={groupName}
            required={required}
            defaultChecked={isChecked}
            invalid={Boolean(errorMessage?.length)}
            errorMessage={errorMessage}
        />
    );
};

export default Radio;
