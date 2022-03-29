import React from 'react';
import { Meta, Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Button, IButton } from '../src/components/Button/Button';

const meta: Meta = {
    title: 'Layout/Button',
    component: Button,
    args: {
        onClick: action('clicked'),
        children: 'Click me',
    },
};

export default meta;

/**
 * Template FC for button
 *
 * @param args story args
 * @return template button
 */
const Template: Story<IButton> = (args) => <Button {...args} />;

export const Default = Template.bind({});
export const Secondary = Template.bind({});
export const Area = Template.bind({});

Secondary.args = {
    variant: 'secondary',
    children: 'I am secondary',
};

Area.args = {
    variant: 'area',
    children: 'I am an area variant',
};
