import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Props, Radio } from '../src/components/Radio/Radio';

const meta: Meta = {
    title: 'Form/Radio',
    component: Radio,
    args: {
        children: 'This is a radio',
        value: 'radio value',
        id: 'radio',
    },
};

export default meta;

/**
 * Template Radio
 *
 * @param args storybook arguments
 * @return template radio component
 */
const Template: Story<Props> = (args) => <Radio {...args} />;

export const Default = Template.bind({});
