import React from 'react';
import type { SampleStory } from './util';
import { Footer, Text, Card } from '../../src';

export const StandaloneFooter: SampleStory = (args) => <Footer {...args} />;

export const FooterInCard: SampleStory = (args) => {
    const divStyle = { paddingBottom: 20 };
    const { children, ...otherArgs } = args;

    return (
        <Card>
            <Footer {...otherArgs}>
                <Text bold upper>
                    {children}
                </Text>
            </Footer>
            <div style={divStyle}>
                <Text>I am below the the footer right?</Text>
            </div>
        </Card>
    );
};
