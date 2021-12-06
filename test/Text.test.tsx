import React from 'react';
import { render, screen } from '@testing-library/react';
import { Default as Text } from '../stories/Text.stories'

describe('Text', () => {
    it('renders correctly', () => {
        // given
        render(<Text>Hello World!</Text>);

        // when then
        expect(screen.getByText(/hello world!/i)).toBeInTheDocument();
    })

    it('converts all letters to lowercase', () => {
        // given 
        render(<Text lower>LOWERCASE</Text>);

        // when then
        expect(screen.getByText('lowercase')).toBeInTheDocument();
    })

    it('converts all letters to uppercase', () => {
        // given
        render(<Text upper>uppercase</Text>);

        // when then
        expect(screen.getByText('UPPERCASE')).toBeInTheDocument();
    })

    it('converts the first letter of every word to uppercase', () => {
        // given
        render(<Text pascal>pascal casing</Text>);

        // when then
        expect(screen.getByText('Pascal Casing')).toBeInTheDocument();
    })


    it('makes the whole text disabled', () => {
        // given
        render(<Text disabled>disabled text</Text>);

        // when then
        expect(screen.getByText(/disabled text/i)).toBeInTheDocument();
    })
})
