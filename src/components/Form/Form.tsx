import type { FC, HTMLAttributes } from 'react';
import React from 'react';

import type { CSFormSubmitErrorHandler, CSFormSubmitHandler } from '../../interfaces/Properties';
import CSForm from './components/CSForm';

export interface Props extends Omit<HTMLAttributes<HTMLFormElement>, 'onSubmit' | 'onError'> {
    /** Handles form submission with object derived from form */
    onSubmit?: CSFormSubmitHandler;
    /** Handles errors from form submission with error object */
    onError?: CSFormSubmitErrorHandler;
    /** Determines the type of form we want to render */
    type?: 'client' | 'remix';
}
/**
 * Apollo form component that allows for client side and server side validation
 *
 * @return form Component based on type
 */
export const Form: FC<Props> = ({ type = 'client', ...props }) => {
    /**
     * Based on the type, this method will choose what form to render
     *
     * @return correspondent form
     */
    const renderForm = (): JSX.Element => {
        switch (type) {
            default:
                return <CSForm {...props} />;
        }
    };

    return renderForm();
};
