import type { FC, HTMLAttributes, ReactNode } from 'react';
import React from 'react';
import './ErrorMessage.css';

import type { Sparta } from '../../interfaces/Sparta';

import { Text } from '../Text/Text';
import { gaurdApolloName } from '../../util/ErrorHandling';

export interface IErrorMessage extends HTMLAttributes<HTMLDivElement>, Sparta<'ErrorMessage'> {
    /** Error message id */
    id: string;
    /** Must have an error message */
    children: ReactNode;
    /** Determines whether the error message is active */
    active?: boolean;
}

/**
 * Sparta's error message component, used to display error messages
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
        <div {...props} role="alert" data-apollo={dataApollo} className={`apollo ${className}`}>
            <Text color="#F04438" style={{ fontSize: 14 }}>
                {children}
            </Text>
        </div>
    ) : null;
};
