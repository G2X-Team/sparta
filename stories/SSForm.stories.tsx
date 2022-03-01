import React from 'react';

import { Story, Meta } from '@storybook/react';

import type { Props } from '../src/components/Form/Form';
import { Form, TextInput, Button } from '../src';
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
    },
};

/**
 * Template for testing form inputs
 *
 * @param args storybook arguments
 * @return text input form template
 */
const TextInputFormTepmlate: Story<Props> = (args) => (
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
