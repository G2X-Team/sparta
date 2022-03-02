import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Props, Table } from '../src/components/Table/Table';

const meta: Meta = {
    title: 'Layout/Table',
    component: Table,
    args: {
        data: [
            { id: 12, name: 'Name2', Age: 30 },
            { id: 2, name: 'Adam', Age: 30 },
            { id: 1, name: 'broda', Age: 30 },
        ],
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
