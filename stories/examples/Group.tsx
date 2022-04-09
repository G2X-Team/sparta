import React from 'react';
import type { SampleStory } from './util';
import { Group, Radio, Checkbox, Form, Button, FormActionData } from '../../src';

export const RadioGroup: SampleStory = (args) => (
    <Group {...args} onChange={(data) => window.alert(`Radio ${data?.target.value}: checked`)}>
        <Radio name="radio" value="1">
            Option 1
        </Radio>
        <Radio name="radio" value="2">
            Option 2
        </Radio>
        <Radio name="radio" value="3">
            Option 3
        </Radio>
    </Group>
);

export const CheckboxGroup: SampleStory = (args) => (
    <Group {...args} onChange={(data) => window.alert(`Radio ${data?.target.value}: checked`)}>
        <Checkbox name="Checkbox" value="1">
            Option 1
        </Checkbox>
        <Checkbox name="Checkbox" value="2">
            Option 2
        </Checkbox>
        <Checkbox name="Checkbox" value="3">
            Option 3
        </Checkbox>
    </Group>
);

export const GroupInClientForm: SampleStory = (args) => {
    const onSubmit = (data): void =>
        window.alert(
            `Radios value: ${data.radios.radio}\n` +
                `Checkboxes values: [${data.checkboxes.checkbox || ''}]`
        );

    return (
        <Form onSubmit={onSubmit}>
            <Group label="Radios" name="radios" hint="Choose any option you like">
                <Radio value="1">Option 1</Radio>
                <Radio value="2">Option 2</Radio>
                <Radio value="3">Option 3</Radio>
            </Group>
            <Group label="Checkboxes" name="checkboxes" hint="Choose any option you like">
                <Checkbox value="1">Option 1</Checkbox>
                <Checkbox value="2">Option 2</Checkbox>
                <Checkbox value="3">Option 3</Checkbox>
            </Group>
            <Button>Submit</Button>
        </Form>
    );
};

export const GroupInRemixForm: SampleStory = (args) => {
    const actionData: FormActionData = {
        fields: { radios: '1', checkboxes: ['1', '2'] },
        fieldErrors: {
            checkboxes: 'All three checkboxes should be checked',
        },
    };

    return (
        <Form type="remix" actionData={actionData}>
            <Group label="Radios" name="radios" hint="Choose any option you like">
                <Radio value="1">Option 1</Radio>
                <Radio value="2">Option 2</Radio>
                <Radio value="3">Option 3</Radio>
            </Group>
            <Group label="Checkboxes" name="checkboxes" hint="Choose any option you like">
                <Checkbox value="1">Option 1</Checkbox>
                <Checkbox value="2">Option 2</Checkbox>
                <Checkbox value="3">Option 3</Checkbox>
            </Group>
            <Button>Submit</Button>
        </Form>
    );
};
