import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Form, Props } from '../src/components/NewForm/Form';
import { TextInput, Text, Button, Group, Radio, Checkbox, Switch } from '../src';

const meta: Meta = {
    title: 'Form/New Form',
    component: Form,
};

export default meta;

/**
 * Checks if the password matches the validator requirements
 *
 * @param value value in the input
 * @return object describing validaty and errors
 */
const passwordValidator = (value: string): string =>
    value.length < 8 && 'Password must be 8 characters';

/**
 * Form Template
 *
 * @param args storybook arguments
 * @return storybook template
 */
const TextInputFormTemplate: Story<Props> = (args) => {
    return (
        <Form onSubmit={(data) => console.log(data)} onError={(data) => console.log(data)}>
            <Text header={1} bold margins>
                Log in
            </Text>
            <TextInput required name="username" label="Username" placeholder="Enter Username" />
            <TextInput
                required
                password
                label="Password"
                hint="Password must be 8 characters long"
                name="password"
                placeholder="********"
                validator={passwordValidator}
            />
            <Button>Submit</Button>
        </Form>
    );
};

export const TextInputForm = TextInputFormTemplate.bind({});

/**
 * Form Example
 *
 * @return Example Form
 */
export const ExampleForm = (): JSX.Element => (
    <Form onSubmit={(data) => console.log(data)} onError={(errors) => console.log(errors)}>
        <Group label="Survey" name="survey" type="organization">
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
            <Group label="What video(s) did you watch for class" name="movie" required>
                <Checkbox value="the-night-before-christmas">The Night Before Christmas</Checkbox>
                <Checkbox value="jack-frost">Jack Frost</Checkbox>
                <Checkbox value="frosty-the-snowman">Frosty the Snowman</Checkbox>
            </Group>
            <Group required label="Please rate the class from 1-5" name="rating" inline>
                <Radio value="1">1</Radio>
                <Radio value="2">2</Radio>
                <Radio value="3">3</Radio>
                <Radio value="4">4</Radio>
                <Radio value="5">5</Radio>
            </Group>
            <Switch name="do-again">What you like to do this again?</Switch>
        </Group>
        <Button>Submit</Button>
    </Form>
);
