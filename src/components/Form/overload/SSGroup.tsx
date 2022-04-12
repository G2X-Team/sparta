import type { FC } from 'react';
import React, { useEffect } from 'react';

import Overload from '../../../interfaces/Overload';

import type { IGroup as CIGroup } from '../../Group/Group';
import { Group as CGroup } from '../../Group/Group';

/**
 * Formatted Group, will serve as passthrough for parent props when in remix validation mode
 *
 * @return formatted group that complies with remix validation
 */
const Group: FC<Overload<CIGroup>> = ({
    parentProps: { actionData = { fields: {}, fieldErrors: {} } },
    type = 'input',
    children,
    defaultChecked,
    name,
    required,
    ...props
}) => {
    useEffect(() => {
        if (type === 'organization') return;

        if (!name?.length) throw new Error('Must use Group `name` prop when using Form.');
    });

    const errorMessage = actionData?.fieldErrors ? actionData?.fieldErrors[name] : undefined;
    const invalid: boolean = errorMessage?.length;

    return (
        <CGroup
            {...props}
            name={name}
            defaultValue={actionData.fields?.[name] || defaultChecked}
            invalid={invalid}
            errorMessage={errorMessage}
        >
            {children}
        </CGroup>
    );
};

export default Group;
