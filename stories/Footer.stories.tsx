import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Footer, Props } from '../src/components/Footer/Footer';

const meta: Meta = {
    title: "Interfacing/Footer",
    component: Footer,
    args: {
        children: "This is a footer component"
    }
}

export default meta;

const Template: Story<Props> = (args) => <Footer {...args}/>;

export const Default = Template.bind({});