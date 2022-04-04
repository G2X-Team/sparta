import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Dropdown, IDropdown } from '../src/components/Dropdown/Dropdown';
import { Option } from '../src/components/Option/Option';
import { Button } from '../src/components/Button/Button';
import { Text } from '../src/components/Text/Text';
import { Menu } from '../src/components/Menu/Menu';
import { Icon } from '../src/components/Icon/Icon';

const meta: Meta = {
    title: 'Layout/Dropdown',
    component: Dropdown,
    args: {
        menuWidth: '150px',
        name: 'dropdown',
    },
};

export default meta;

/**
 * Template Dropdown
 *
 * @param args storybook arguments
 * @return template dropdown
 */
export const Default: Story<IDropdown> = (args) => (
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
            <Menu label="Dropdown" width={150} height={200}>
                <Option>Hello</Option>
                <Option>How you doing</Option>
                <Option>How you doing</Option>
                <Option>How you doing</Option>
                <Option>How you doing</Option>
                <Option>How you doing</Option>
                <Option>How you doing</Option>
                <Option>How you doing</Option>
                <Option>How you doing</Option>
                <Option>How you doing</Option>
                <Option>How you doing</Option>
                <Option>How you doing</Option>
                <Option>How you doing</Option>
                <Option>How you doing</Option>
                <Option>How you doing</Option>
                <Option>How you doing</Option>
                <Option>How you doing</Option>
                <Option>How you doing</Option>
                <Option>How you doing</Option>
                <Option>How you doing</Option>
                <Option>How you doing</Option>
                <Option>How you doing</Option>
                <Option>Goodbye</Option>
            </Menu>
        </Dropdown>
    </div>
);

/**
 * Template Button Dropdown
 *
 * @param args storybook arguments
 * @return template button dropdown
 */
export const AnotherExample: Story<IDropdown> = (args) => (
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
            <Icon name="menu" />
            <Menu label="Dropdown" width={150} height={200}>
                <Option>Hello</Option>
                <Option>How you doing</Option>
                <Option>How you doing</Option>
                <Option>How you doing</Option>
                <Option>How you doing</Option>
                <Option>How you doing</Option>
                <Option>How you doing</Option>
                <Option>How you doing</Option>
                <Option>How you doing</Option>
                <Option>How you doing</Option>
                <Option>How you doing</Option>
                <Option>How you doing</Option>
                <Option>How you doing</Option>
                <Option>How you doing</Option>
                <Option>How you doing</Option>
                <Option>How you doing</Option>
                <Option>How you doing</Option>
                <Option>How you doing</Option>
                <Option>How you doing</Option>
                <Option>How you doing</Option>
                <Option>How you doing</Option>
                <Option>How you doing</Option>
            </Menu>
            <Option>Goodbye</Option>
        </Dropdown>
    </div>
);
