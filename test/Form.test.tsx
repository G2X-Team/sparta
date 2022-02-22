import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations);

import { act } from 'react-dom/test-utils';

import { Form, TextInput, Switch, Radio, Checkbox, Group, Button } from '../src';

// error message when test validator doesn't pass input
const passwordError = 'Needs to be 5 characters in length at least';
const groupError = 'somethings is required, please select an option.';

/**
 * Validator that test on submit functionality
 *
 * @param data value of input
 * @return error message if there is one
 */
const testValidator = (data: { text?: string }): string | null => {
    return (data?.text?.length || 0) < 5 ? passwordError : null;
};

/**
 * Validator that will test on submit functionality when groups are involved
 *
 * @param data data of checkbox group
 * @return error message if there is one
 */
const checkboxValidator = (data: { checkbox?: string[] }): string | null => {
    return (data?.checkbox?.length || 0) < 2 ? groupError : null;
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
                <Checkbox id="checkbox" value="checkbox">
                    Checkbox
                </Checkbox>
                <Radio id="radio" value="option">
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
                <Checkbox value="checkbox" id="checkbox" invalid errorMessage="failed">
                    Checkbox
                </Checkbox>
                <Radio value="option" id="radio" invalid errorMessage="failed">
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

    it('will submit when there are no requirement', async () => {
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

    it('it will not submit if form has missing required fields', async () => {
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
});
