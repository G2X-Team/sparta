import React from 'react';
import { screen, render } from '@testing-library/react';

import { Card, Header, Footer } from '../src';

describe('Card', () => {
    it('renders correctly', () => {
        // given
        render(<Card>Hello World!</Card>);

        // when then
        expect(screen.getByText(/hello world!/i)).toBeInTheDocument();
    })

    it('renders a header, while maintaining other content', () => {
        // given
        render(
            <Card>
                <Header>Hello World</Header>
                This is the body
           </Card>
        )
        
        // when then
        expect(screen.getByText(/hello world/i)).toBeInTheDocument(); // proves header is rendered
        expect(screen.getByText(/this is the body/i)).toBeInTheDocument(); // prove that the body is in document
    })

    it('renders a footer, while maintaining other content', () => {
        // given
        render(
            <Card>
                This is the body
                <Footer>Hello World</Footer>
           </Card>
        )
        
        // when then
        expect(screen.getByText(/hello world/i)).toBeInTheDocument(); // proves footer is rendered
        expect(screen.getByText(/this is the body/i)).toBeInTheDocument(); // prove that the body is rendered
    })

    it('can render both the header, footer, and body at the same time', () => {
        // given
        render(
            <Card>
                <Header>This is the header</Header>
                This is the body
                <Footer>This is the footer</Footer>
           </Card>
        )
        
        // when then
        expect(screen.getByText(/this is the header/i)).toBeInTheDocument(); // proves header is rendered
        expect(screen.getByText(/this is the body/i)).toBeInTheDocument(); // prove that the body is rendered
        expect(screen.getByText(/this is the footer/i)).toBeInTheDocument(); // proves footer is rendered

    })
})