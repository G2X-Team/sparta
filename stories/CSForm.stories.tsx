import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Form, Props } from '../src/components/Form/Form';
import { TextInput, Button, Group, Radio, Checkbox, Switch } from '../src';
import { FormValidator } from '../src/interfaces/Properties';

const meta: Meta = {
    title: 'Form/Client Side Form',
    component: Form,
};

export default meta;

/**
 * Checks if the password matches the validator requirements
 *
 * @param data value in the input
 * @return object describing validaty and errors
 */
const passwordValidator: FormValidator = (data) =>
    data.text.length < 8 && 'Password must be 8 characters';

/**
 * Form Template
 *
 * @param args storybook arguments
 * @return storybook template
 */
const TextInputFormTemplate: Story<Props> = (args) => {
    return (
        <Form
            onError={(data) => console.log(data)}
            onSubmit={(data) =>
                window.alert(`username: ${data.username.text}\npassword: ${data.password.text}`)
            }
        >
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
 * Form Template
 *
 * @param args storybook arguments
 * @return storybook template
 */
const RadioGroupFormTemplate: Story<Props> = (args) => {
    return (
        <Form
            onSubmit={(data) => window.alert(data.rating.radio)}
            onError={(data) => console.log(data)}
        >
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

/**
 * Form Template
 *
 * @param args storybook arguments
 * @return storybook template
 */
const CheckboxGroupFormTemplate: Story<Props> = (args) => {
    return (
        <Form
            onSubmit={(data) => window.alert(data.rating.checkbox)}
            onError={(data) => console.log(data)}
        >
            <Group required label="Select options" name="rating">
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

/**
 * Form Template
 *
 * @param args storybook arguments
 * @return storybook template
 */
const IndividualInputFormTemplate: Story<Props> = (args) => {
    return (
        <Form
            onSubmit={(data) => window.alert(data.rating.checkbox)}
            onError={(data) => console.log(data)}
        >
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

/**
 * Form Example
 *
 * @return Example Form
 */
export const ExampleForm = (): JSX.Element => (
    <Form onSubmit={(data) => console.log(data)} onError={(errors) => console.log(errors)}>
        <Group label="Survey" hint="This survey will help us gather info" type="organization">
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
