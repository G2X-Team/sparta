import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Option, Props } from '../src/components/Option/Option';

const meta: Meta = {
    title: "Interfacing/Option",
    component: Option,
    args: {
        children: "This is an option component"
    }
}

export default meta;

const Template: Story<Props> = (args) => <Option {...args} />;

export const Default = Template.bind({});