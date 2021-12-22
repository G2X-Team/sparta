import React from 'react';
import Overload from '../../../interfaces/Overload';
import { Props as TextInputProps, TextInput as CTextInput } from '../../TextInput/TextInput';

interface Props extends Overload<TextInputProps> {
    /** name is required for text input nested in form */
    name: string;
}

/**
 * Overloaded TextInput formatted to update form value
 *
 * @return Formatted Text Input
 */
const TextInput: React.FC<Props> = ({
    parentProps: {
        parentRequired,
        setParentRequired,
        setFormValue,
        setValidMap,
        validMap,
        formValue,
        errorMessages,
        setErrorMessages,
    },
    validator,
    required,
    name,
    onChange,
    ...props
}: Props): JSX.Element => {
    // add to required map if required
    if (required && !parentRequired[name]) {
        setParentRequired({
            ...parentRequired,
            [name]: `${name} is a required field and cannot be empty.`,
        });
    }

    /**
     * Modifies on change to keep track of text input validity
     *
     * @param event form event
     */
    const modifiedOnChange = (event: React.FormEvent<HTMLInputElement>): void => {
        // extract input value from event
        const {
            currentTarget: { value: inputValue },
        } = event;
        const trimmedValue = inputValue.trim();

        // update form value
        setFormValue({
            ...formValue,
            [name]: inputValue.trim(),
        });

        const validity = required ? trimmedValue.length > 0 : true;
        setValidMap({ ...validMap, [name]: validity });

        // check if there is a validator
        if (validator) {
            // get validator values
            const error = validator(inputValue);
            setValidMap({ ...validMap, [name]: validity && !error });
            if (error || !trimmedValue.length) {
                errorMessages[name] = trimmedValue.length ? error : `${name} is a required value`;
            } else delete errorMessages[name];

            // set modified state
            setErrorMessages(errorMessages);
        }

        // execute on change if it exists
        onChange && onChange(event);
    };

    return (
        <CTextInput
            {...props}
            required={required}
            valid={validMap[name]}
            onChange={modifiedOnChange}
        />
    );
};

export default TextInput;
