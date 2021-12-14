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
                progress={0}
            ></LoadingState>
        </React.Fragment>
    );
};

export const AnotherExample: Story<Props> = (args) => {
    const [open, isLoading] = useState(false);

    return (
        <React.Fragment>
            <Text onClick={() => isLoading(!open)}>
                Inline Loading shown here
                <LoadingState
                    open={open}
                    isLoading={() => isLoading(!open)}
                    type="inline"
                    size="small"
                    progress={0}
                ></LoadingState>
            </Text>
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
                progress={0}
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
                progress={0}
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
                progress={0}
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
                progress={1}
            ></LoadingState>
        </React.Fragment>
    );
};
