import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Checkbox, Props } from '../src/components/Checkbox/Checkbox';

const meta: Meta = {
    title: 'Form/Checkbox',
    component: Checkbox,
    args: {
        children: 'This is a checkbox',
        value: 'checkbox value',
    },
};

export default meta;

const Template: Story<Props> = (args) => <Checkbox {...args} />;

export const Default = Template.bind({});
