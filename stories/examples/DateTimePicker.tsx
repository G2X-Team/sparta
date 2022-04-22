import React from 'react';
import type { SampleStory } from './util';
import { DateTimePicker, Text } from '../../src';

export const StandardDatePicker: SampleStory = (args) => <DateTimePicker {...args} />;

export const ScrollDatePicker: SampleStory = (args) => <DateTimePicker {...args} />;

export const DateFormats: SampleStory = (args) => {
    return (
        <>
            <Text> Format: dd/MM/yyyy</Text>
            <DateTimePicker format="dd/MM/yyyy" {...args} />
            <span style={{ paddingRight: 10 }} />
            <Text> Format: mm/dd/yyyy</Text>
            <DateTimePicker format="mm/dd/yyyy" {...args} />
            <span style={{ paddingRight: 10 }} />
            <Text> Format: yyyy/MM/dd</Text>
            <DateTimePicker format="yyyy/MM/dd" {...args} />
            <span style={{ paddingRight: 10 }} />
            <Text> Format: yyyy/dd/MM</Text>
            <DateTimePicker format="yyyy/dd/MM" {...args} />
        </>
    );
};
