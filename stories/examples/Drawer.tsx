import React from 'react';
import type { SampleStory } from './util';
import { Drawer, Option, Header, Menu, Text, View } from '../../src';

export const BareMinimumDrawer: SampleStory = (args) => (
    <Drawer {...args}>
        <Menu label="bare-minimum drawer">
            <Header>
                <Text header={2} bold>
                    Drawer
                </Text>
            </Header>
            <Option>First Option</Option>
            <Option>Second Option</Option>
            <Option>Third Option</Option>
        </Menu>
    </Drawer>
);

export const StandardDrawer: SampleStory = (args) => (
    <Drawer {...args}>
        <Drawer.Button>Click Me</Drawer.Button>
        <Menu label="Standard Drawer">
            <Header>
                <Text header={2} bold>
                    Drawer
                </Text>
            </Header>
            <Option>First Option</Option>
            <Option>Second Option</Option>
            <Option>Third Option</Option>
        </Menu>
    </Drawer>
);

export const AbsoluteDrawer: SampleStory = (args) => (
    <Drawer {...args}>
        <Drawer.Button>Open Absolute</Drawer.Button>
        <Menu label="Absolute Drawer">
            <Header>
                <Text header={2} bold>
                    Drawer
                </Text>
            </Header>
            <Option>First Option</Option>
            <Option>Second Option</Option>
            <Option>Third Option</Option>
        </Menu>
        <Text style={{ paddingTop: 20 }}>
            <Text bold header={2} style={{ paddingBottom: 10 }}>
                Hello World
            </Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.
        </Text>
    </Drawer>
);

export const PersistentDrawer: SampleStory = (args) => (
    <Drawer {...args}>
        <Drawer.Button>Open Persistent</Drawer.Button>
        <View display="flex" style={{ paddingTop: 20 }}>
            <Menu label="Persisten Drawer">
                <Header>
                    <Text header={2} bold>
                        Drawer
                    </Text>
                </Header>
                <Option>First Option</Option>
                <Option>Second Option</Option>
                <Option>Third Option</Option>
            </Menu>
            <Text style={{ padding: 10 }}>
                <Text bold header={2} style={{ paddingBottom: 10 }}>
                    Hello World
                </Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
            </Text>
        </View>
    </Drawer>
);

export const PermanentDrawer: SampleStory = (args) => (
    <Drawer {...args}>
        <View display="flex">
            <Menu label="Permanent Drawer">
                <Header>
                    <Text header={2} bold>
                        Drawer
                    </Text>
                </Header>
                <Option>First Option</Option>
                <Option>Second Option</Option>
                <Option>Third Option</Option>
            </Menu>
            <Text style={{ padding: 10 }}>
                <Text bold header={2} style={{ paddingBottom: 10 }}>
                    Hello World
                </Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
            </Text>
        </View>
    </Drawer>
);
