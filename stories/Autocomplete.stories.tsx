import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Autocomplete, Props } from '../src/components/Autocomplete/Autocomplete';

const meta: Meta = {
    title: 'Form/Autocomplete',
    component: Autocomplete,
};

export default meta;

/**
 * Template Text Input
 *
 * @param args storybook arguments
 * @return template text input
 */
const Template: Story<Props> = (args) => <Autocomplete {...args} />;

export const Default = Template.bind({});
