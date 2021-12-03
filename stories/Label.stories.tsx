import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Label, Props } from '../src/components/Label/Label';
import { TextInput } from '../src';

const meta: Meta = {
    title: 'Form/Label',
    component: Label,
    args: {
        value: 'This is a label',
        hint: 'This is a hint',
    },
};

export default meta;

/**
 * Template label component
 *
 * @param args storybook arguments
 * @return template label component
 */
const Template: Story<Props> = (args) => (
    <Label {...args}>
        <TextInput placeholder="Text Input" />
    </Label>
);

export const Default = Template.bind({});
