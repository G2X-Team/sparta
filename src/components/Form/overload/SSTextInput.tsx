import type { FC } from 'react';
import React from 'react';

import type Overload from '../../../interfaces/Overload';

import type { ITextInput as TextInputProps } from '../../TextInput/TextInput';
import { TextInput as CTextInput } from '../../TextInput/TextInput';

interface ITextInput extends Overload<TextInputProps> {
    name: string;
}

/**
 * Formats text input to accept server-side remix validation
 *
 * @return formatted text input for remix validation
 */
const SSTextInput: FC<ITextInput> = ({ name, parentProps: { actionData }, ...iTextInput }) => {
    const defaultValue = actionData?.fields ? actionData?.fields[name] : undefined;

    const errorMessage = actionData?.fieldErrors ? actionData?.fieldErrors[name] : undefined;

    return (
        <CTextInput
            {...iTextInput}
            name={name}
            defaultValue={defaultValue}
            invalid={Boolean(errorMessage?.length)}
            errorMessage={errorMessage}
        />
    );
};

export default SSTextInput;
