import React from 'react';
import { screen, render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations);

import { Accordion } from '../src';

describe('Accordion', () => {
    it('complies with WCAG 2.0 AA', async () => {
        // given
        const { container: openAccordion } = render(
            <Accordion id="open-test" defaultOpen>
                Panel Stuff
            </Accordion>
        );
        const { container: closedAccordion } = render(
            <Accordion id="closed-test">Panel Stuff</Accordion>
        );

        // when
        const results: any[] = [];
        results.push(await axe(openAccordion));
        results.push(await axe(closedAccordion));

        // then
        results.forEach((result) => {
            expect(result).toHaveNoViolations();
        });
    });

    it('renders correctly when open', () => {
        // given
        render(
            <Accordion id="test" header="Header">
                Test
            </Accordion>
        );

        // when then
        expect(screen.getByText(/header/i)).toBeInTheDocument();
        expect(screen.getByText(/test/i)).toBeInTheDocument();
    });

    it('has correct height when closed', () => {
        // given
        render(
            <Accordion id="test" header="Header">
                Test
            </Accordion>
        );

        // when then
        expect(screen.getByText(/test/i).parentElement).toHaveAttribute('style', 'height: 0px;');
    });

    it('has correct height when open', () => {
        // given
        render(
            <Accordion id="test" header="Header" defaultOpen>
                Test
            </Accordion>
        );

        // when then
        expect(screen.getByText(/test/i).parentElement).not.toHaveAttribute(
            'style',
            'height: 0px;'
        );
    });

    it('has correct height when override', () => {
        // given
        render(
            <Accordion id="test" header="Header" override>
                Test
            </Accordion>
        );

        // when then
        expect(screen.getByText(/test/i).parentElement).not.toHaveAttribute(
            'style',
            'height: 0px;'
        );
    });

    it('should call onClick when clicked', () => {
        // given
        const onClick = jest.fn();
        render(
            <Accordion id="test" header="Header" onClick={onClick}>
                Test
            </Accordion>
        );

        // when
        screen.getByText(/header/i).click();

        // then
        expect(onClick).toHaveBeenCalled();
    });

    it('should render header with Sparta Text element if string provided for header', () => {
        // given
        render(
            <Accordion id="test" header="Header">
                Test
            </Accordion>
        );

        // when then
        expect(screen.getByText(/header/i).tagName).toBe('SPAN');
    });

    it('should render header with custom element', () => {
        // given
        render(
            <Accordion id="test" header={<section>Header</section>}>
                Test
            </Accordion>
        );

        // when then
        expect(screen.getByText(/header/i)).toBeInTheDocument();
        expect(screen.getByText(/header/i).tagName).toBe('SECTION');
    });

    it('should render Sparta Text element in panel if string provided for children', () => {
        // given
        render(
            <Accordion id="test" header="header">
                Test
            </Accordion>
        );

        // when then
        expect(screen.getByText(/test/i).tagName).toBe('SPAN');
    });

    it('should render custom element in panel if provided for children', () => {
        // given
        render(
            <Accordion id="test" header="header">
                <h2>Test</h2>
            </Accordion>
        );

        // when then
        expect(screen.getByText(/test/i).tagName).toBe('H2');
    });
});
