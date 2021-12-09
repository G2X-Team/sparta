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

const Template: Story<Props> = (args) => <Alert {...args} />;

export const AlertTypes = (): JSX.Element => (
    <React.Fragment>
        <Alert AlertType={0}>
            <Text bold>Error</Text>
        </Alert>
        <Alert AlertType={1}>
            <Text bold>Warning</Text>
        </Alert>
        <Alert AlertType={2}>
            <Text bold>Info</Text>
        </Alert>
        <Alert AlertType={3}>
            <Text bold>Success</Text>
        </Alert>
    </React.Fragment>
);
