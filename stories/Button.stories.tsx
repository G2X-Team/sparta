import React from 'react'
import { Meta, Story } from '@storybook/react'
import { Button, Props } from '../src/components/Button/Button'

const meta: Meta = {
    title: 'Layout/Button',
    component: Button,
    argTypes: {
        onClick: { action: 'clicked' },
        children: {
            defaultValue: "Click me"
        }
    }
}

export default meta;

const Template: Story<Props> = (args) => <Button {...args} />

export const Default = Template.bind({});
export const Secondary = Template.bind({});

Secondary.args = {
    variant: "secondary",
    children: "I am secondary"
}