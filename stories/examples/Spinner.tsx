import React, { useState } from 'react';
import type { SampleStory } from './util';
import { Button, Grid, Spinner, Text } from '../../src';

export const DefaultState: SampleStory = (args) => {
    const [loading, setLoading] = useState(false);

    return (
        <div>
            <Button onClick={() => setLoading(!loading)} style={{ marginBottom: 20 }}>
                Toggle Spinner
            </Button>
            <Spinner loading={loading} {...args} />
        </div>
    );
};

export const DifferentColorSpinners: SampleStory = (args) => (
    <>
        <Text header={2} margins>
            Color
        </Text>
        <Grid columns="auto auto auto" width="300px" style={{ marginBottom: 20 }}>
            <Spinner color="red" loading />
            <Spinner color="green" loading />
            <Spinner color="blue" loading />
        </Grid>
        <Text header={2} margins>
            Inner Color
        </Text>
        <Grid columns="auto auto auto" width="300px">
            <Spinner innerColor="red" loading />
            <Spinner innerColor="green" loading />
            <Spinner innerColor="blue" loading />
        </Grid>
    </>
);

export const DifferentSizeSpinners: SampleStory = (args) => (
    <>
        <Grid columns="auto auto auto" width="300px">
            <Spinner size="50px" loading />
            <Spinner size="70px" loading />
            <Spinner size="40px" loading />
        </Grid>
    </>
);

export const DifferentVariantSpinners: SampleStory = (args) => (
    <>
        <Grid columns="auto auto auto" width="300px">
            <Spinner loading />
            <Spinner variant="secondary" loading />
            <Spinner variant="tertiary" loading />
        </Grid>
    </>
);
