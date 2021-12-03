import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Props, Divider } from '../src/components/Divider/Divider';

const meta: Meta = {
    title: 'Layout/Divider',
    component: Divider,
};

export default meta;

const Template: Story<Props> = (args) => <Divider {...args} />;

export const Default = Template.bind({});
