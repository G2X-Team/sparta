/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import type { SampleStory } from './util';
import { Menu, Option, Header, Text, Footer, Button } from '../../src';

export const ListboxMenu: SampleStory = (args) => (
    <Menu {...args}>
        <Option>First Option</Option>
        <Option>Second Option</Option>
        <Option>Third Option</Option>
    </Menu>
);

export const ApplicationMenu: SampleStory = (args) => (
    <Menu {...args}>
        <Header>
            <Text header={3} bold>
                New Kind of Menu
            </Text>
        </Header>
        <Text>
            This menu is completely different than the previous one. It's entire purpose is to be
            flexible and provide the user with options when defining what a "menu" really is.
        </Text>
        <Footer>
            <Button>Clicking me doesn't do anything!</Button>
        </Footer>
    </Menu>
);

export const NavigationMenu: SampleStory = (args) => (
    <Menu {...args}>
        <Option>First Option</Option>
        <Option>Second Option</Option>
        <Option>Third Option</Option>
    </Menu>
);
