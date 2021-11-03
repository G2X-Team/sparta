import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Props, Radio } from '../src/components/Radio/Radio';

const meta: Meta = {
    title: "Form/Radio",
    component: Radio,
    argTypes: {
        children: {
            defaultValue: "This is a radio"
        }
    }
}

export default meta;

const Template: Story<Props> = (args) => <Radio {...args} />;

export const Default = Template.bind({});