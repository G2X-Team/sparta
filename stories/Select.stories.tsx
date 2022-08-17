import React from 'react';
import { Meta, Story } from '@storybook/react';
import { ISelect } from '../src/components/Select/Select';
import { Select, Option } from '../src';

const meta: Meta = {
    title: 'Form/Select',
    component: Select,
    args: {
        options: ['Option 1', 'Option 2', 'Option 3'],
    },
};

export default meta;

/**
 * Template for select menu
 *
 * @param args storybook arguments
 * @return select template
 */
const Temlpate: Story<ISelect> = (args) => <Select {...args} />;

export const Default = Temlpate.bind({});
