import type { FC, FormEvent, FormEventHandler, HTMLAttributes, ReactNode } from 'react';
import React from 'react';

import type { FormErrorHandler, FormSubmitHandler } from '../../../interfaces/Properties';
import FormatChildren from '../../../util/FormatChildren';
import { useForm } from 'react-hook-form';

import TextInput from '../overload/CSTextInput';
import Group from '../overload/CSGroup';
import Radio from '../overload/CSRadio';
import Switch from '../overload/CSSwitch';
import Checkbox from '../overload/CSCheckbox';

export interface Props extends Omit<HTMLAttributes<HTMLFormElement>, 'onSubmit' | 'onError'> {
    /** Handles form submission with object derived from form */
    onSubmit?: FormSubmitHandler;
    /** Handles errors from form submission with error object */
    onError?: FormErrorHandler;
}

/**
 * Formatted form to accept efficient live validation
 *
 * @return client side form
 */
const CSForm: FC<Props> = ({ onSubmit, onError, children, ...props }) => {
    // use the use form hoook
    const {
        setError,
        clearErrors,
        setValue,
        register,
        handleSubmit,
        getValues,
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
            errors,
            getValues,
            renderAll,
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
        if (!onSubmit) return;
        handleSubmit(onSubmit, onError)(event);
    };

    return (
        <form {...props} onSubmit={handleSubmission}>
            {renderAll(children)}
        </form>
    );
};

export default CSForm;
