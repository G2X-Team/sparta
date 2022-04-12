import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations);

import { act } from 'react-dom/test-utils';

import { Form, TextInput, Switch, Radio, Checkbox, Group, Button } from '../src';
import { FormActionData, FormValidator } from '../src/interfaces/Properties';

// error message when test validator doesn't pass input
const passwordError = 'Needs to be 5 characters in length at least';
const groupError = 'somethings is required, please select an option.';

/**
 * Validator that test on submit functionality
 *
 * @param data value of input
 * @return error message if there is one
 */
const testValidator: FormValidator = (data) => {
    return (data?.text?.length || 0) < 5 ? passwordError : null;
};

/**
 * Validator that will test on submit functionality when groups are involved
 *
 * @param data data of checkbox group
 * @return error message if there is one
 */
const checkboxValidator: FormValidator = (data) => {
    return (data?.checkbox?.length || 0) < 2 ? groupError : null;
};

const validActionData: FormActionData = {
    fields: {
        input: 'input',
        radioGroup: 'option-1',
        checkboxGroup: ['checkbox-1', 'checkbox-2'],
        checkbox: true,
        radio: true,
        switch: true,
    },
};

const invalidActionData: FormActionData = {
    fieldErrors: {
        input: 'failed',
        radioGroup: 'failed',
        checkboxGroup: 'failed',
        checkbox: 'failed',
        radio: 'failed',
    },
};

