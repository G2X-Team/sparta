import React from 'react';
import type { SampleStory } from './util';
import { Alert, Text } from '../../src';

export const StandardAlert: SampleStory = (args) => {
    return (
        <Alert {...args}>
            <Text bold>{args.children}</Text>
        </Alert>
    );
};

export const AlertTypes: SampleStory = (args) => {
    return (
        <>
            <Alert type="danger" {...args}>
                <Text bold>This is a Danger Alert</Text>
            </Alert>
            <span style={{ paddingRight: 10 }} />
            <Alert type="warning" {...args}>
                <Text bold>This is an Warning Alert</Text>
            </Alert>
            <span style={{ paddingRight: 10 }} />
            <Alert type="info" {...args}>
                <Text bold>This is an Info Alert</Text>
            </Alert>
            <span style={{ paddingRight: 10 }} />
            <Alert type="success" {...args}>
                <Text bold>This is an success Alert</Text>
            </Alert>
        </>
    );
};
