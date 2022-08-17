import type { FC } from 'react';
import React, { forwardRef } from 'react';

import type { Overload } from '../../../interfaces/Overload';

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
const SSTextInput: FC<ITextInput> = forwardRef(function TextInput(
    { name, parentProps: { actionData }, ...props }: ITextInput,
    ref
) {
    const defaultValue = actionData?.fields ? actionData?.fields[name] : undefined;

    const errorMessage = actionData?.fieldErrors ? actionData?.fieldErrors[name] : undefined;

    return (
        <CTextInput
            {...props}
            ref={ref}
            name={name}
            defaultValue={defaultValue}
            invalid={Boolean(errorMessage?.length)}
            errorMessage={errorMessage}
        />
    );
});

export default SSTextInput;
