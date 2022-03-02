import React from 'react';
import { Story, Meta } from '@storybook/react';

import { DateTimePicker, IDateTimePicker } from '../src/components/DateTimePicker/DateTimePicker';

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
const Template: Story<IDateTimePicker> = (args) => <DateTimePicker {...args} />;

export const Default = Template.bind({});
