import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Alert, Props } from '../src/components/Alert/Alert';
import { Text } from '../src';

const meta: Meta = {
    title: 'Layout/Alert',
    component: Alert,
    argTypes: {
        children: {
            defaultValue: 'This is a alert component',
        },
    },
};

export default meta;

/**
 * Template Alert
 *
 * @param args storybook arguments
 * @return template Alert component
 */
export const AlertTypes = (): JSX.Element => (
    <React.Fragment>
        <Alert type="danger">
            <Text bold>Error</Text>
        </Alert>
        <Alert type="warning">
            <Text bold>Warning</Text>
        </Alert>
        <Alert type="info">
            <Text bold>Info</Text>
        </Alert>
        <Alert type="success">
            <Text bold>Success</Text>
        </Alert>
    </React.Fragment>
);
