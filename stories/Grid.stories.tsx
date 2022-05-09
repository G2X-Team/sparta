import React from 'react';

import type { Story, Meta } from '@storybook/react';

import type { IGrid } from '../src/components/Grid/Grid';
import { Grid } from '../src';

const meta: Meta = {
    title: 'Grid',
    component: Grid,
};

export default meta;

/**
 * safd
 *
 * @param args stuff
 * @return t
 */
const Template: Story<IGrid> = (args) => (
    <Grid {...args}>
        <div style={{ background: 'red' }}></div>
        <div style={{ background: 'blue' }}></div>
        <div style={{ background: 'green' }}></div>
        <div style={{ background: 'yellow' }}></div>
    </Grid>
);

export const Default = Template.bind({});
