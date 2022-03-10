import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Checkbox, ICheckbox } from '../src/components/Checkbox/Checkbox';

const meta: Meta = {
    title: 'Form/Checkbox',
    component: Checkbox,
    args: {
        children: 'This is a checkbox',
        value: 'checkbox value',
        id: 'checkbox',
    },
};

export default meta;

/**
 * Temlpate checkbox
 *
 * @param args storybook arguments
 * @return Template checkbox
 */
const Template: Story<ICheckbox> = (args) => <Checkbox {...args} />;

export const Default = Template.bind({});