describe('Client Side Form', () => {
    it('complies with WCAG', async () => {
        // given
        const { container: validForm } = render(
            <Form>
                <Group name="group-1" label="options">
                    <Radio value="option-1">Option 1</Radio>
                    <Radio value="option-2">Option 2</Radio>
                </Group>
                <Group name="group-2" label="checkboxes">
                    <Checkbox value="checkbox-1">Checkbox 1</Checkbox>
                    <Checkbox value="checkbox-2">Checkbox 2</Checkbox>
                </Group>
                <Checkbox id="checkbox 1" value="checkbox">
                    Checkbox
                </Checkbox>
                <Radio id="radio 1" value="option">
                    Option
                </Radio>
                <TextInput label="input" name="some-input" />
                <Switch name="switch" value="switch-1">
                    Switch 1
                </Switch>
            </Form>
        );

        const { container: invalidForm } = render(
            <Form>
                <Group name="options" label="options" invalid errorMessage="failed">
                    <Radio value="option-1">Option 1</Radio>
                    <Radio value="option-2">Option 2</Radio>
                </Group>
                <Group name="checkboxes" label="checkboxes" invalid errorMessage="failed">
                    <Checkbox value="checkbox-1">Checkbox 1</Checkbox>
                    <Checkbox value="checkbox-2">Checkbox 2</Checkbox>
                </Group>
                <Checkbox value="checkbox" id="checkbox 2" invalid errorMessage="failed">
                    Checkbox
                </Checkbox>
                <Radio value="option" id="radio 2" invalid errorMessage="failed">
                    Option
                </Radio>
                <TextInput label="input" name="input" invalid errorMessage="failed" />
            </Form>
        );

        // when
        const results = [];
        results[0] = await axe(validForm);
        results[1] = await axe(invalidForm);

        // then
        results.forEach((result: any) => expect(result).toHaveNoViolations());
    });

    it('displays all default values correctly', () => {
        // given
        render(
            <Form>
                <Group
                    name="radioGroup"
                    label="options"
                    defaultValue={validActionData?.fields?.radioGroup}
                >
                    <Radio value="option-1">Option 1</Radio>
                    <Radio value="option-2">Option 2</Radio>
                </Group>
                <Group
                    name="checkboxGroup"
                    label="checkboxes"
                    defaultValue={validActionData?.fields?.checkboxGroup}
                >
                    <Checkbox value="checkbox-1">Checkbox 1</Checkbox>
                    <Checkbox value="checkbox-2">Checkbox 2</Checkbox>
                </Group>
                <Checkbox
                    id="checkbox"
                    value="checkbox"
                    defaultChecked={validActionData?.fields?.checkbox}
                >
                    Checkbox single
                </Checkbox>
                <Radio id="radio" value="radio" defaultChecked={validActionData?.fields?.radio}>
                    Radio single
                </Radio>
                <TextInput
                    label="input"
                    name="input"
                    defaultValue={validActionData?.fields?.input}
                />
                <Switch
                    name="switch"
                    value="switch-1"
                    defaultChecked={validActionData?.fields?.switch}
                >
                    Switch
                </Switch>
            </Form>
        );

        // when then
        expect(screen.getByDisplayValue(/input/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/option 1/i)).toBeChecked();
        expect(screen.getByLabelText(/option 2/i)).not.toBeChecked();
        expect(screen.getByLabelText(/checkbox 1/i)).toBeChecked();
        expect(screen.getByLabelText(/checkbox 2/i)).toBeChecked();
        expect(screen.getByLabelText(/checkbox single/i)).toBeChecked();
        expect(screen.getByLabelText(/radio single/i)).toBeChecked();
        expect(screen.getByLabelText(/switch/i)).toBeChecked();
    });

    it('will submit when there are no requirements', async () => {
        // given
        const onSubmit: jest.Mock<any, any> = jest.fn();
        const username = 'username';
        const password = 'password';
        const expected = {
            username: { text: username },
            password: { text: password },
        };

        render(
            <Form onSubmit={onSubmit}>
                <TextInput label="label" name="username" placeholder="UserName" />
                <TextInput label="label" name="password" placeholder="password" password />
                <Button>Submit</Button>
            </Form>
        );

        // when
        await act(async () => {
            userEvent.type(screen.getByPlaceholderText(/username/i), username);
            userEvent.type(screen.getByPlaceholderText(/password/i), password);
            userEvent.click(screen.getByText(/submit/i));
        });

        // then
        expect(onSubmit).toBeCalledWith(expect.objectContaining(expected), expect.anything());
    });

    it('will not submit if form has missing required fields', async () => {
        // given
        const onError: jest.Mock<any, any> = jest.fn();
        const onSubmit: jest.Mock<any, any> = jest.fn();
        const expected = {
            password: {
                message: 'label is required.',
                ref: expect.anything(),
                type: 'required',
            },
            username: {
                message: 'label is required.',
                ref: expect.anything(),
                type: 'required',
            },
        };

        render(
            <Form onSubmit={onSubmit} onError={onError} type="client">
                <TextInput label="label" required name="username" placeholder="UserName" />
                <TextInput label="label" required name="password" placeholder="password" password />
                <Button>Submit</Button>
            </Form>
        );

        // when
        await act(async () => {
            userEvent.click(screen.getByText(/submit/i));
        });

        // then
        expect(onSubmit).not.toHaveBeenCalled();
        expect(onError).toHaveBeenCalledWith(expect.objectContaining(expected), expect.anything());
    });

    it('will not submit there are missing required fields with actionData', async () => {
        // given
        const onError: jest.Mock<any, any> = jest.fn();
        const onSubmit: jest.Mock<any, any> = jest.fn();
        const expected = {
            password: {
                message: 'label is required.',
                ref: expect.anything(),
                type: 'required',
            },
            username: {
                message: 'label is required.',
                ref: expect.anything(),
                type: 'required',
            },
        };

        render(
            <Form onSubmit={onSubmit} onError={onError} actionData={{ fields: {} }} type="client">
                <TextInput label="label" required name="username" placeholder="UserName" />
                <TextInput label="label" required name="password" placeholder="password" password />
                <Button>Submit</Button>
            </Form>
        );

        // when
        await act(async () => {
            onError(expect.objectContaining(expected), expect.anything());
        });

        // then
        expect(onSubmit).not.toHaveBeenCalled();
        expect(onError).toHaveBeenCalledWith(expect.objectContaining(expected), expect.anything());
    });

    it('will not submit if an input is required and the user removes all the text', async () => {
        // given
        const onError: jest.Mock<any, any> = jest.fn();
        const onSubmit: jest.Mock<any, any> = jest.fn();
        const expected = {
            password: {
                message: 'label is required.',
                ref: expect.anything(),
                type: 'validator', // this is because the validator catches cleared requirements
            },
        };

        render(
            <Form onSubmit={onSubmit} onError={onError} type="client">
                <TextInput
                    label="label"
                    required
                    name="password"
                    placeholder="password"
                    password
                    defaultValue="something"
                />
                <Button>Submit</Button>
            </Form>
        );

        // when
        await act(async () => {
            userEvent.clear(screen.getByPlaceholderText(/password/i));
            userEvent.click(screen.getByText(/submit/i));
        });

        // then
        expect(onSubmit).not.toHaveBeenCalled();
        expect(onError).toHaveBeenCalledWith(expect.objectContaining(expected), expect.anything());
    });

    it('will show error if input is required and user clears all action data text ', () => {
        // given
        const actionData = {
            fields: {
                password: 'password',
            },
        };

        render(
            <Form actionData={actionData}>
                <TextInput
                    label="Password"
                    required
                    name="password"
                    placeholder="password"
                    password
                />
                <Button>Submit</Button>
            </Form>
        );

        // when
        userEvent.clear(screen.getByLabelText(/password/i));

        // then
        expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    });

    it('will not submit if text input with match property does not match', async () => {
        // given
        const onError: jest.Mock<any, any> = jest.fn();
        const onSubmit: jest.Mock<any, any> = jest.fn();
        const expected = {
            confirmPassword: {
                message: 'Passwords do not match.',
                ref: expect.anything(),
                type: 'validator',
            },
        };

        render(
            <Form onSubmit={onSubmit} onError={onError} type="client">
                <TextInput
                    label="Password"
                    required
                    name="password"
                    placeholder="password OG"
                    password
                    match="password"
                />
                <TextInput
                    label="Confirm Password"
                    name="confirmPassword"
                    placeholder="confirm password"
                    password
                    match="password"
                    matchMessage="Passwords do not match."
                />
                <Button>Submit</Button>
            </Form>
        );

        // when
        await act(async () => {
            userEvent.type(screen.getByPlaceholderText(/password og/i), 'password');
            userEvent.click(screen.getByText(/submit/i));
        });

        // then
        expect(onSubmit).not.toHaveBeenCalled();
        expect(onError).toHaveBeenCalledWith(expect.objectContaining(expected), expect.anything());
    });

    it('will not submit if an input with a validator does not meet requirements', async () => {
        // given
        const onSubmit: jest.Mock<any, any> = jest.fn();
        const onError: jest.Mock<any, any> = jest.fn();
        const invalidPassword = '32f';
        const expected = {
            password: {
                message: passwordError,
                ref: expect.anything(),
                type: 'validator',
            },
        };

        render(
            <Form onSubmit={onSubmit} onError={onError}>
                <TextInput label="label" name="username" placeholder="UserName" />
                <TextInput
                    label="label"
                    required
                    name="password"
                    placeholder="password"
                    password
                    validator={testValidator}
                />
                <Button>Submit</Button>
            </Form>
        );

        // when
        await act(async () => {
            userEvent.type(screen.getByPlaceholderText(/password/i), invalidPassword);
            userEvent.click(screen.getByText(/submit/i));
        });

        // then
        expect(onSubmit).not.toHaveBeenCalled();
        expect(onError).toHaveBeenCalledWith(expect.objectContaining(expected), expect.anything());
    });

    it('will submit if validator requirements are met', async () => {
        // given
        const onSubmit: jest.Mock<any, any> = jest.fn();
        const onError: jest.Mock<any, any> = jest.fn();
        const password = 'password';
        const expected = {
            password: { text: password },
        };

        render(
            <Form onSubmit={onSubmit} onError={onError}>
                <TextInput
                    label="label"
                    required
                    name="password"
                    placeholder="password"
                    password
                    validator={testValidator}
                />
                <Button>Submit</Button>
            </Form>
        );

        // when
        await act(async () => {
            userEvent.type(screen.getByPlaceholderText('password'), password);
            userEvent.click(screen.getByText(/submit/i));
        });

        // then
        expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining(expected), expect.anything());
        expect(onError).not.toHaveBeenCalledWith();
    });

    it('will submit if input matches the text its supposed to match', async () => {
        // given
        const onSubmit: jest.Mock<any, any> = jest.fn();
        const onError: jest.Mock<any, any> = jest.fn();
        const password = 'password';
        const expected = {
            password: { text: password },
            'match password': { text: password },
        };

        render(
            <Form onSubmit={onSubmit} onError={onError}>
                <TextInput
                    label="label"
                    required
                    name="password"
                    placeholder="password og"
                    password
                />
                <TextInput
                    label="match"
                    required
                    name="match password"
                    placeholder="match password"
                    password
                    match="password"
                />
                <Button>Submit</Button>
            </Form>
        );

        // when
        await act(async () => {
            userEvent.type(screen.getByPlaceholderText(/password og/i), password);
            userEvent.type(screen.getByPlaceholderText(/match password/i), password);
            userEvent.click(screen.getByText(/submit/i));
        });

        // then expect
        expect(onError).not.toHaveBeenCalled();
        expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining(expected), expect.anything());
    });

    it('will retain the text input on change callback', () => {
        // given
        const onChange: jest.Mock<any, any> = jest.fn();
        const password = 'password';
        render(
            <Form>
                <TextInput
                    label="label"
                    required
                    name="password"
                    placeholder="password"
                    password
                    onChange={onChange}
                    validator={testValidator}
                />
                <Button>Submit</Button>
            </Form>
        );

        // when
        userEvent.type(screen.getByPlaceholderText('password'), password);

        // then
        expect(onChange).toHaveBeenCalled();
    });

    it('will not submit if group validator does not meet requirements', async () => {
        // given
        const onError: jest.Mock<any, any> = jest.fn();
        const onSubmit: jest.Mock<any, any> = jest.fn();
        const expected = {
            somethings: {
                message: groupError,
                ref: expect.anything(),
                type: 'validator',
            },
        };

        render(
            <Form onSubmit={onSubmit} onError={onError}>
                <Group label="label" name="somethings" validator={checkboxValidator}>
                    <Checkbox value="something-1">Something 1</Checkbox>
                    <Checkbox value="something-2">Something 2</Checkbox>
                </Group>
                <Button>Submit</Button>
            </Form>
        );

        // when
        await act(async () => {
            userEvent.click(screen.getByText(/something 1/i));
            userEvent.click(screen.getByText(/submit/i));
        });

        // then
        expect(onSubmit).not.toHaveBeenCalled();
        expect(onError).toHaveBeenCalledWith(expect.objectContaining(expected), expect.anything());
    });

    it('will not submit if no checkbox is marked and its a required group', async () => {
        // given
        const onError: jest.Mock<any, any> = jest.fn();
        const onSubmit: jest.Mock<any, any> = jest.fn();
        const expected = {
            somethings: {
                message: 'somethings is required, please select an option.',
                ref: expect.anything(),
                type: 'validator',
            },
        };

        render(
            <Form onSubmit={onSubmit} onError={onError}>
                <Group label="label" name="somethings" validator={checkboxValidator}>
                    <Checkbox value="something-1">Something 1</Checkbox>
                    <Checkbox value="something-2">Something 2</Checkbox>
                </Group>
                <Button>Submit</Button>
            </Form>
        );

        await act(async () => {
            userEvent.click(screen.getByText(/submit/i));
        });

        // when then
        expect(onSubmit).not.toHaveBeenCalled();
        expect(onError).toHaveBeenCalledWith(expect.objectContaining(expected), expect.anything());
    });

    it('will register boolean input changes in the form value', async () => {
        // given
        const onSubmit: jest.Mock<any, any> = jest.fn();
        const onError: jest.Mock<any, any> = jest.fn();
        const expected = {
            switch: { checked: true },
            checkbox: { checked: true },
            radio: { checked: true },
        };

        render(
            <Form onSubmit={onSubmit} onError={onError}>
                <Switch name="switch">Switch</Switch>
                <Radio id="radio" value="radio">
                    Radio
                </Radio>
                <Checkbox id="checkbox" value="checkbox">
                    Checkbox
                </Checkbox>
                <Button>Submit</Button>
            </Form>
        );

        // when
        await act(async () => {
            userEvent.click(screen.getByText(/switch/i));
            userEvent.click(screen.getByText(/checkbox/i));
            userEvent.click(screen.getByText(/radio/i));
            userEvent.click(screen.getByText(/submit/i));
        });

        // then
        expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining(expected), expect.anything());
        expect(onError).not.toHaveBeenCalled();
    });

    it('will not submit if there are required unchecked boolean inputs', async () => {
        // given
        const onSubmit: jest.Mock<any, any> = jest.fn();
        const onError: jest.Mock<any, any> = jest.fn();
        const expected = {
            checkbox: {
                message: 'This input is required.',
                ref: expect.anything(),
                type: 'required',
            },
            radio: {
                message: 'This input is required.',
                ref: expect.anything(),
                type: 'required',
            },
        };

        render(
            <Form onSubmit={onSubmit} onError={onError}>
                <Radio id="radio" value="radio" required>
                    Radio
                </Radio>
                <Checkbox id="checkbox" value="checkbox" required>
                    Checkbox
                </Checkbox>
                <Button>Submit</Button>
            </Form>
        );

        // when
        await act(async () => {
            userEvent.click(screen.getByText(/submit/i));
        });

        // then
        expect(onError).toHaveBeenCalledWith(expect.objectContaining(expected), expect.anything());
        expect(onSubmit).not.toHaveBeenCalled();
    });

    it('will not submit form when a submission method is provided', () => {
        // given
        const event = new Event('submit');
        event.preventDefault = jest.fn();
        render(
            <Form method="POST" action="https://example.com">
                <TextInput label="label" required name="password" placeholder="password" />
                <Button>Submit</Button>
            </Form>
        );

        // when
        const form = screen.getByRole('textbox').parentElement?.parentElement;
        if (!form) throw new Error("Couldn't find form");
        form.dispatchEvent(event);

        // then
        expect(event.preventDefault).not.toHaveBeenCalled();
    });

    it('displays all action data values correctly', () => {
        // given
        render(
            <Form actionData={validActionData}>
                <Group name="radioGroup" label="options">
                    <Radio value="option-1">Option 1</Radio>
                    <Radio value="option-2">Option 2</Radio>
                </Group>
                <Group name="checkboxGroup" label="checkboxes">
                    <Checkbox value="checkbox-1">Checkbox 1</Checkbox>
                    <Checkbox value="checkbox-2">Checkbox 2</Checkbox>
                </Group>
                <Checkbox id="checkbox" value="checkbox">
                    Checkbox single
                </Checkbox>
                <Radio id="radio" value="radio">
                    Radio single
                </Radio>
                <TextInput label="input" name="input" />
                <Switch name="switch" value="switch-1">
                    Switch
                </Switch>
            </Form>
        );

        // when then
        expect(screen.getByDisplayValue(/input/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/option 1/i)).toBeChecked();
        expect(screen.getByLabelText(/option 2/i)).not.toBeChecked();
        expect(screen.getByLabelText(/checkbox 1/i)).toBeChecked();
        expect(screen.getByLabelText(/checkbox 2/i)).toBeChecked();
        expect(screen.getByLabelText(/checkbox single/i)).toBeChecked();
        expect(screen.getByLabelText(/radio single/i)).toBeChecked();
        expect(screen.getByLabelText(/switch/i)).toBeChecked();
    });

    it('renders error messages when invalid', () => {
        // given
        render(
            <Form type="remix" actionData={invalidActionData}>
                <Group name="radioGroup" label="options">
                    <Radio value="option-1">Option 1</Radio>
                    <Radio value="option-2">Option 2</Radio>
                </Group>
                <Group name="checkboxGroup" label="checkboxes">
                    <Checkbox value="checkbox-1">Checkbox 1</Checkbox>
                    <Checkbox value="checkbox-2">Checkbox 2</Checkbox>
                </Group>
                <Checkbox id="checkbox" value="checkbox">
                    Checkbox
                </Checkbox>
                <Radio id="radio" value="radio">
                    Option
                </Radio>
                <TextInput label="input" name="input" />
                <Switch name="switch" value="switch">
                    Switch
                </Switch>
            </Form>
        );

        // when then
        expect(screen.queryAllByText(/failed/i)).toHaveLength(5);
    });
});

