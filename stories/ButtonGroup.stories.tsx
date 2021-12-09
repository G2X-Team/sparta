import React from 'react';
import { Story, Meta } from '@storybook/react';

import { ButtonGroup, Props } from '../src/components/ButtonGroup/ButtonGroup';
import { Button } from '../src';

const meta: Meta = {
    title: 'Layout/Button Group',
    component: ButtonGroup,
};

export default meta;

const Template: Story<Props> = (args) => (
    <ButtonGroup {...args}>
        <Button>First Button</Button>
        <Button>Second Button</Button>
        <Button>Third Button Button</Button>
    </ButtonGroup>
);

export const Default = Template.bind({});
