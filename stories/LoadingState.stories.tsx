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
            <Button onClick={() => isLoading(!open)}>Submit</Button>
            <LoadingState open={open} isLoading={() => isLoading(!open)} {...args}></LoadingState>
        </React.Fragment>
    );
};

export const Default = Template.bind({});

/**
 * Template Inline LoadingState
 *
 * @param args storybook arguments
 * @return template inline LoadingState component
 */
export const AnotherExample: Story<Props> = (args) => {
    const [open, isLoading] = useState(false);

    return (
        <React.Fragment>
            <Text style={{ display: 'inline-block' }} onClick={() => isLoading(!open)}>
                Inline Loading shown here
            </Text>
            <LoadingState
                open={open}
                isLoading={() => isLoading(!open)}
                type="inline"
                size="small"
                variant="static"
                progressFilled={0}
            ></LoadingState>
        </React.Fragment>
    );
};

/**
 * Template Large LoadingState
 *
 * @param args storybook arguments
 * @return template large LoadingState component
 */
export const LargeSize: Story<Props> = (args) => {
    const [open, isLoading] = useState(false);

    return (
        <React.Fragment>
            <Button onClick={() => isLoading(!open)}>Submit</Button>
            <LoadingState
                open={open}
                isLoading={() => isLoading(!open)}
                type="absolute"
                size="large"
                variant="static"
                progressFilled={0}
            ></LoadingState>
        </React.Fragment>
    );
};

/**
 * Template Medium LoadingState
 *
 * @param args storybook arguments
 * @return template medium LoadingState component
 */
export const MediumSize: Story<Props> = (args) => {
    const [open, isLoading] = useState(false);

    return (
        <React.Fragment>
            <Button onClick={() => isLoading(!open)}>Submit</Button>
            <LoadingState
                open={open}
                isLoading={() => isLoading(!open)}
                type="absolute"
                size="medium"
                variant="static"
                progressFilled={0}
            ></LoadingState>
        </React.Fragment>
    );
};

/**
 * Template Small LoadingState
 *
 * @param args storybook arguments
 * @return template small LoadingState component
 */
export const SmallSize: Story<Props> = (args) => {
    const [open, isLoading] = useState(false);

    return (
        <React.Fragment>
            <Button onClick={() => isLoading(!open)}>Submit</Button>
            <LoadingState
                open={open}
                isLoading={() => isLoading(!open)}
                type="absolute"
                size="small"
                variant="static"
                progressFilled={0}
            ></LoadingState>
        </React.Fragment>
    );
};

/**
 * Template Progress LoadingState
 *
 * @param args storybook arguments
 * @return template progress LoadingState component
 */
export const ProgressVarient: Story<Props> = (args) => {
    const [open, isLoading] = useState(false);

    return (
        <React.Fragment>
            <Button onClick={() => isLoading(!open)}>Submit</Button>
            <LoadingState
                open={open}
                isLoading={() => isLoading(!open)}
                type="absolute"
                variant="progress"
                progressFilled={0.2}
            ></LoadingState>
        </React.Fragment>
    );
};
