import React from 'react';

import { Story, Meta } from '@storybook/react';

import type { IForm } from '../src/components/Form/Form';
import { Form, TextInput, Button, Group, Radio, Checkbox, Switch } from '../src';
import { FormActionData } from '../src/interfaces/Properties';

const meta: Meta = {
    title: 'Form/Server Side Form',
    component: Form,
    args: {
        type: 'remix',
    },
};

export default meta;

const validActionData: FormActionData = {
    fields: {
        username: 'john-cena',
        password: 'youcantseeme',
        rating: '1',
        options: ['1'],
        radio: true,
        checkbox: true,
        switch: true,
    },
};

/**
 * Template for testing form inputs
 *
 * @param args storybook arguments
 * @return text input form template
 */
const TextInputFormTepmlate: Story<IForm> = (args) => (
    <Form {...args}>
        <TextInput label="Username" name="username" />
        <TextInput label="Password" name="password" password />
        <Button>Submit</Button>
    </Form>
);

export const TextInputForm = TextInputFormTepmlate.bind({});
TextInputForm.args = {
    actionData: validActionData,
};

/**
 * Form Template
 *
 * @param args storybook arguments
 * @return storybook template
 */
const RadioGroupFormTemplate: Story<IForm> = (args) => {
    return (
        <Form {...args}>
            <Group required label="Please rate the class from 1-5" name="rating" inline>
                <Radio value="1">1</Radio>
                <Radio value="2">2</Radio>
                <Radio value="3">3</Radio>
                <Radio value="4">4</Radio>
                <Radio value="5">5</Radio>
            </Group>
            <Button>Submit</Button>
        </Form>
    );
};

export const RadioGroupForm = RadioGroupFormTemplate.bind({});
RadioGroupForm.args = {
    actionData: validActionData,
};

/**
 * Form Template
 *
 * @param args storybook arguments
 * @return storybook template
 */
const CheckboxGroupFormTemplate: Story<IForm> = (args) => {
    return (
        <Form {...args}>
            <Group required label="Select options" name="options">
                <Checkbox value="1">Option 1</Checkbox>
                <Checkbox value="2">Option 2</Checkbox>
                <Checkbox value="3">Option 3</Checkbox>
                <Checkbox value="4">Option 4</Checkbox>
                <Checkbox value="5">Option 5</Checkbox>
            </Group>
            <Button>Submit</Button>
        </Form>
    );
};

export const CheckboxGroupForm = CheckboxGroupFormTemplate.bind({});
CheckboxGroupForm.args = {
    actionData: validActionData,
};

/**
 * Form Template
 *
 * @param args storybook arguments
 * @return storybook template
 */
const IndividualInputFormTemplate: Story<IForm> = (args) => {
    return (
        <Form {...args}>
            <Radio required id="radio" value="radio">
                Sup
            </Radio>
            <Checkbox required name="checkbox" id="checkbox" value="checkbox">
                Sup
            </Checkbox>
            <Switch required name="switch" id="switch" value="switch">
                Sup
            </Switch>
            <Button>Submit</Button>
        </Form>
    );
};

export const IndividualInputForm = IndividualInputFormTemplate.bind({});
IndividualInputForm.args = {
    actionData: validActionData,
};
