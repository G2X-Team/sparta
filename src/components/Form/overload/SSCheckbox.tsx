import type { FC } from 'react';
import React from 'react';

import Overload from '../../../interfaces/Overload';

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
    parentProps: {
        groupName,
        actionData: { fields, fieldErrors },
        groupInline,
    },
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
        <CCheckbox
            {...props}
            id={id}
            inline={groupInline || inline}
            value={value}
            name={groupName}
            required={required}
            defaultChecked={isChecked}
            invalid={Boolean(errorMessage?.length)}
            errorMessage={errorMessage}
        />
    );
};

export default Checkbox;
