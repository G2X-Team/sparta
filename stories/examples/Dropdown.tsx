import React from 'react';
import type { SampleStory } from './util';
import { Dropdown, Menu, Option, Button, Icon, Text } from '../../src';

// the name of this function should be the name of the story in the docs
export const BasicDropdown: SampleStory = (args) => (
    <Dropdown {...args}>
        <Button>Click Me</Button>
        <Menu label="Button Dropdown">
            <Option>Option 1</Option>
            <Option>Option 2</Option>
            <Option>Option 3</Option>
        </Menu>
    </Dropdown>
);

export const IconDropdown: SampleStory = (args) => (
    <Dropdown {...args}>
        <Icon name="menu" />
        <Menu label="Button Dropdown">
            <Option>Option 1</Option>
            <Option>Option 2</Option>
            <Option>Option 3</Option>
        </Menu>
    </Dropdown>
);

export const AreaDropdown: SampleStory = (args) => (
    <Dropdown {...args}>
        <Button variant="area">
            <Text disabled underline bold>
                Click Me
            </Text>
        </Button>
        <Menu label="Button Dropdown">
            <Option>Option 1</Option>
            <Option>Option 2</Option>
            <Option>Option 3</Option>
        </Menu>
    </Dropdown>
);

export const AnchoringTheDropdown: SampleStory = (args) => (
    <div
        style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: 400,
            width: '100%',
        }}
    >
        <Dropdown {...args}>
            <Button>This is a dropdown</Button>
            <Menu label="Dropdown" width={150}>
                <Option>Hello</Option>
                <Option>How you doing</Option>
                <Option>How you doing</Option>
                <Option>How you doing</Option>
                <Option>Goodbye</Option>
            </Menu>
        </Dropdown>
    </div>
);
