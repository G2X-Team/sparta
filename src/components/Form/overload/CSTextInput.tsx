import type { ChangeEvent, FC } from 'react';
import React, { useEffect, useState } from 'react';
import type { Overload } from '../../../interfaces/Overload';
import { FormTextData } from '../../../interfaces/Properties';
import { getFormError } from '../../../util/Form';

import { TextInput as CTextInput, ITextInput as TextInputProps } from '../../TextInput/TextInput';

interface ITextInput extends Overload<TextInputProps> {
    /** Name is required for text inputs inside of form, having none will throw */
    name: string;
}

/**
 * Client-Side fromatted text input for client side form
 *
 * @return formatted text input
 */
const TextInput: FC<ITextInput> = ({
    parentProps: {
        register,
        setValue,
        setError,
        clearErrors,
        errors,
        actionData,
        trigger,
        getValues,
    },
    name,
    required,
    label,
    validator,
    defaultValue,
    onChange,
    match,
    matchMessage = 'Text must match.',
    ...props
}) => {
    const [ignoreFieldError, setIgnoreFieldError] = useState(
        Boolean(!actionData?.fieldErrors?.[name])
    );

    // when using the client side form, we want to enforce names
    useEffect(() => {
        if (!name?.length) throw new Error('Must use TextInput `name` prop when using Form.');

        // register component manually and create validation requirements for submission
        register(name, {
            required: { value: required, message: `${label} is required.` },
            validate: {
                validator: (d: FormTextData): string | boolean => {
                    if (match?.length && d?.text !== getValues(match)?.text) return matchMessage;
                    if (required && d?.text?.length === 0) return `${label} is required.`;
                    if (!validator) return true; // if there isn't a validator, automatically pass

                    // get the error and return if truthy else pass
                    const error = validator(d);
                    return error?.length ? error : true;
                },
            },
        });

        // will trigger validation when there is a default value and is required on mount
        if (required && (actionData?.fields?.[name]?.length || defaultValue)) {
            setValue(name, { text: actionData?.fields?.[name] || defaultValue });
            trigger(name);
        }
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
            target: { value },
        } = event;

        // handle onChange
        if (onChange) onChange(event);

        // update value on record
        const textData: FormTextData = { text: value };
        setValue(name, textData);

        // handle requirements
        if (errors[name]?.type === 'required' && value.length) {
            clearErrors(name);
        } else if (!value.length && required) {
            setError(name, { type: 'required', message: `${label} is required.` });
        }

        // check for password matching
        if (match?.length) {
            if (getValues(match).text !== value) {
                setError(name, {
                    type: 'match',
                    message: matchMessage,
                });
            } else if (getValues(match).text === value) {
                clearErrors(name);
            }
        }

        // check if there is defined validator
        if (!validator) return;

        // check if there is an error
        const error = validator(textData);
        if (
            !error?.length &&
            (errors[name]?.type === 'validator' || errors[name]?.type === 'text-input')
        ) {
            // see if there was previously an error registered under this component
            if (errors[name]?.message?.length) clearErrors(name);
            return;
        }

        // check if we need to update errors
        if (error !== null && !errors[name]?.message?.length)
            setError(name, { type: 'text-input', message: error });
    };

    const error = getFormError(name, errors, actionData, ignoreFieldError);

    return (
        <CTextInput
            {...props}
            required={required}
            name={name}
            label={label}
            defaultValue={actionData?.fields?.[name] || defaultValue}
            onChange={handleChange}
            invalid={Boolean(error.length)}
            errorMessage={error}
        />
    );
};

export default TextInput;
