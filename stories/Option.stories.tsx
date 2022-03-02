import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Option, IOption } from '../src/components/Option/Option';

const meta: Meta = {
    title: 'Interfacing/Option',
    component: Option,
    args: {
        children: 'This is an option component',
    },
};

export default meta;

/**
 * Template Option
 *
 * @param args storybook arguments
 * @return Template Option
 */
const Template: Story<IOption> = (args) => <Option {...args} />;

export const Default = Template.bind({});
