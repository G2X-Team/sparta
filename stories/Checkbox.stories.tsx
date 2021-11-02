import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Checkbox, Props } from '../src/components/Checkbox/Checkbox';

const meta: Meta = {
    title: "Form/Checkbox",
    component: Checkbox,
    argTypes: {
        children: {
            defaultValue: "This is a checkbox"
        }
    }
}

export default meta;

const Template: Story<Props> = (args) => <Checkbox {...args} />;

export const Default = Template.bind({});