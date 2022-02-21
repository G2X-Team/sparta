import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Form, Props } from '../src/components/NewForm/Form';
import { TextInput, Text, Button } from '../src';

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
const Template: Story<Props> = (args) => {
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

export const ClientSide = Template.bind({});
