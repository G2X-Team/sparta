import React from 'react';
import { Meta, Story } from '@storybook/react';

import { Icon, Props } from '../src/components/Icon/Icon';

const meta: Meta = {
    title: 'Layout/Icon',
    component: Icon,
    args: {
        name: 'navigate_next',
        onClick: undefined,
    },
};

export default meta;

const Template: Story<Props> = (args) => <Icon {...args} />;

export const Default = Template.bind({});
