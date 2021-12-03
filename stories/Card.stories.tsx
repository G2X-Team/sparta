import React from 'react';
import { Meta, Story } from '@storybook/react';

import { Card, Props } from '../src/components/Card/Card';
import { Header, Footer, Text } from '../src';

const meta: Meta = {
    title: 'Layout/Card',
    component: Card,
    args: {
        children: 'This is a card component',
    },
};

export default meta;

/**
 * Template card component
 *
 * @param args storybook arguments
 * @return template card
 */
const Template: Story<Props> = (args) => <Card {...args} />;

export const Default = Template.bind({});

/**
 * Card with Header
 *
 * @return card with header
 */
export const CardWithHeader = (): JSX.Element => (
    <Card>
        <Header>This is the header</Header>
        Hello World
    </Card>
);

/**
 * Card with Footer
 *
 * @return card with Footer
 */
export const CardWithFooter = (): JSX.Element => (
    <Card>
        Hello World
        <Footer>This is the footer</Footer>
    </Card>
);

/**
 * Card with Header and Footer
 *
 * @return card with header and footer
 */
export const CardWithHeaderAndFooter = (): JSX.Element => (
    <Card>
        <Header>This is the header</Header>
        Hello World
        <Footer>This is the footer</Footer>
    </Card>
);

/**
 * Custom Card
 *
 * @return custom card
 */
export const CustomCard = (): JSX.Element => (
    <Card style={{ height: 200, width: 300 }}>
        <Header>
            <Text header={2} bold>
                Custom Card
            </Text>
        </Header>
        <Text bold color="gray">
            What is this?
        </Text>
        <Text margins>This is a glorified div that supports headers and footers</Text>
        <Footer style={{ borderTop: '1px solid lightgray' }}>
            <Text italic style={{ marginTop: 10 }}>
                per request :)
            </Text>
        </Footer>
    </Card>
);
