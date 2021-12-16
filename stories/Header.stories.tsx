import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Header, Props } from '../src/components/Header/Header';

const meta: Meta = {
    title: 'Interfacing/Header',
    component: Header,
    args: {
        children: 'This is a header component',
    },
};

export default meta;

/**
 * Template header component
 *
 * @param args storybook arguments
 * @return template header
 */
const Template: Story<Props> = (args) => <Header {...args} />;

export const Default = Template.bind({});
