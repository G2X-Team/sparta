import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react';
import { action } from '@storybook/addon-actions'

import { Drawer, Props } from '../src/components/Drawer/Drawer';
import { Header, Footer, Option, Text, Divider, Button } from '../src'

const meta: Meta = {
    title: "Layout/Drawer",
    component: Drawer,
    args: {
        onClose: action("closed")
    }
}

export default meta;

const Template: Story<Props> = (args) => {
    const [open, toggleOpen] = useState(false);

    return (
        <React.Fragment>
            <Button onClick={() => toggleOpen(true)}>Click me</Button>
            <Drawer open={open} toggleOpen={() => toggleOpen(!open)} {...args}>
                <Header>
                    <Text header={1} bold>Drawer</Text>
                </Header>
                <Option>This is your first option</Option>
                <Option>This is your second option</Option>
                <Divider />
                <Option>This is your third option</Option>
                <Footer>
                    <Text color="gray" bold>This is an important text</Text>
                </Footer>
            </Drawer>
        </React.Fragment>
    )
};

const PersistentTemplate: Story<Props> = (args) => {
    const [open, toggleOpen] = useState(false);

    return (
        <React.Fragment>
            <Button onClick={() => toggleOpen(!open)}>Left</Button>
            <br />
            <br />
            <div style={{position: "relative", height: 300, width: 600, border: "1px solid gray", display: "flex"}}>
                <Drawer {...args} open={open} toggleOpen={() => toggleOpen(!open)} type="persistent" orientation="left">
                    <Header>
                        <Text header={1} bold>Drawer</Text>
                    </Header>
                    <Divider />
                    <Option>This is your first option</Option>
                    <Option>This is your second option</Option>
                    <Divider />
                    <Option>This is your third option</Option>
                    <Footer>
                        <Text color="gray" bold>This is an important text</Text>
                    </Footer>
                </Drawer>
                <Text style={{padding: 10}}>
                    <Text bold header={2}>Hello World</Text>
                    <br />
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute 
                    irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia 
                    deserunt mollit anim id est laborum.
                </Text>
            </div>
            <br />
            <br />
            <Button onClick={() => toggleOpen(!open)}>Right</Button>
            <br />
            <br />
            <div style={{position: "relative", height: 300, width: 600, border: "1px solid gray", display: "flex"}}>
                <Text style={{padding: 10}}>
                    <Text bold header={2}>Hello World</Text>
                    <br />
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute 
                    irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia 
                    deserunt mollit anim id est laborum.
                </Text>
                <Drawer {...args} open={open} toggleOpen={() => toggleOpen(!open)} type="persistent" orientation="right">
                    <Header>
                        <Text header={1} bold>Drawer</Text>
                    </Header>
                    <Divider />
                    <Option>This is your first option</Option>
                    <Option>This is your second option</Option>
                    <Divider />
                    <Option>This is your third option</Option>
                    <Footer>
                        <Text color="gray" bold>This is an important text</Text>
                    </Footer>
                </Drawer>
            </div>
            <br />
            <br />
            <Button onClick={() => toggleOpen(!open)}>Bottom</Button>
            <br />
            <br />
            <div style={{position: "relative", height: 500, width: 600, border: "1px solid gray", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                <Text style={{padding: 10}}>
                    <Text bold header={2}>Hello World</Text>
                    <br />
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute 
                    irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia 
                    deserunt mollit anim id est laborum.
                </Text>
                <Drawer {...args} open={open} toggleOpen={() => toggleOpen(!open)} type="persistent" orientation="bottom">
                    <Header>
                        <Text header={1} bold>Drawer</Text>
                    </Header>
                    <Divider />
                    <Option>This is your first option</Option>
                    <Option>This is your second option</Option>
                    <Divider />
                    <Option>This is your third option</Option>
                    <Footer>
                        <Text color="gray" bold>This is an important text</Text>
                    </Footer>
                </Drawer>
            </div>
            <br />
            <br />
            <Button onClick={() => toggleOpen(!open)}>Top</Button>
            <br />
            <br />
            <div style={{position: "relative", height: 500, width: 600, border: "1px solid gray", display: "flex", flexDirection: "column"}}>
                <Drawer {...args} open={open} toggleOpen={() => toggleOpen(!open)} type="persistent" orientation="top">
                    <Header>
                        <Text header={1} bold>Drawer</Text>
                    </Header>
                    <Divider />
                    <Option>This is your first option</Option>
                    <Option>This is your second option</Option>
                    <Divider />
                    <Option>This is your third option</Option>
                    <Footer>
                        <Text color="gray" bold>This is an important text</Text>
                    </Footer>
                </Drawer>
                <Text style={{padding: 10}}>
                    <Text bold header={2}>Hello World</Text>
                    <br />
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute 
                    irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia 
                    deserunt mollit anim id est laborum.
                </Text>
            </div>
        </React.Fragment>
    )
}

const PermanentTemplate: Story<Props> = (args) => {
    const [open, toggleOpen] = useState(false);

    return (
        <React.Fragment>
            <Text header={2} bold>Left</Text>
            <br />
            <br />
            <div style={{position: "relative", height: 300, width: 600, border: "1px solid gray", display: "flex"}}>
                <Drawer {...args} open={open} toggleOpen={() => toggleOpen(!open)} type="permanent" orientation="left">
                    <Header>
                        <Text header={1} bold>Drawer</Text>
                    </Header>
                    <Divider />
                    <Option>This is your first option</Option>
                    <Option>This is your second option</Option>
                    <Divider />
                    <Option>This is your third option</Option>
                    <Footer>
                        <Text color="gray" bold>This is an important text</Text>
                    </Footer>
                </Drawer>
                <Text style={{padding: 10}}>
                    <Text bold header={2}>Hello World</Text>
                    <br />
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute 
                    irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia 
                    deserunt mollit anim id est laborum.
                </Text>
            </div>
            <br />
            <br />
            <Text header={2} bold>Right</Text>
            <br />
            <br />
            <div style={{position: "relative", height: 300, width: 600, border: "1px solid gray", display: "flex"}}>
                <Text style={{padding: 10}}>
                    <Text bold header={2}>Hello World</Text>
                    <br />
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute 
                    irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia 
                    deserunt mollit anim id est laborum.
                </Text>
                <Drawer {...args} open={open} toggleOpen={() => toggleOpen(!open)} type="permanent" orientation="right">
                    <Header>
                        <Text header={1} bold>Drawer</Text>
                    </Header>
                    <Divider />
                    <Option>This is your first option</Option>
                    <Option>This is your second option</Option>
                    <Divider />
                    <Option>This is your third option</Option>
                    <Footer>
                        <Text color="gray" bold>This is an important text</Text>
                    </Footer>
                </Drawer>
            </div>
            <br />
            <br />
            <Text header={2} bold>Bottom</Text>
            <br />
            <br />
            <div style={{position: "relative", height: 500, width: 600, border: "1px solid gray", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                <Text style={{padding: 10}}>
                    <Text bold header={2}>Hello World</Text>
                    <br />
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute 
                    irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia 
                    deserunt mollit anim id est laborum.
                </Text>
                <Drawer {...args} open={open} toggleOpen={() => toggleOpen(!open)} type="permanent" orientation="bottom">
                    <Header>
                        <Text header={1} bold>Drawer</Text>
                    </Header>
                    <Divider />
                    <Option>This is your first option</Option>
                    <Option>This is your second option</Option>
                    <Divider />
                    <Option>This is your third option</Option>
                    <Footer>
                        <Text color="gray" bold>This is an important text</Text>
                    </Footer>
                </Drawer>
            </div>
            <br />
            <br />
            <Text header={2} bold>Top</Text>
            <br />
            <br />
            <div style={{position: "relative", height: 500, width: 600, border: "1px solid gray", display: "flex", flexDirection: "column"}}>
                <Drawer {...args} open={open} toggleOpen={() => toggleOpen(!open)} type="permanent" orientation="top">
                    <Header>
                        <Text header={1} bold>Drawer</Text>
                    </Header>
                    <Divider />
                    <Option>This is your first option</Option>
                    <Option>This is your second option</Option>
                    <Divider />
                    <Option>This is your third option</Option>
                    <Footer>
                        <Text color="gray" bold>This is an important text</Text>
                    </Footer>
                </Drawer>
                <Text style={{padding: 10}}>
                    <Text bold header={2}>Hello World</Text>
                    <br />
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute 
                    irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia 
                    deserunt mollit anim id est laborum.
                </Text>
            </div>
        </React.Fragment>
    )
}

export const Absolute = Template.bind({});
export const Persistent = PersistentTemplate.bind({});
export const Permanent = PermanentTemplate.bind({});