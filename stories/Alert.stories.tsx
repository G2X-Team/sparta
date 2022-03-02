import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Alert, IALert } from '../src/components/Alert/Alert';
import { Text } from '../src';

const meta: Meta = {
    title: 'Layout/Alert',
    component: Alert,
    args: {
        children: 'This is an alert component',
    },
};

export default meta;

/**
 * Template Alert
 *
 * @param args storybook arguments
 * @return template Alert component
 */
export const AlertTypes: Story<IALert> = (args): JSX.Element => (
    <React.Fragment>
        <Alert {...args}>
            <Text bold>{args.children}</Text>
        </Alert>
    </React.Fragment>
);
