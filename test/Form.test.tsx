import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Form, Button, TextInput, Text, Label, Checkbox, Group } from '../src';

// error message when test validator doesn't pass input
const errorMessage = 'Needs to be 5 characters in length at least';
const radioMessage = 'Need to select more than one checkbox';

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
 * @param value value of checkbox group
 * @return error message if there is one
 */
const checkboxValidator = (value: string | string[]): string | null => {
    return value.length < 2 ? radioMessage : null;
};

describe('Form', () => {
    it('renders correctly', () => {
        // given
        render(
            <Form>
                <Text header={1} bold margins>
                    Log in
                </Text>
                <Label value="Username">
                    <TextInput name="username" required placeholder="UserName" />
                </Label>
                <br />
                <Label value="Password" hint="Password must be 8 characters long">
                    <TextInput password required name="password" placeholder="********" />
                </Label>
                <br />
                <Button>Submit</Button>
            </Form>
        );

        // when then
        expect(screen.getByText(/log in/i)).toBeInTheDocument();
        expect(screen.getByRole('textbox')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('********')).toBeInTheDocument();
        expect(screen.getByText(/submit/i)).toBeInTheDocument();
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
                <TextInput name="username" placeholder="UserName" />
                <TextInput name="password" placeholder="password" password />
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
                <TextInput required name="username" placeholder="UserName" />
                <TextInput required name="password" placeholder="password" password />
                <Button>Submit</Button>
            </Form>
        );

        // when
        userEvent.click(screen.getByText(/submit/i));

        // then
        expect(onSubmit).not.toHaveBeenCalled();
        expect(onFail).toHaveBeenCalledWith([
            'password is a required field and cannot be empty.',
            'username is a required field and cannot be empty.',
        ]);
    });

    it('will not submit if an input with a validator does not meet requirements', () => {
        // given
        const onSubmit: jest.Mock<any, any> = jest.fn();
        const onFail: jest.Mock<any, any> = jest.fn();
        const invalidPassword = '32f';
        render(
            <Form onSubmit={onSubmit} onFail={onFail}>
                <TextInput name="username" placeholder="UserName" />
                <TextInput
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

    it('retains text input functionality within labels', () => {
        // given
        const onSubmit: jest.Mock<any, any> = jest.fn();
        const onFail: jest.Mock<any, any> = jest.fn();
        const password = 'password';
        const expected = { password };
        render(
            <Form onSubmit={onSubmit} onFail={onFail}>
                <Label value="user name">
                    <TextInput
                        required
                        name="password"
                        placeholder="password"
                        password
                        validator={testValidator}
                    />
                </Label>
                <Button>Submit</Button>
            </Form>
        );

        // when
        userEvent.type(screen.getByPlaceholderText(/password/i), password);
        userEvent.click(screen.getByText(/submit/i));

        // then
        expect(onSubmit).toBeCalledWith(expect.anything(), expect.objectContaining(expected));
    });

    it('will not submit if group validator does not meet requirements', () => {
        // given
        const onFail: jest.Mock<any, any> = jest.fn();
        const onSubmit: jest.Mock<any, any> = jest.fn();
        render(
            <Form onSubmit={onSubmit} onFail={onFail}>
                <Group name="somethings" type="checkbox" validator={checkboxValidator}>
                    <Checkbox value="something-1">Something 1</Checkbox>
                    <Checkbox value="something-2">Something 2</Checkbox>
                </Group>
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
                <Group name="somethings" type="checkbox" validator={checkboxValidator}>
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
});
