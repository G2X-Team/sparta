import type { ChangeEvent, FC, ReactNode } from 'react';
import React, { useEffect } from 'react';

import Overload from '../../../interfaces/Overload';
import { FormGroupData } from '../../../interfaces/Properties';

import { Group as CGroup, Props as GroupProps } from '../../Group/Group';

interface Props extends Overload<GroupProps> {
    /** Name is required for text inputs inside of form, having none will throw */
    name: string;
}

/**
 * Formats group to accept validation
 *
 * @return formatted group component
 */
const Group: FC<Props> = ({
    parentProps: { register, setError, setValue, clearErrors, errors, getValues, renderAll },
    children,
    name,
    required,
    validator,
    label,
    onChange,
    type,
    ...props
}) => {
    useEffect(() => {
        if (!name?.length) throw new Error('Must use Group `name` prop when using Form.');

        if (type === 'organization') return;
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
        // extract value
        const {
            target: { value, type, checked },
        } = event;

        // execute original group on change
        onChange && onChange(event);

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
        if (type === 'input') return children;

        return renderAll(children);
    };

    return (
        <CGroup
            {...props}
            required={required}
            type={type}
            label={label}
            onChange={handleChange}
            name={name}
            invalid={Boolean(errors[name])}
            errorMessage={errors[name] ? errors[name]?.message : undefined}
        >
            {renderGroup()}
        </CGroup>
    );
};

export default Group;
