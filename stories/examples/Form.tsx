import React from 'react';
import type { SampleStory } from './util';
import { Form, Group, TextInput, Radio, Checkbox, Button, Switch } from '../../src';

export const BasicForm: SampleStory = (args) => {
    const onSubmit = (data): void => {
        window.alert(
            `Plain old Text Input: "${data['text-input']?.text || ''}"\n` +
                `Plain old Radios:  "${data['radios']?.radio || ''}"\n` +
                `Plain old Checkboxes: [${data['checkboxes']?.checkbox || ''}]\n` +
                `Plain old Radio:  "${data['radio']?.checked || ''}"\n` +
                `Plain old Checkbox:  "${data['checkbox']?.checked || ''}"\n` +
                `Plain old Switch:  "${data['switch']?.checked || ''}"\n`
        );
    };

    return (
        <Form onSubmit={onSubmit}>
            <Group
                type="organization"
                label="Basic Form"
                hint="Just showcasing our inputs for you :)"
            >
                <TextInput
                    label="Plain old Text Input"
                    name="text-input"
                    placeholder="Type stuff in me :)"
                />
                <Group label="Plain old Radios" name="radios">
                    <Radio value="radio 1">Radio 1</Radio>
                    <Radio value="radio 2">Radio 2</Radio>
                </Group>
                <Group label="Plain old Checkboxes" name="checkboxes">
                    <Checkbox value="checkbox 1">Checkbox 1</Checkbox>
                    <Checkbox value="checkbox 2">Checkbox 2</Checkbox>
                </Group>
                <Radio id="radio" value="lone radio">
                    Plain old Radio
                </Radio>
                <Checkbox id="checkbox" name="checkbox" value="lone checkbox">
                    Plain old Checkbox
                </Checkbox>
                <Switch name="switch" value="lone switch">
                    Plain old Switch
                </Switch>
            </Group>
            <Button>Submit</Button>
        </Form>
    );
};

export const ValidatedForm: SampleStory = (args) => {
    const onSubmit = (data): void => {
        window.alert(`password: ${data?.password?.text}`);
    };

    const onError = (errors): void => {
        window.alert(`password: ${errors?.password?.message}`);
    };

    return (
        <Form onSubmit={onSubmit} onError={onError}>
            <TextInput
                validator={(input) =>
                    input?.text.length < 5 && 'Text input must be at least 5 characters long'
                }
                name="password"
                label="Password"
                hint="must be at least 5 characters"
                password
            />
            <Button>Submit</Button>
        </Form>
    );
};

export const RemixForm: SampleStory = (args) => {
    return (
        <Form {...args}>
            <TextInput label="Username" name="username" />
            <TextInput label="Password" name="password" password />
            <Group name="rating" label="Rating" inline>
                <Radio value="1">1</Radio>
                <Radio value="2">2</Radio>
                <Radio value="3">3</Radio>
            </Group>
            <Group name="options" label="Options" inline>
                <Checkbox value="1">1</Checkbox>
                <Checkbox value="2">2</Checkbox>
                <Checkbox value="3">3</Checkbox>
            </Group>
            <Radio id="radio" name="radio" value="radio">
                Radio
            </Radio>
            <Checkbox id="checkbox" name="checkbox" value="checkbox">
                Checkbox
            </Checkbox>
            <Switch id="switch" name="switch">
                Switch
            </Switch>
        </Form>
    );
};
