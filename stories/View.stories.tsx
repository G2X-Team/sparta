import React, { HTMLAttributes } from 'react';
import { Story, Meta } from '@storybook/react';

import { View } from '../src/components/View/View';

const meta: Meta = {
    title: 'Interfacing/View',
    component: View,
    args: {
        children: 'plain old div :)... unless ;)',
    },
};

export default meta;

const Template: Story<HTMLAttributes<HTMLDivElement>> = (args) => <View {...args} />;

export const Default = Template.bind({});
