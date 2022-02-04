import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Props, Divider } from '../src/components/Divider/Divider';

const meta: Meta = {
    title: 'Layout/Divider',
    component: Divider,
    args: {
        color: 'lightgray',
        height: '1',
    },
};

export default meta;

/**
 * Template Divider
 *
 * @param args storybook args
 * @return template divider
 */
const Template: Story<Props> = (args) => <Divider {...args} />;

export const Default = Template.bind({});
