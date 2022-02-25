import type { FC } from 'react';
import React from 'react';

import type Overload from '../../../interfaces/Overload';

import type { Props as TextInputProps } from '../../TextInput/TextInput';
import { TextInput as CTextInput } from '../../TextInput/TextInput';

interface Props extends Overload<TextInputProps> {
    name: string;
}

/**
 * Formats text input to accept server-side remix validation
 *
 * @return formatted text input for remix validation
 */
const SSTextInput: FC<Props> = ({ name, parentProps: { actionData }, ...props }) => {
    console.log(actionData);
    return (
        <CTextInput
            {...props}
            defaultValue={actionData?.fields[name]}
            invalid={Boolean(actionData?.fieldErrors ? actionData?.fieldErrors[name] : false)}
            errorMessage={actionData?.fieldErrors ? actionData?.fieldErrors[name] : undefined}
        />
    );
};

export default SSTextInput;
