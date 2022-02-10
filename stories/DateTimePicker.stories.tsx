import React from 'react';
import { Story, Meta } from '@storybook/react';

import { DateTimePicker, Props } from '../src/components/DateTimePicker/DateTimePicker';

const meta: Meta = {
    title: 'Layout/DateTimePicker',
    component: DateTimePicker,
};

export default meta;

/**
 * Template DateTimePicker
 *
 * @param args storybook args
 * @return template datetimepicker
 */
const Template: Story<Props> = (args) => <DateTimePicker {...args} />;

export const Default = Template.bind({});
