import React from 'react';
import type { SampleStory } from './utils/util';
import { Button, DataRenderer, Grid, Icon, Table, Text } from '../../src';
import data from './utils/sampleData.json';

// the name of this function should be the name of the story in the docs

export const ElaborateExample: SampleStory = (args) => (
    <Table data={data} label="Important Data" paginate={5} columns="1fr auto auto">
        <Table.Column datakey="title" header="Article Title" />
        <Table.Column
            datakey="publishDate"
            header="Publish Date"
            align="center"
            sort="date"
            dataRenderer={(data) =>
                new Date(data as string).toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                })
            }
        />
        <Table.Column datakey="lastModifyBy" header="Last Modify By" align="center" />
    </Table>
);

const firstSample = [
    { message: 'hello there', code: 2, friends: 4, family: 3 },
    { message: "what's up", code: 5, friends: 1, family: 3 },
];
export const RenderingDataWithColumns: SampleStory = (args) => (
    <Table label="Basic Table" data={firstSample}>
        <Table.Column datakey="code" header="Code" />
        <Table.Column datakey="message" header="Message" />
    </Table>
);

export const CustomHeaders: SampleStory = (args) => {
    const codeHeader = (
        <Grid columns="auto auto" alignItems="center" gap="5px">
            <Icon name="code" />
            <Text>Code</Text>
        </Grid>
    );

    return (
        <Table label="Table with custom headers" data={firstSample}>
            <Table.Column datakey="code" header={codeHeader} />
            <Table.Column datakey="message" header="Message" />
        </Table>
    );
};

const customSample = [
    {
        message: 'hello there',
        code: 2,
        friends: 4,
        family: 3,
        date: 'Mon Jan 03 2022 01:31:12 GMT-0500 (Eastern Standard Time)',
    },
    {
        message: "what's up",
        code: 5,
        friends: 1,
        family: 3,
        date: 'Fri Apr 09 2021 09:26:41 GMT-0400 (Eastern Daylight Time)',
    },
];
export const CustomCells: SampleStory = (args) => {
    const dateFormatter: DataRenderer = (date) => {
        return new Date(date as string).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });
    };

    return (
        <Table label="Table with custom headers" data={customSample}>
            <Table.Column datakey="code" header="Code" />
            <Table.Column datakey="message" header="Message" />
            <Table.Column datakey="date" header="Published At" dataRenderer={dateFormatter} />
        </Table>
    );
};

export const SortColumn: SampleStory = (args) => (
    <Table label="Table with custom headers" data={customSample}>
        <Table.Column datakey="code" header="Code" sort="number" />
        <Table.Column datakey="message" sort="string" header="Message" />
        <Table.Column datakey="date" header="Published At" sort="date" />
    </Table>
);

const controlSample = [
    ['This is a house', 0, 5],
    ['This is a car', 4, 4],
    ['This is a motorcycle', 2, 2],
];
export const ControllingRows: SampleStory = (args) => (
    <Table label="table with row controll" data={controlSample}>
        <Table.Column datakey={2} header="People" />
        <Table.Column datakey={0} header="Type" sort="string" />
        <Table.Column datakey={1} header="Wheels" sort="number" align="center" />
        <Table.Column
            align="center"
            datakey="something"
            rowHandler={(data) => <Button onClick={() => window.alert(data)}>Show data</Button>}
        />
    </Table>
);

export const ControllingAlignment: SampleStory = (args) => (
    <Table label="Table alignment controll" data={customSample}>
        <Table.Column datakey="code" header="Code" align="center" />
        <Table.Column datakey="message" header="Message" align="right" />
    </Table>
);

export const ControllingColumnSpacing: SampleStory = (args) => (
    <Table label="Table with grid columns" data={customSample} {...args}>
        <Table.Column datakey="code" header="Code" align="center" />
        <Table.Column datakey="message" header="Message" />
    </Table>
);
