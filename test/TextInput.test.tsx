import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Default as TextInput } from '../stories/TextInput.stories';

describe('TextInput', () => {
    it('renders correctly', () => {
        // given
        render(<TextInput placeholder="Hello World!" />);

        // when then
        expect(screen.getByPlaceholderText(/hello world!/i)).toBeInTheDocument();
    });

    it('can take input', () => {
        // given
        const input = 'hello';
        render(<TextInput />);
        const textInput: HTMLElement = screen.getByRole('textbox');

        // when
        userEvent.type(textInput, input);

        // then
        expect(textInput).toHaveValue(input);
    });

    it('can be found by its input', () => {
        // given
        const input = 'hello';
        render(<TextInput />);
        const textInput: HTMLElement = screen.getByRole('textbox');

        // when
        userEvent.type(textInput, input);

        // then
        expect(screen.getByDisplayValue(input)).toBeInTheDocument();
    });

    it('changes input to password mode when password prop is provided', () => {
        // given
        render(<TextInput placeholder="Type Password!" password />);
        const textInput: HTMLElement = screen.getByPlaceholderText(/type password!/i);

        // when then
        expect(textInput).toHaveAttribute('type', 'password');
    });

    it('will not take input when disabled', () => {
        // given
        const input = 'hello';
        render(<TextInput disabled />);
        const textInput: HTMLElement = screen.getByRole('textbox');

        // when
        userEvent.type(textInput, input);

        // then
        expect(textInput).not.toHaveValue(input);
    });
});