describe('Server Side Form', () => {
    it('complies with WCAG 2.0', async () => {
        // given
        const { container: validForm } = render(
            <Form type="remix" actionData={validActionData}>
                <Group name="group-1" label="options">
                    <Radio value="option-1">Option 1</Radio>
                    <Radio value="option-2">Option 2</Radio>
                </Group>
                <Group name="group-2" label="checkboxes">
                    <Checkbox value="checkbox-1">Checkbox 1</Checkbox>
                    <Checkbox value="checkbox-2">Checkbox 2</Checkbox>
                </Group>
                <Checkbox id="checkbox 1" value="checkbox">
                    Checkbox
                </Checkbox>
                <Radio id="radio 1" value="option">
                    Option
                </Radio>
                <TextInput label="input" name="input" />
                <Switch name="switch" value="switch-1">
                    Switch 1
                </Switch>
            </Form>
        );

        const { container: invalidForm } = render(
            <Form type="remix" actionData={invalidActionData}>
                <Group name="group-1" label="options">
                    <Radio value="option-1">Option 1</Radio>
                    <Radio value="option-2">Option 2</Radio>
                </Group>
                <Group name="group-2" label="checkboxes">
                    <Checkbox value="checkbox-1">Checkbox 1</Checkbox>
                    <Checkbox value="checkbox-2">Checkbox 2</Checkbox>
                </Group>
                <Checkbox id="checkbox 2" value="checkbox">
                    Checkbox
                </Checkbox>
                <Radio id="radio 2" value="option">
                    Option
                </Radio>
                <TextInput label="input" name="input" />
                <Switch name="switch" value="switch-1">
                    Switch 1
                </Switch>
            </Form>
        );

        // when
        const results = [];
        results[0] = await axe(validForm);
        results[1] = await axe(invalidForm);

        // then
        results.forEach((result: any) => expect(result).toHaveNoViolations());
    });

    it('renders error messages when invalid', () => {
        // given
        render(
            <Form type="remix" actionData={invalidActionData}>
                <Group name="radioGroup" label="options">
                    <Radio value="option-1">Option 1</Radio>
                    <Radio value="option-2">Option 2</Radio>
                </Group>
                <Group name="checkboxGroup" label="checkboxes">
                    <Checkbox value="checkbox-1">Checkbox 1</Checkbox>
                    <Checkbox value="checkbox-2">Checkbox 2</Checkbox>
                </Group>
                <Checkbox id="checkbox" value="checkbox">
                    Checkbox
                </Checkbox>
                <Radio id="radio" value="radio">
                    Option
                </Radio>
                <TextInput label="input" name="input" />
                <Switch name="switch" value="switch">
                    Switch
                </Switch>
            </Form>
        );

        // when then
        expect(screen.queryAllByText(/failed/i)).toHaveLength(5);
    });

    it('displays all default values correctly', () => {
        // given
        render(
            <Form type="remix" actionData={validActionData}>
                <Group name="radioGroup" label="options">
                    <Radio value="option-1">Option 1</Radio>
                    <Radio value="option-2">Option 2</Radio>
                </Group>
                <Group name="checkboxGroup" label="checkboxes">
                    <Checkbox value="checkbox-1">Checkbox 1</Checkbox>
                    <Checkbox value="checkbox-2">Checkbox 2</Checkbox>
                </Group>
                <Checkbox id="checkbox" value="checkbox">
                    Checkbox single
                </Checkbox>
                <Radio id="radio" value="radio">
                    Radio single
                </Radio>
                <TextInput label="input" name="input" />
                <Switch name="switch" value="switch-1">
                    Switch
                </Switch>
            </Form>
        );

        // when then
        expect(screen.getByDisplayValue(/input/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/option 1/i)).toBeChecked();
        expect(screen.getByLabelText(/option 2/i)).not.toBeChecked();
        expect(screen.getByLabelText(/checkbox 1/i)).toBeChecked();
        expect(screen.getByLabelText(/checkbox 2/i)).toBeChecked();
        expect(screen.getByLabelText(/checkbox single/i)).toBeChecked();
        expect(screen.getByLabelText(/radio single/i)).toBeChecked();
        expect(screen.getByLabelText(/switch/i)).toBeChecked();
    });
});
