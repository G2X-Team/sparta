import type { FC, HTMLProps } from 'react';
import React from 'react';

import type {
    FormActionData,
    FormErrorHandler,
    FormSubmitHandler,
} from '../../interfaces/Properties';
import CSForm from './components/CSForm';
import SSForm from './components/SSForm';

export interface IForm extends Omit<HTMLProps<HTMLFormElement>, 'onSubmit' | 'onError'> {
    /** Handles form submission with object derived from form */
    onSubmit?: FormSubmitHandler;
    /** Handles errors from form submission with error object */
    onError?: FormErrorHandler;
    /** Determines the type of form we want to render */
    type?: 'client' | 'remix';
    /** When in remix mode, this will control all the form inputs */
    actionData?: FormActionData;
    /**
     * By setting this property to `true` the `Form` component will search through the entire
     * DOM tree for any compatible input components. This is useful to use when you have
     * a form with deeply nested inputs that require live validation, or there are inputs that
     * are not direct children of the form.
     *
     * > **Note:** Using this kind of form will have a slight performance impact on the initial
     * > render.
     */
    deep?: boolean;
}

/**
 * Sparta form component that allows for client side and server side validation
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
                const { onSubmit, onError, deep, ...rest } = props;
                return <SSForm {...rest} />;
            default:
                return <CSForm {...props} />;
        }
    };

    return renderForm();
};
