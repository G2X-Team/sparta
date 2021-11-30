import React from 'react';
import { Meta, Story } from '@storybook/react';

import { Card, Props } from '../src/components/Card/Card';
import { Header, Footer, Text } from '../src';

const meta: Meta = {
    title: "Layout/Card",
    component: Card,
    args: {
        children: "This is a card component"
    }
}

export default meta;

const Template: Story<Props> = (args) => <Card {...args} />;

export const Default = Template.bind({});

export const CardWithHeader = () => (
    <Card>
        <Header>This is the header</Header>
        Hello World
    </Card>
)

export const CardWithFooter = () => (
    <Card>
        Hello World
        <Footer>This is the footer</Footer>
    </Card>
)

export const CardWithHeaderAndFooter = () => (
    <Card>
        <Header>This is the header</Header>
        Hello World
        <Footer>This is the footer</Footer>
    </Card>
)

export const CustomCard = () => (
    <Card style={{height: 200, width: 300}}>
        <Header>
            <Text header={2} bold>Custom Card</Text>
        </Header>
        <Text bold color="gray">What is this?</Text>
        <Text margins>This is a glorified div that supports headers and footers</Text>
        <Footer style={{borderTop: "1px solid lightgray"}}>
            <Text italic style={{marginTop: 10}}>per request :)</Text>
        </Footer>
    </Card>
)
