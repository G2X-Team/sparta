import type { FC, FormEvent, FormEventHandler, HTMLProps } from 'react';
import React from 'react';

import type {
    FormErrorHandler,
    FormSubmitHandler,
    FormActionData,
} from '../../../interfaces/Properties';
import type { RenderAll } from '../../../interfaces/Overload';
import FormatChildren from '../../../util/formatting/FormatChildren';
import { useForm } from 'react-hook-form';

import TextInput from '../overload/CSTextInput';
import Group from '../overload/CSGroup';
import Radio from '../overload/CSRadio';
import Switch from '../overload/CSSwitch';
import Checkbox from '../overload/CSCheckbox';
import { Grid } from '../../Grid/Grid';
import { Section } from '../../Section/Section';
import { View } from '../../View/View';

export interface ICSForm extends Omit<HTMLProps<HTMLFormElement>, 'onSubmit' | 'onError'> {
    /** Handles form submission with object derived from form */
    onSubmit?: FormSubmitHandler;
    /** Handles errors from form submission with error object */
    onError?: FormErrorHandler;
    /** Determines the type of form we want to render */
    actionData?: FormActionData;
    /** Determines whether user wants to use `DeepFormat` to find children */
    deep?: boolean;
}

/**
 * Formatted form to accept efficient live validation
 *
 * @return client side form
 */
const CSForm: FC<ICSForm> = ({
    onSubmit,
    onError,
    deep,
    children,
    actionData,
    method,
    ...props
}) => {
    // use the use form hook
    const {
        setError,
        clearErrors,
        setValue,
        register,
        handleSubmit,
        getValues,
        trigger,
        formState: { errors },
    } = useForm();

    /**
     * Formats and renders all children component
     *
     * @param childrenProp children property to be passed by render all
     * @param passthrough parent props to be passed through the original parents
     * @return formatted children
     */
    const renderAll: RenderAll = (childrenProp, passthrough): JSX.Element[] => {
        // overloaded components
        const overloaded = { TextInput, Group, Switch, Radio, Checkbox, Grid, Section, View };

        // parent props
        const parentProps = {
            setError,
            clearErrors,
            setValue,
            register,
            trigger,
            errors,
            getValues,
            renderAll,
            actionData,
            ...passthrough,
        };

        const formatted = new FormatChildren(childrenProp, overloaded, parentProps);

        return formatted.getAll();
    };

    /**
     * Handles form submission
     *
     * @param event handle form event
     */
    const handleSubmission: FormEventHandler<HTMLFormElement> = (
        event: FormEvent<HTMLFormElement>
    ): void => {
        // check if there is an onSubmit function
        if (!method?.length && onSubmit) {
            handleSubmit(onSubmit, onError)(event);
            return;
        }

        // don't submit form if there are errors
        if (Object.keys(errors).length) {
            event.preventDefault();
            if (onError) onError(errors);
            return;
        }

        // if there is a submit handler, submit the function
        if (onSubmit) onSubmit(undefined, event);
    };

    return (
        <form {...props} method={method} onSubmit={handleSubmission}>
            {renderAll(children)}
        </form>
    );
};

export default CSForm;
