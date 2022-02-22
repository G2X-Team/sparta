import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations);

import { Form, TextInput, Switch, Radio, Checkbox, Group, Button } from '../src';

// error message when test validator doesn't pass input
const errorMessage = 'Needs to be 5 characters in length at least';
const radioMessage = 'somethings is required, please select an option.';

/**
 * Validator that test on submit functionality
 *
 * @param value value of input
 * @return error message if there is one
 */
const testValidator = (value: string): string | null => {
    return value.length < 5 ? errorMessage : null;
};

/**
 * Validator that will test on submit functionality when groups are involved
 *
 * @param data data of checkbox group
 * @return error message if there is one
 */
const checkboxValidator = (data: { checkbox?: string[] }): string | null => {
    return data.checkbox.length < 2 ? radioMessage : null;
};

describe('Client Side Form', () => {
    it('complies with WCAG', async () => {
        // given
        const { container: validForm } = render(
            <Form>
                <Group label="options">
                    <Radio value="option-1">Option 1</Radio>
                    <Radio value="option-2">Option 2</Radio>
                </Group>
                <Group label="checkboxes">
                    <Checkbox value="checkbox-1">Checkbox 1</Checkbox>
                    <Checkbox value="checkbox-2">Checkbox 2</Checkbox>
                </Group>
                <TextInput label="input" />
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
                <TextInput label="input" name="input" invalid errorMessage="failed" />
                <Switch name="switch" value="switch-1" invalid errorMessage="failed">
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

    it('will submit when there are no requirement', () => {
        // given
        const onSubmit: jest.Mock<any, any> = jest.fn();
        const username = 'username';
        const password = 'password';
        const expected = {
            username,
            password,
        };

        render(
            <Form onSubmit={onSubmit}>
                <TextInput label="label" name="username" placeholder="UserName" />
                <TextInput label="label" name="password" placeholder="password" password />
                <Button>Submit</Button>
            </Form>
        );

        // when
        userEvent.type(screen.getByPlaceholderText(/username/i), username);
        userEvent.type(screen.getByPlaceholderText(/password/i), password);
        userEvent.click(screen.getByText(/submit/i));

        // then
        expect(onSubmit).toBeCalledWith(expect.anything(), expect.objectContaining(expected));
    });

    it('it will not submit if form has missing required fields', () => {
        // given
        const onFail: jest.Mock<any, any> = jest.fn();
        const onSubmit: jest.Mock<any, any> = jest.fn();
        render(
            <Form onSubmit={onSubmit} onFail={onFail}>
                <TextInput label="label" required name="username" placeholder="UserName" />
                <TextInput label="label" required name="password" placeholder="password" password />
                <Button>Submit</Button>
            </Form>
        );

        // when
        userEvent.click(screen.getByText(/submit/i));

        // then
        expect(onSubmit).not.toHaveBeenCalled();
        expect(onFail).toHaveBeenCalledWith([
            'username is a required field and cannot be empty.',
            'password is a required field and cannot be empty.',
        ]);
    });

    it('will not submit if an input with a validator does not meet requirements', () => {
        // given
        const onSubmit: jest.Mock<any, any> = jest.fn();
        const onFail: jest.Mock<any, any> = jest.fn();
        const invalidPassword = '32f';
        render(
            <Form onSubmit={onSubmit} onFail={onFail}>
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
        userEvent.type(screen.getByPlaceholderText(/password/i), invalidPassword);
        userEvent.click(screen.getByText(/submit/i));

        // then
        expect(onSubmit).not.toHaveBeenCalled();
        expect(onFail).toHaveBeenCalledWith(expect.arrayContaining<string>([errorMessage]));
    });

    it('will submit if validator requirements are met', () => {
        // given
        const onSubmit: jest.Mock<any, any> = jest.fn();
        const onFail: jest.Mock<any, any> = jest.fn();
        const password = 'password';
        const expected = { password };
        render(
            <Form onSubmit={onSubmit} onFail={onFail}>
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
        userEvent.type(screen.getByPlaceholderText('password'), password);
        userEvent.click(screen.getByText(/submit/i));

        // then
        expect(onSubmit).toHaveBeenCalledWith(expect.anything(), expect.objectContaining(expected));
        expect(onFail).not.toHaveBeenCalledWith();
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

    it('will not submit if group validator does not meet requirements', () => {
        // given
        const onFail: jest.Mock<any, any> = jest.fn();
        const onSubmit: jest.Mock<any, any> = jest.fn();
        render(
            <Form onSubmit={onSubmit} onFail={onFail}>
                <Group label="label" name="somethings" validator={checkboxValidator}>
                    <Checkbox value="something-1">Something 1</Checkbox>
                    <Checkbox value="something-2">Something 2</Checkbox>
                </Group>
                <Button>Submit</Button>
            </Form>
        );

        // when
        userEvent.click(screen.getByText(/something 1/i));
        userEvent.click(screen.getByText(/submit/i));

        // then
        expect(onSubmit).not.toHaveBeenCalled();
        expect(onFail).toHaveBeenCalledWith([radioMessage]);
    });

    it('will not submit if no checkbox is marked and its a required group', () => {
        // given
        const onFail: jest.Mock<any, any> = jest.fn();
        const onSubmit: jest.Mock<any, any> = jest.fn();
        render(
            <Form onSubmit={onSubmit} onFail={onFail}>
                <Group label="label" name="somethings" validator={checkboxValidator}>
                    <Checkbox value="something-1">Something 1</Checkbox>
                    <Checkbox value="something-2">Something 2</Checkbox>
                </Group>
                <Button>Submit</Button>
            </Form>
        );

        userEvent.click(screen.getByText(/submit/i));

        // when then
        expect(onSubmit).not.toHaveBeenCalled();
        expect(onFail).toHaveBeenCalledWith(['somethings is required, please select an option.']);
    });

    it('will register switch changes in the form value', () => {
        // given
        const onSubmit: jest.Mock<any, any> = jest.fn();
        const formValue = {
            switch: true,
        };

        render(
            <Form onSubmit={onSubmit}>
                <Switch name="switch">Switch</Switch>
                <Button>Submit</Button>
            </Form>
        );

        // when
        userEvent.click(screen.getByText(/switch/i));
        userEvent.click(screen.getByText(/submit/i));

        // then
        expect(onSubmit).toHaveBeenCalledWith(expect.anything(), formValue);
    });

    it('will not submit and call onFail', () => {
        // given
        const onSubmit: jest.Mock<any, any> = jest.fn();
        const onFail: jest.Mock<any, any> = jest.fn();
        render(
            <Form onFail={onFail} onSubmit={onSubmit}>
                <Switch name="switch" required>
                    Test
                </Switch>
                <Button>Submit</Button>
            </Form>
        );

        // when
        userEvent.click(screen.getByText(/submit/i));

        // when then
        expect(onSubmit).not.toHaveBeenCalled();
        expect(onFail).toHaveBeenCalledWith(['switch is required, please toggle on.']);
    });
});
