import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Dropdown, Props } from '../src/components/Dropdown/Dropdown';
import { Option } from '../src/components/Option/Option';
import { Button } from '../src/components/Button/Button';
import { Text } from '../src/components/Text/Text';

const meta: Meta = {
    title: 'Layout/Dropdown',
    component: Dropdown,
};

export default meta;

export const Default: Story<Props> = (args) => (
    <Dropdown {...args}>
        <Button>
            <Text inline>This is a dropdown</Text>
        </Button>
        <Option>Hello</Option>
        <Option>Goodbye</Option>
    </Dropdown>
);

export const AnotherExample: Story<Props> = (args) => (
    <Dropdown {...args}>
        <Button>
            <Button>What's good</Button>
        </Button>
        <Option>Hello</Option>
        <Option>Goodbye</Option>
    </Dropdown>
);
