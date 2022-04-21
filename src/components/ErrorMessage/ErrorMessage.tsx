import type { FC, HTMLAttributes, ReactNode } from 'react';
import React from 'react';
import './ErrorMessage.css';

import type { Apollo } from '../../interfaces/Apollo';

import { Text } from '../Text/Text';
import { gaurdApolloName } from '../../util/ErrorHandling';

export interface IErrorMessage extends HTMLAttributes<HTMLDivElement>, Apollo<'ErrorMessage'> {
    /** Error message id */
    id: string;
    /** Must have an error message */
    children: ReactNode;
    /** Determines whether the error message is active */
    active?: boolean;
}

/**
 * Apollo's error message component, used to display error messages
 *
 * @return error message components
 */
export const ErrorMessage: FC<IErrorMessage> = ({
    'data-apollo': dataApollo = 'ErrorMessage',
    active = false,
    className = '',
    children,
    ...props
}) => {
    gaurdApolloName({ 'data-apollo': dataApollo }, 'ErrorMessage');

    return active ? (
        <div
            {...props}
            role="alert"
            data-apollo={dataApollo}
            className={`apollo-component-library-error-message-component ${className}`}
        >
            <Text color="#c90000">{children}</Text>
        </div>
    ) : null;
};
