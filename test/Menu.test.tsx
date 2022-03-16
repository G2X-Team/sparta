import React from 'react';
import { screen, render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations);

import { Menu, Option, Text } from '../src/';

describe('Menu', () => {
    it('complies to WCAG 2.0', async () => {
        // given
        const { container: applicationMenu } = render(
            <Menu label="menu" description="application">
                <Text>Option 1</Text>
            </Menu>
        );

        const { container: listMenu } = render(
            <Menu label="menu">
                <Option>Option 1</Option>
            </Menu>
        );

        const { container: navApplicationMenu } = render(
            <Menu label="menu" description="application" navigation>
                <Text>Option 1</Text>
            </Menu>
        );

        const { container: navListMenu } = render(
            <Menu label="menu" navigation>
                <Option>Option 1</Option>
            </Menu>
        );

        // when
        const results = [];
        results[0] = await axe(applicationMenu);
        results[1] = await axe(listMenu);
        results[2] = await axe(navApplicationMenu);
        results[3] = await axe(navListMenu);

        // then
        results.forEach((result: any) => expect(result).toHaveNoViolations());
    });

    it('renders correctly', () => {
        // given
        render(
            <Menu label="menu">
                <Option>Hello World!</Option>
            </Menu>
        );

        // when then
        expect(screen.getByText(/hello world/i)).toBeInTheDocument();
    });
});
