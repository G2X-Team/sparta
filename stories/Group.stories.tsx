import React from 'react';
import { Meta, Story } from '@storybook/react';

import { Props, Group } from '../src/components/Group/Group';
import { Radio, Checkbox, View } from '../src';

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
 * @return radio group
 */
export const RadioGroup = (): JSX.Element => (
    <Group name="something" type="radio" onGroupChange={onChange}>
        <Radio value="something 1">Option 1</Radio>
        <Radio value="something 2">Option 2</Radio>
        <Radio value="something 3">Option 3</Radio>
    </Group>
);

/**
 * Checkbox Group
 *
 * @return checkbox group
 */
export const CheckboxGroup = (): JSX.Element => (
    <Group name="something" type="checkbox" onGroupChange={onChange}>
        <Checkbox value="something 1">Option 1</Checkbox>
        <Checkbox value="something 2">Option 2</Checkbox>
        <Checkbox value="something 3">Option 3</Checkbox>
    </Group>
);

/**
 * Complex Group
 *
 * @return complex group
 */
export const ComplexGroup = (): JSX.Element => (
    <Group name="something" type="checkbox" onGroupChange={onChange}>
        <View>
            <Checkbox value="something 1">Option 1</Checkbox>
        </View>
        <View>
            <View>
                <Checkbox value="something 2">Option 2</Checkbox>
            </View>
        </View>
        <Checkbox value="something 3">Option 3</Checkbox>
    </Group>
);
