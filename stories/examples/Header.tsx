import React from 'react';
import type { SampleStory } from './util';
import { Header, Card, Text } from '../../src';

export const StandaloneHeader: SampleStory = (args) => <Header {...args} />;

export const HeaderInCard: SampleStory = (args) => {
    const divStyle = { paddingTop: 20 };
    const { children, ...otherArgs } = args;

    return (
        <Card>
            <div style={divStyle}>
                <Text>I am above the the header right?</Text>
            </div>
            <Header {...otherArgs}>
                <Text bold upper>
                    {children}
                </Text>
            </Header>
        </Card>
    );
};
