import React from 'react';
import { Meta, Story } from '@storybook/react';

import { Form, Props } from '../src/components/Form/Form';
import { Button, TextInput, Text, Group, Radio, Checkbox, Switch } from '../src';

const meta: Meta = {
    title: 'Form/Form',
    component: Form,
};

export default meta;

/**
 * Checks if the password matches the validator requirements
 *
 * @param value value in the input
 * @return object describing validaty and errors
 */
const passwordValidator = (value: string): string | null => {
    if (value.length < 8) return 'Password must be 8 characters';

    return null;
};

/**
 * Default form
 *
 * @return Default form
 */
export const TextInputForm = (): JSX.Element => {
    console.log('component-refresh');
    return (
        <Form onSubmit={(event, value) => window.alert('Success!')}>
            <Text header={1} bold margins>
                Log in
            </Text>
            <TextInput label="Username" name="username" required placeholder="UserName" />
            <TextInput
                label="Password"
                hint="Password must be 8 characters long"
                password
                required
                name="password"
                placeholder="********"
                validator={passwordValidator}
            />
            <Button>Submit</Button>
        </Form>
    );
};

/**
 * Checks if the appropriate number of checkboxes are ticked
 *
 * @param value checkbox string
 * @return error message if applicable
 */
const checkboxValidator = (value: string | string[]): string | null => {
    return value.length < 2 ? 'Please select at least 2 options' : null;
};

/**
 * Group form
 *
 * @return group form
 */
export const GroupForm = (): JSX.Element => (
    <Form
        onSubmit={(event, value) => window.alert('Success!')}
        onChange={(value) => console.log(value)}
    >
        <Group
            label="Options for stuff"
            required
            type="checkbox"
            name="options"
            validator={checkboxValidator}
        >
            <Checkbox value="option-1">Option 1</Checkbox>
            <Checkbox value="option-2">Option 2</Checkbox>
            <Checkbox value="option-3">Option 3</Checkbox>
        </Group>
        <Button>Submit</Button>
    </Form>
);

/**
 * Switch form
 *
 * @return switch form
 */
export const SwitchForm = (): JSX.Element => (
    <Form
        onSubmit={(event, value) => window.alert('Success!')}
        onChange={(value) => console.log(value)}
    >
        <Switch name="switch">Hello World</Switch>
        <Button>Submit</Button>
    </Form>
);

/**
 * Form Example
 *
 * @return Example Form
 */
export const ExampleForm = (): JSX.Element => (
    <Form
        onSubmit={(event, value) => window.alert('Success!')}
        onChange={(value) => console.log(value)}
    >
        <Text header={1} bold margins>
            Survey
        </Text>
        <TextInput label="Full Name" name="full-name" required placeholder="John Smith" />
        <TextInput
            label="Survey Password"
            hint="Please enter given 8 character password."
            password
            required
            name="password"
            placeholder="********"
            validator={passwordValidator}
        />
        <Group label="What video(s) did you watch for class" name="movie" type="checkbox" required>
            <Checkbox value="the-night-before-christmas">The Night Before Christmas</Checkbox>
            <br />
            <Checkbox value="jack-frost">Jack Frost</Checkbox>
            <br />
            <Checkbox value="frosty-the-snowman">Frosty the Snowman</Checkbox>
            <br />
        </Group>
        <Group label="Please rate the class from 1-5" name="rating" type="radio" required>
            <Radio value="1">1</Radio>
            <Radio value="2">2</Radio>
            <Radio value="3">3</Radio>
            <Radio value="4">4</Radio>
            <Radio value="5">5</Radio>
        </Group>
        <Switch name="do-again">What you like to do this again?</Switch>
        <Button>Submit</Button>
    </Form>
);
