import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Props, Table } from '../src/components/Table/Table';

const meta: Meta = {
    title: 'Layout/Table',
    component: Table,
    args: {
        cellTextColor: 'black',
        cellTextTransform: 'capitalize',
        cellTextFontWeight: 'normal',
        headerTextColor: 'white',
        headerTextTransform: 'uppercase',
        headerTextFontWeight: 'bolder',
    },
};

export default meta;

/**
 * Template Table
 *
 * @param args storybook args
 * @return template table
 */
const Template: Story<Props> = (args) => <Table {...args} />;

export const Default = Template.bind({});
