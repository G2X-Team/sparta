import React from 'react';
import { render, screen } from '@testing-library/react';

import { TextInput, Label } from '../src';

describe('Label', () => {
    it('renders correctly', () => {
        // given
        render(
            <Label value="Hello World!">
                <TextInput />
            </Label>
        );

        // when then
        expect(screen.getByText(/hello world!/i)).toBeInTheDocument();
    });

    it('renders the hint correctly', () => {
        // given
        render(
            <Label value="Hello World!" hint="This is a hint">
                <TextInput />
            </Label>
        );

        // when then
        expect(screen.getByText(/this is a hint/i)).toBeInTheDocument();
    });

    it('will add an asterisk when one of its children has its required prop toggled', () => {
        // given
        render(
            <Label value="Hello World!">
                <TextInput required />
            </Label>
        );

        // when then
        expect(screen.getByText(/hello world!*/i)).toBeInTheDocument();
    });
});
