import React from 'react';
import { Meta, Story } from '@storybook/react';

import { Props, Group } from '../src/components/Group/Group';
import { Radio, Checkbox, View, TextInput } from '../src';

const meta: Meta = {
    title: 'Form/Group',
    component: Group,
};

export default meta;

/**
 * On change callback method
 *
 * @param groupValue value of the group
 */
const onChange = (groupValue: string | string[]): void => {
    console.log(groupValue);
};

/**
 * Radio Group
 *
 * @param args arguments
 * @return radio group
 */
const RadioTemplate: Story<Props> = (args): JSX.Element => (
    <Group {...args} name="something">
        <Radio value="something 1">Option 1</Radio>
        <Radio value="something 2">Option 2</Radio>
        <Radio value="something 3">Option 3</Radio>
    </Group>
);

/**
 * Radio Group
 *
 * @param args arguments
 * @return radio group
 */
const CheckboxTemplate: Story<Props> = (args): JSX.Element => (
    <Group {...args} name="something">
        <Checkbox value="something 1">Option 1</Checkbox>
        <Checkbox value="something 2">Option 2</Checkbox>
        <Checkbox value="something 3">Option 3</Checkbox>
    </Group>
);

/**
 * Checkbox Group
 *
 * @return checkbox group
 */
export const RadioGroup = RadioTemplate.bind({});
RadioGroup.args = {
    label: 'Radio Group',
    hint: 'Select one option',
};

/**
 * Checkbox Group
 *
 * @return checkbox group
 */
export const CheckboxGroup = CheckboxTemplate.bind({});
CheckboxGroup.args = {
    label: 'Checkbox Group',
    hint: 'Select multiple options',
};

/**
 * Complex Group
 *
 * @return complex group
 */
export const OrganizationGroup = (): JSX.Element => (
    <Group
        label="Survey"
        type="organization"
        hint="Please fill out the following survey"
        name="something"
    >
        <TextInput label="First Name" placeholder="John" />
        <TextInput label="Last Name" placeholder="Smith" />
        <TextInput label="Favorite Food" hint="Don't be shy ;)" placeholder="Apples" />
    </Group>
);
