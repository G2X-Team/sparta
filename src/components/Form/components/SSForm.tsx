import type { FC, HTMLAttributes } from 'react';
import React from 'react';

import { FormActionData } from '../../../interfaces/Properties';
import FormatChildren from '../../../util/FormatChildren';

import TextInput from '../overload/SSTextInput';
import Checkbox from '../overload/SSCheckbox';
import Radio from '../overload/SSRadio';
import Switch from '../overload/SSSwitch';
import Group from '../overload/SSGroup';

interface ISSForm extends HTMLAttributes<HTMLFormElement> {
    /** Object describing the behavior of the form */
    actionData?: FormActionData;
}

/**
 * Formats form to be used in serverside validation with remix
 *
 * @return Formatted Form component
 */
const SSForm: FC<ISSForm> = ({ actionData, children, ...iSSForm }) => {
    /**
     * Renders all formatted children component
     *
     *
     * @return formatted children
     */
    const renderAll = (): JSX.Element[] => {
        const parentProps = {
            children,
            actionData,
        };

        const formatted = new FormatChildren(parentProps, {
            TextInput,
            Group,
            Switch,
            Radio,
            Checkbox,
        });

        return formatted.getAll();
    };

    return <form {...iSSForm}>{renderAll()}</form>;
};

export default SSForm;
