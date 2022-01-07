import React from 'react';
import { NavigationBar, Props } from '../src/components/NavigationBar/NavigationBar';
import { Story, Meta } from '@storybook/react';
import { Section, Text, Dropdown, Button, Icon, Option } from '../src';

const meta: Meta = {
    title: 'Layout/Navigation Bar',
    component: NavigationBar,
};

export default meta;

/**
 * Template of navigation bar
 *
 * @param args arguments for navigation bar
 * @return template of Navigation bar
 */
const Template: Story<Props> = (args) => (
    <div
        style={{
            position: 'relative',
            height: 400,
            width: 700,
            display: 'flex',
            flexDirection: 'column',
        }}
    >
        {/* Implementation Start*/}
        <NavigationBar {...args} titleElement="Navigation Bar">
            <Section navigation>
                <Option>Pages</Option>
            </Section>
            <Section justifyContent="end" alignItems="center">
                <Dropdown alignment="right">
                    <Button>
                        <Icon name="account_circle" style={{ fontSize: '2rem' }} clickable />
                    </Button>
                    <Option>Option 1</Option>
                    <Option>Option 2</Option>
                    <Option>Option 3</Option>
                    <Option>Option 4</Option>
                </Dropdown>
            </Section>
        </NavigationBar>
        {/* Implentation End */}

        <Section
            alignItems="center"
            justifyContent="space-around"
            style={{ background: 'lightgray' }}
        >
            <Text header={2} bold>
                This is the Viewport
            </Text>
        </Section>
    </div>
);

export const StaticNavigationBar = Template.bind({});
