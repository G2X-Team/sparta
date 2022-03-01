import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Props, Table } from '../src/components/Table/Table';

const meta: Meta = {
    title: 'Layout/Table',
    component: Table,
    args: {
        data: [
            { id: 12, name: 'Name12', Age: 30 },
            { id: 2, name: 'Name2', Age: 30 },
            { id: 3, name: 'Name3', Age: 30 },
            { id: 4, name: 'Name4', Age: 30 },
            { id: 5, name: 'Name5', Age: 30 },
            { id: 6, name: 'Name6', Age: 30 },
            { id: 7, name: 'Name7', Age: 30 },
            { id: 8, name: 'Name8', Age: 30 },
            { id: 9, name: 'Name9', Age: 30 },
            { id: 10, name: 'Name10', Age: 30 },
            { id: 11, name: 'Name11', Age: 30 },
            { id: 1, name: 'Adam', Age: 30 },
            { id: 13, name: 'Name13', Age: 30 },
            { id: 14, name: 'Name14', Age: 30 },
            { id: 15, name: 'Name15', Age: 30 },
            { id: 16, name: 'Name16', Age: 30 },
            { id: 17, name: 'Name17', Age: 30 },
            { id: 18, name: 'Name18', Age: 30 },
        ],
        colNames: ['id', 'name', 'Age'],
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
