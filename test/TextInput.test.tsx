import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations);

import { Form, TextInput } from '../src';

describe('TextInput', () => {
    it('complies with WCAG 2.0', async () => {
        // given
        const { container: validInput } = render(<TextInput label="label" />);
        const { container: validInputWithHint } = render(<TextInput label="label" hint="hint" />);
        const { container: invalidInput } = render(<TextInput label="label" invalid />);
        const { container: invalidInputWithMessage } = render(
            <TextInput label="name" name="test" invalid errorMessage="Failed to load" />
        );

        // when
        const results: any[] = [];
        results.push(await axe(validInput));
        results.push(await axe(validInputWithHint));
        results.push(await axe(invalidInput));
        results.push(await axe(invalidInputWithMessage));

        // then
        results.forEach((result: any) => expect(result).toHaveNoViolations());
    });

    it('renders correctly', () => {
        // given
        render(<TextInput label="random" placeholder="Hello World!" />);

        // when then
        expect(screen.getByPlaceholderText(/hello world!/i)).toBeInTheDocument();
    });

    it('can take input', () => {
        // given
        const input = 'hello';
        render(<TextInput label="random" />);
        const textInput: HTMLElement = screen.getByRole('textbox');

        // when
        userEvent.type(textInput, input);

        // then
        expect(textInput).toHaveValue(input);
    });

    it('can be found by its input', () => {
        // given
        const input = 'hello';
        render(<TextInput label="random" />);
        const textInput: HTMLElement = screen.getByRole('textbox');

        // when
        userEvent.type(textInput, input);

        // then
        expect(screen.getByDisplayValue(input)).toBeInTheDocument();
    });

    it('changes input to password mode when password prop is provided', () => {
        // given
        render(<TextInput label="random" placeholder="Type Password!" password />);
        const textInput: HTMLElement = screen.getByPlaceholderText(/type password!/i);

        // when then
        expect(textInput).toHaveAttribute('type', 'password');
    });

    it('will not take input when disabled', () => {
        // given
        const input = 'hello';
        render(<TextInput label="random" disabled />);
        const textInput: HTMLElement = screen.getByRole('textbox');

        // when
        userEvent.type(textInput, input);

        // then
        expect(textInput).not.toHaveValue(input);
    });

    it('will render label correctly', () => {
        // given
        render(<TextInput label="label" />);

        // when then
        expect(screen.getByLabelText(/label/i)).toBeInTheDocument();
    });

    it('will render hint correctly', () => {
        // given
        render(<TextInput label="label" hint="hint" />);

        // when then
        expect(screen.getByLabelText(/hint/i)).toBeInTheDocument();
    });

    it('will render error message when conditions are met', () => {
        // given
        render(<TextInput label="label" name="test" invalid errorMessage="failed" />);

        // when then
        expect(screen.getByText(/failed/i)).toBeInTheDocument();
    });

    it('will accept a reference', () => {
        // given
        const inputRef = React.createRef<HTMLInputElement>();
        render(<TextInput label="label" ref={inputRef} />);

        // when then
        expect(inputRef.current).not.toBeNull();
    });

    it('will accept a reference in both kinds of forms', () => {
        // given
        const csFormRef = React.createRef<HTMLInputElement>();
        const ssFormRef = React.createRef<HTMLInputElement>();
        render(
            <>
                <Form>
                    <TextInput name="value" label="something" ref={csFormRef} />
                </Form>
                <Form type="remix">
                    <TextInput name="value" label="something" ref={ssFormRef} />
                </Form>
            </>
        );

        // when then
        expect(csFormRef.current).not.toBeNull();
        expect(ssFormRef.current).not.toBeNull();
    });
});
