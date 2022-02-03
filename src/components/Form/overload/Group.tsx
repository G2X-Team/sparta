import type { FC } from 'react';
import React, { useEffect } from 'react';
import Overload from '../../../interfaces/Overload';
import { Props as GroupProps, Group as CGroup } from '../../Group/Group';

interface Props extends Overload<GroupProps> {
    /** Name required in group nested in form */
    name: string;
}

/**
 * Overloaded Group formatted to update form value
 *
 * @return Formatted Group
 */
const Group: FC<Props> = ({
    parentProps: {
        parentRequired,
        setParentRequired,
        validMap,
        setValidMap,
        errorMessages,
        formValue,
        setFormValue,
    },
    validator,
    children,
    onChange,
    required,
    name,
    ...props
}: Props): JSX.Element => {
    // on mount determine whether component is required
    useEffect(() => {
        // set required if applicable
        if (required && !parentRequired[name]) {
            setParentRequired({
                ...parentRequired,
                [name]: `${name} is required, please select an option.`,
            });
        }
    });

    /**
     * Modifies group's on change callback to modify the form value
     *
     * @param value group value
     */
    const modifiedOnChange = (value: string | string[]): void => {
        // check that its valid
        if (validator) {
            const validity = required && value.length;
            const error = validator(value);
            setValidMap({ ...validMap, [name]: validity && !error });

            if (error) errorMessages[name] = error;
            else delete errorMessages[name];
        } else {
            setValidMap({ ...validMap, [name]: true });
        }

        // update form value
        setFormValue({ ...formValue, [name]: value });
        onChange && onChange(value);
    };

    return (
        <CGroup name={name} onChange={modifiedOnChange} {...props}>
            {children}
        </CGroup>
    );
};

export default Group;
