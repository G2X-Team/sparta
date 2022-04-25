import type { ChangeEvent, FC, ReactNode } from 'react';
import React, { useEffect, useState } from 'react';

import type { Overload } from '../../../interfaces/Overload';
import { FormGroupData } from '../../../interfaces/Properties';
import { getFormError } from '../../../util/Form';

import { Group as CGroup, IGroup as GroupProps } from '../../Group/Group';

interface IGroup extends Overload<GroupProps> {
    /** Name is required for text inputs inside of form, having none will throw */
    name: string;
}

/**
 * Formats group to accept validation
 *
 * @return formatted group component
 */
const Group: FC<IGroup> = ({
    parentProps: {
        register,
        setError,
        setValue,
        clearErrors,
        errors,
        getValues,
        renderAll,
        actionData,
    },
    children,
    name,
    required,
    validator,
    label,
    onChange,
    defaultValue,
    type,
    ...props
}) => {
    const [ignoreFieldError, setIgnoreFieldError] = useState(
        Boolean(!actionData?.fieldErrors?.[name])
    );

    useEffect(() => {
        if (type === 'organization') return;

        if (!name?.length) throw new Error('Must use Group `name` prop when using Form.');

        register(name, {
            required: { value: required, message: `"${label}" is required.` },
            validate: {
                validator: (d: FormGroupData): string | boolean => {
                    if (!validator) return true; // if there isn't a validator, automatically pass

                    // get the error and return if truthy else pass
                    const error = validator(d);
                    return error?.length ? error : true;
                },
                required: (d: FormGroupData): string | boolean => {
                    if (!required) return true;
                    if (!d.checkbox) return true;

                    return required && !d.checkbox.length ? `"${label}" is required.` : true;
                },
            },
        });
    }, []);

    /**
     * Method that will handle on change validation while also allowing user-fed onChange callback
     *
     * @param event form event containing value
     */
    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        if (!ignoreFieldError) setIgnoreFieldError(true);

        // extract value
        const {
            target: { value, type, checked },
        } = event;

        // execute original group on change
        if (onChange) onChange(event);

        // if it is an organiation, don't do anything else
        if (type === 'organization') return;

        // define a variable to store group data
        const groupData: FormGroupData = {};

        // update accordingly
        if (event.target.type === 'radio') {
            groupData.radio = value;
            // update value on record
            setValue(name, groupData);
        } else if (type === 'checkbox') {
            const data = getValues(name);
            let values = data?.checkbox || [];

            if (checked) {
                values.push(value);
            } else {
                values = values.filter((v: string) => v != value);
            }

            groupData.checkbox = values;
            setValue(name, groupData);
        }

        // check for required errors and update on input
        if (errors[name]?.type === 'required' && value.length) {
            clearErrors(name);
        }

        // check if there is defined validator
        if (!validator) return;

        // check if there is an error
        const error = validator(groupData);
        if (!error?.length) {
            // see if there was previously an error registered under this component
            if (errors[name]?.message?.length) clearErrors(name);
            return;
        }

        // check if we need to update errors
        if (!errors[name]?.message?.length) setError(name, { type, message: error });
    };

    /**
     * Renders appropriate group based on type
     *
     * @return Appropriate group format
     */
    const renderGroup = (): JSX.Element[] | ReactNode => {
        if (type === 'input' || !renderAll) return children;

        return renderAll(children);
    };

    const error = getFormError(name, errors, actionData, ignoreFieldError);

    return (
        <CGroup
            {...props}
            required={required}
            type={type}
            label={label}
            onChange={handleChange}
            name={name}
            defaultValue={actionData?.fields?.[name] || defaultValue}
            invalid={Boolean(error.length)}
            errorMessage={error}
        >
            {renderGroup()}
        </CGroup>
    );
};

export default Group;
