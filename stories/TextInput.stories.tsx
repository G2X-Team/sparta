import React from 'react';
import { Meta, Story } from '@storybook/react';
import { TextInput, ITextInput } from '../src/components/TextInput/TextInput';

const meta: Meta = {
    title: 'Form/Text Input',
    component: TextInput,
    args: {
        label: 'Label',
    },
};

export default meta;

/**
 * Template Text Input
 *
 * @param args storybook arguments
 * @return template text input
 */
const Template: Story<ITextInput> = (args) => <TextInput {...args} />;

export const Default = Template.bind({});
