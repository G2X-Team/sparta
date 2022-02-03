import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Props, DatePicker } from '../src/components/DatePicker/DatePicker';

const meta: Meta = {
    title: 'Layout/DatePicker',
    component: DatePicker,
};

export default meta;

/**
 * Template DatePicker
 *
 * @param args storybook args
 * @return template datepicker
 */
const Template: Story<Props> = (args) => <DatePicker {...args} />;

export const Default = Template.bind({});
