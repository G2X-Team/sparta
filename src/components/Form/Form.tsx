import type { FC, HTMLAttributes } from 'react';
import React from 'react';

import type {
    FormActionData,
    FormErrorHandler,
    FormSubmitHandler,
} from '../../interfaces/Properties';
import CSForm from './components/CSForm';
import SSForm from './components/SSForm';

export interface IForm extends Omit<HTMLAttributes<HTMLFormElement>, 'onSubmit' | 'onError'> {
    /** Handles form submission with object derived from form */
    onSubmit?: FormSubmitHandler;
    /** Handles errors from form submission with error object */
    onError?: FormErrorHandler;
    /** Determines the type of form we want to render */
    type?: 'client' | 'remix';
    /** When in remix mode, this will control all the form inputs */
    actionData?: FormActionData;
}
/**
 * Apollo form component that allows for client side and server side validation
 *
 * @return form Component based on type
 */
export const Form: FC<IForm> = ({ type = 'client', ...props }) => {
    /**
     * Based on the type, this method will choose what form to render
     *
     * @return correspondent form
     */
    const renderForm = (): JSX.Element => {
        switch (type) {
            case 'remix':
                const { onSubmit, onError, ...rest } = props;
                return <SSForm {...rest} />;
            default:
                return <CSForm {...props} />;
        }
    };

    return renderForm();
};
