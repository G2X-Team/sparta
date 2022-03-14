import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react';
import { LoadingState, ILoadingState } from '../src/components/LoadingState/LoadingState';
import { Button, Text } from '../src';

const meta: Meta = {
    title: 'Layout/LoadingState',
    component: LoadingState,
    args: {
        type: 'spinner',
        label: 'progressbar_id',
    },
};

export default meta;

/**
 * Template LoadingState
 *
 * @param args storybook arguments
 * @return template LoadingState component
 */
const Template: Story<ILoadingState> = (args) => {
    const [open, isLoading] = useState(false);
    const buttonText = `${args.type} loading shown here`;

    return (
        <>
            <Button onClick={() => isLoading(!open)}>
                <Text pascal>{buttonText}</Text>
            </Button>
            <br />
            <br />
            <LoadingState loading={open} {...args}></LoadingState>
        </>
    );
};

export const Spinner = Template.bind({});

export const ProgressBar = Template.bind({});
ProgressBar.args = {
    type: 'progress',
    progress: 0.5,
};
