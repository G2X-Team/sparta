import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react';

import { LoadingState, Props } from '../src/components/LoadingState/LoadingState';
import { Button, Text } from '../src';

const meta: Meta = {
    title: 'Layout/LoadingState',
    component: LoadingState,
};

export default meta;

export const Default: Story<Props> = (args) => {
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
            ></LoadingState>
        </React.Fragment>
    );
};

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
            ></LoadingState>
        </React.Fragment>
    );
};

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
            ></LoadingState>
        </React.Fragment>
    );
};

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
            ></LoadingState>
        </React.Fragment>
    );
};

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
            ></LoadingState>
        </React.Fragment>
    );
};

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
            ></LoadingState>
        </React.Fragment>
    );
};
