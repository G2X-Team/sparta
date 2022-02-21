import type { ChangeEvent, FC } from 'react';
import React, { useEffect } from 'react';
import Overload from '../../../interfaces/Overload';

import { TextInput as CTextInput, Props as TextInputProps } from '../../TextInput/TextInput';

interface Props extends Overload<TextInputProps> {
    /** Name is required for text inputs inside of form, having none will throw */
    name: string;
}

/**
 * Client-Side fromatted text input for client side form
 *
 * @return formatted text input
 */
const TextInput: FC<Props> = ({
    parentProps: { register, setValue, setError, clearErrors, errors },
    name,
    required,
    label,
    validator,
    onChange,
    ...props
}) => {
    // when using the client side form, we want to enforce names
    useEffect(() => {
        if (!name?.length) throw new Error('Must use TextInput `name` prop when using Form.');

        // register component manually and create validation requirements for submission
        register(name, {
            required: { value: required, message: `${label} is required.` },
            validate: {
                validator: (v: string): string | boolean => {
                    if (!validator) return true; // if there isn't a validator, automatically pass

                    // get the error and return if truthy else pass
                    const error = validator(v);
                    return error?.length ? error : true;
                },
            },
        });
    });

    /**
     * Method that will handle on change validation while also allowing user-fed onChange callback
     *
     * @param event form event containing value
     */
    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        // extract value
        const {
            target: { value },
        } = event;

        // handle onChange
        onChange && onChange(event);

        // update value on record
        setValue(name, value);

        // check for required errors and update on input
        if (errors[name]?.type === 'required' && value.length) {
            clearErrors(name);
        }

        // check if there is defined validator
        if (!validator) return;
        const inputName = name || '';

        // check if there is an error
        const error = validator(value);
        if (!error?.length) {
            // see if there was previously an error registered under this component
            if (errors[inputName]?.message?.length) clearErrors(inputName);
            return;
        }

        // check if we need to update errors
        if (!errors[inputName]?.message?.length)
            setError(inputName, { type: 'text-input', message: error });
    };

    return (
        <CTextInput
            {...props}
            required={required}
            name={name}
            label={label}
            onChange={handleChange}
            invalid={Boolean(errors[name])}
            errorMessage={String(errors[name]?.message)}
        />
    );
};

export default TextInput;
