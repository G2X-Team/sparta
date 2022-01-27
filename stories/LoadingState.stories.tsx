import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react';
import { LoadingState, Props } from '../src/components/LoadingState/LoadingState';
import { Button, Text } from '../src';

const meta: Meta = {
    title: 'Layout/LoadingState',
    component: LoadingState,
};

export default meta;

/**
 * Template LoadingState
 *
 * @param args storybook arguments
 * @return template LoadingState component
 */
const Template: Story<Props> = (args) => {
    const [open, isLoading] = useState(false);

    return (
        <React.Fragment>
            <Text style={{ display: 'inline-block' }} onClick={() => isLoading(!open)}>
                Static Loading shown here
            </Text>
            <LoadingState open={open} isLoading={() => isLoading(!open)} {...args}></LoadingState>
        </React.Fragment>
    );
};

export const Default = Template.bind({});

/**
 * Template Inline Progress LoadingState
 *
 * @param args storybook arguments
 * @return template Progress LoadingState component
 */
export const ProgressBarExample: Story<Props> = (args) => {
    const [open, isLoading] = useState(true);

    return (
        <React.Fragment>
            <Text style={{ display: 'inline-block' }} onClick={() => isLoading(!open)}>
                Inline Loading shown here
            </Text>
            <LoadingState
                isLoading={() => isLoading(!open)}
                variant="progress"
                progressFilled={1}
                open={open}
                size="medium"
            ></LoadingState>
        </React.Fragment>
    );
};
