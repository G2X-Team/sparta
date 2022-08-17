import React from 'react';
import type { Story, Meta } from '@storybook/react';
import type { IAvatar } from '../src/components/Avatar/Avatar';
import { Avatar } from '../src';

const meta: Meta = {
    title: 'Layout/Avatar',
    component: Avatar,
    args: {
        onClick: () => console.log('hello'),
        fallback: 'John Allan Doe',
        picture: 'https://randomuser.me/api/portraits/men/34.jpg',
    },
};

export default meta;

/**
 * Template for Avatar
 *
 * @param args storybook arguments for Avatar component
 * @return Avatar component template
 */
const Template: Story<IAvatar> = (args) => <Avatar {...args} />;

export const Default = Template.bind({});
