import type { FC, HTMLAttributes } from 'react';
import React from 'react';

import FormatChildren from '../../../util/formatting/FormatChildren';
import type { FormActionData } from '../../../interfaces/Properties';
import type { RenderAll } from '../../../interfaces/Overload';

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
const SSForm: FC<ISSForm> = ({ actionData, children, ...props }) => {
    /**
     * Renders all formatted children component
     *
     *
     * @return formatted children
     */
    const renderAll: RenderAll = () => {
        // overloaded components
        const overloaded = { TextInput, Checkbox, Radio, Switch, Group };

        const formatted = new FormatChildren(children, overloaded, { actionData });

        return formatted.getAll();
    };

    return <form {...props}>{renderAll()}</form>;
};

export default SSForm;
