import React from 'react';
import type { Story, Meta } from '@storybook/react';

import type { IImage } from '../src/components/Image/Image';
import { Image } from '../src';

const meta: Meta = {
    title: 'Image',
    component: Image,
    args: {
        height: 300,
        width: 500,
        // eslint-disable-next-line max-len
        src: 'https://i.picsum.photos/id/878/3000/3000.jpg?hmac=xb2kVI4JW-mdX6VW3xiTIeyZZrcGHHYrEpARD1Fcly0',
    },
};

export default meta;

/**
 * Image template
 *
 * @param args arguments for image
 * @return template
 */
const Template: Story<IImage> = (args) => <Image {...args} />;

export const Default = Template.bind({});
