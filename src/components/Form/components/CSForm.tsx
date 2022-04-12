import type { FC, FormEvent, FormEventHandler, HTMLProps, ReactNode } from 'react';
import React from 'react';

import type {
    FormErrorHandler,
    FormSubmitHandler,
    FormActionData,
} from '../../../interfaces/Properties';
import FormatChildren from '../../../util/FormatChildren';
import { useForm } from 'react-hook-form';

import TextInput from '../overload/CSTextInput';
import Group from '../overload/CSGroup';
import Radio from '../overload/CSRadio';
import Switch from '../overload/CSSwitch';
import Checkbox from '../overload/CSCheckbox';

export interface ICSForm extends Omit<HTMLProps<HTMLFormElement>, 'onSubmit' | 'onError'> {
    /** Handles form submission with object derived from form */
    onSubmit?: FormSubmitHandler;
    /** Handles errors from form submission with error object */
    onError?: FormErrorHandler;
    /** Determines the type of form we want to render */
    actionData?: FormActionData;
}

/**
 * Formatted form to accept efficient live validation
 *
 * @return client side form
 */
const CSForm: FC<ICSForm> = ({ onSubmit, onError, children, actionData, method, ...props }) => {
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
    const renderAll = (
        childrenProp: ReactNode,
        passthrough: { [key: string]: boolean | number | string } = {}
    ): JSX.Element[] => {
        const parentProps = {
            children: childrenProp,
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

        const formatted = new FormatChildren(parentProps, {
            TextInput,
            Group,
            Switch,
            Radio,
            Checkbox,
        });

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
        if (!actionData && onSubmit) {
            handleSubmit(onSubmit, onError)(event);
            return;
        }

        // don't submit form if there are errors
        if (errors.length) {
            event.preventDefault();
            if (onError) onError(errors);
            return;
        }

        // if there is a submit handler, submit the function
        if (onSubmit) onSubmit(undefined, event);
    };

    return (
        <form {...props} onSubmit={handleSubmission}>
            {renderAll(children)}
        </form>
    );
};

export default CSForm;
