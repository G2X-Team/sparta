import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Drawer, Header, Menu, Footer, Divider, Option } from '../src';
import { axe, toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations);

describe('Drawer', () => {
    it('complies to WCAG 2.0', async () => {
        // given
        const { container: absoluteDrawer } = render(
            <Drawer open={true} type="absolute">
                <Menu label="drawer-1" description="this is a drawer">
                    Hello World
                </Menu>
            </Drawer>
        );

        const { container: persistentDrawer } = render(
            <Drawer open={true} type="persistent">
                <Menu label="drawer-2" description="this is a drawer">
                    Hello World
                </Menu>
            </Drawer>
        );

        const { container: permanentDrawer } = render(
            <Drawer open={true} type="permanent">
                <Menu label="drawer-3" description="this is a drawer">
                    Hello World
                </Menu>
            </Drawer>
        );

        // when
        const results = [];
        results[0] = await axe(absoluteDrawer);
        results[1] = await axe(persistentDrawer);
        results[2] = await axe(permanentDrawer);

        // then
        results.forEach((result: any) => expect(result).toHaveNoViolations());
    });

    it('it renders correctly', () => {
        // given
        render(
            <Drawer type="permanent">
                <Menu label="drawer" description="this is a drawer">
                    Hello World
                </Menu>
            </Drawer>
        );

        // when then
        expect(screen.getByText(/hello world/i)).toBeInTheDocument();
    });

    it('will open the menu when the Drawer.Button is clicked', () => {
        // given
        render(
            <Drawer>
                <Drawer.Button>Click me</Drawer.Button>
                <Menu label="drawer" description="this is a drawer">
                    Hello World
                </Menu>
            </Drawer>
        );

        // we should expect the menu to be closed at first
        expect(screen.queryByText(/hello world/i)).not.toBeInTheDocument();

        // when
        userEvent.click(screen.getByRole('button'));

        // then
        expect(screen.queryByText(/hello world/i)).toBeInTheDocument();
    });

    it('is not visible when collapsed in all types except "permanent"', () => {
        // given
        render(
            <React.Fragment>
                <Drawer type="absolute">
                    <Menu label="drawer-1" description="this is a drawer">
                        Hello World absolute
                    </Menu>
                </Drawer>
                <Drawer type="persistent">
                    <Menu label="drawer-2" description="this is a drawer">
                        Hello World persistent
                    </Menu>
                </Drawer>
            </React.Fragment>
        );

        // when then
        expect(screen.queryAllByText(/hello world /i)).toHaveLength(0);
    });

    it('will be visible when not collapsed in all types', () => {
        // given
        render(
            <React.Fragment>
                <Drawer open={true} type="absolute">
                    <Menu label="drawer-1" description="this is a drawer">
                        Hello World
                    </Menu>
                </Drawer>
                <Drawer open={true} type="persistent">
                    <Menu label="drawer-2" description="this is a drawer">
                        Hello World
                    </Menu>
                </Drawer>
                <Drawer open={true} type="permanent">
                    <Menu label="drawer-3" description="this is a drawer">
                        Hello World
                    </Menu>
                </Drawer>
            </React.Fragment>
        );

        // when then
        expect(screen.queryAllByText(/hello world/i)).toHaveLength(3);
    });

    it('will render the header', () => {
        // given
        render(
            <Drawer type="permanent">
                <Menu label="drawer" description="this is a drawer">
                    <Header>Header</Header>
                    Hello World
                </Menu>
            </Drawer>
        );

        // when then
        expect(screen.getByText(/header/i)).toBeInTheDocument();
    });

    it('will render the footer', () => {
        // given
        render(
            <Drawer type="permanent">
                <Menu label="drawer" description="this is a drawer">
                    Hello World
                    <Footer>Footer</Footer>
                </Menu>
            </Drawer>
        );

        // when then
        expect(screen.getByText(/footer/i)).toBeInTheDocument();
    });

    it('will render dividers', () => {
        // given
        render(
            <Drawer type="permanent">
                <Menu label="drawer" description="this is a drawer">
                    Hello World
                    <Divider />
                </Menu>
            </Drawer>
        );

        // when then
        expect(screen.getByRole('separator')).toBeInTheDocument();
    });

    it('will render options', () => {
        // given
        render(
            <Drawer type="permanent">
                <Menu label="drawer" description="this is a drawer">
                    <Option>This is an option</Option>
                </Menu>
            </Drawer>
        );

        // when then
        expect(screen.getByText(/this is an option/i)).toBeInTheDocument();
    });

    it('triggers option on click callback', () => {
        // given
        const onClick: jest.Mock<any, any> = jest.fn();
        render(
            <Drawer type="permanent">
                <Menu label="drawer">
                    <Option onClick={onClick}>This is an option</Option>
                </Menu>
            </Drawer>
        );

        // when
        userEvent.click(screen.getByText(/this is an option/i));

        // then
        expect(onClick).toHaveBeenCalled();
    });
});
