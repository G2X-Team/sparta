import React from 'react';
import { Story, Meta } from '@storybook/react';

import { ITable, Table } from '../src/components/Table/Table';

const meta: Meta = {
    title: 'Layout/Table',
    component: Table,
    args: {
        data: [
            { id: 12, name: 'Name2', Age: 30 },
            { id: 2, name: 'Adam', Age: 30 },
            { id: 1, name: 'broda', Age: 30 },
        ],
    },
};

export default meta;

/**
 * Template Table
 *
 * @param args storybook args
 * @return template table
 */
const Template: Story<ITable> = (args) => <Table {...args} />;

export const Default = Template.bind({});
