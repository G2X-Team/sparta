import React from 'react';
import type { SampleStory } from './util';
import { Card, Header, Footer, Text } from '../../src';

export const CompleteCard: SampleStory = (args) => {
    return (
        <Card {...args}>
            <Header>This is the header</Header>
            This card wraps a header and a footer.
            <Footer>This is the footer</Footer>
        </Card>
    );
};

export const CustomCard: SampleStory = (args) => {
    return (
        <>
            <Card style={{ height: 220, width: 300 }} {...args}>
                <Header>
                    <Text header={2} bold>
                        Custom Card
                    </Text>
                </Header>
                <Text bold color="gray">
                    What is this?
                </Text>
                <Text margins> This is a glorified div that supports headers and footers</Text>
                <Footer style={{ borderTop: '1px solid lightgray' }}>
                    <Text italic style={{ marginTop: 10 }}>
                        per request :)
                    </Text>
                </Footer>
            </Card>
        </>
    );
};

export const StandardCard: SampleStory = (args) => <Card {...args} />;

export const CardWithHeader: SampleStory = (args) => {
    return (
        <Card {...args}>
            <Header>This is the header</Header>
            My awesome article.
        </Card>
    );
};

export const CardWithFooter: SampleStory = (args) => {
    return (
        <Card>
            My awesome article.
            <Footer>Something Cool Here!</Footer>
        </Card>
    );
};
