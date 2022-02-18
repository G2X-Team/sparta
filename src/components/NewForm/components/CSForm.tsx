import type { FC, FormEvent, FormEventHandler, HTMLAttributes } from 'react';
import React from 'react';

import type { CSFormSubmitErrorHandler, CSFormSubmitHandler } from '../../../interfaces/Properties';
import FormatChildren from '../../../util/FormatChildren';
import { useForm } from 'react-hook-form';

import TextInput from '../overload/CSTextInput';

export interface Props extends Omit<HTMLAttributes<HTMLFormElement>, 'onSubmit' | 'onError'> {
    /** Handles form submission with object derived from form */
    onSubmit?: CSFormSubmitHandler;
    /** Handles errors from form submission with error object */
    onError?: CSFormSubmitErrorHandler;
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
        formState: { errors },
    } = useForm();

    console.log('re-render');

    /**
     * Formats and renders all children component
     *
     * @return formatted children
     */
    const renderAll = (): JSX.Element[] => {
        const parentProps = {
            children,
            setError,
            clearErrors,
            setValue,
            register,
            errors,
        };

        const formatted = new FormatChildren(parentProps, { TextInput });
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
            {renderAll()}
        </form>
    );
};

export default CSForm;
