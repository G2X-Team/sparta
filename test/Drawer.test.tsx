import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Drawer, Header, Footer, Divider, Option } from '../src';

describe('Drawer', () => {
    it('it renders correctly', () => {
        // given
        render(<Drawer type="permanent">Hello World</Drawer>);

        // when then
        expect(screen.getByText(/hello world/i)).toBeInTheDocument();
    })

    it('is not visible when collapsed in all types except "permanent"', () => {
        // given
        render(
            <React.Fragment>
                <Drawer type="absolute">Hello World absolute</Drawer>
                <Drawer type="persistent">Hello World persistent</Drawer>
            </React.Fragment>
        );

        // when then
        expect(screen.queryAllByText(/hello world absolute/i)).toHaveLength(0);
    })

    it('will be visible when not collapsed in all types', () => {
        // given
        render(
            <React.Fragment>
                <Drawer open={true} type="absolute">Hello World</Drawer>
                <Drawer open={true} type="persistent">Hello World</Drawer>
                <Drawer open={true} type="permanent">Hello World</Drawer>
            </React.Fragment>
        );

        // when then
        expect(screen.queryAllByText(/hello world/i)).toHaveLength(3);
    })

    it('will render the header', () => {
        // given
        render(
            <Drawer type="permanent">
                <Header>Header</Header>
                Hello World
            </Drawer>
        );

        // when then
        expect(screen.getByText(/header/i)).toBeInTheDocument();
    })

    it('will render the footer', () => {
        // given
        render(
            <Drawer type="permanent">
                Hello World
                <Footer>Footer</Footer>
            </Drawer>
        );

        // when then
        expect(screen.getByText(/footer/i)).toBeInTheDocument();
    })

    it('will render dividers', () => {
        // given
        render(
            <Drawer type="permanent">
                Hello World
                <Divider />
            </Drawer>
        );

        // when then
        expect(screen.getByRole('separator')).toBeInTheDocument();
    })

    it('will render options', () => {
        // given
        render(
            <Drawer type="permanent">
                <Option>This is an option</Option>
            </Drawer>
        );

        // when then
        expect(screen.getByText(/this is an option/i)).toBeInTheDocument();
    })

    it('triggers option on click callback', () => {
        // given
        const onClick: jest.Mock<any, any> = jest.fn();
        render(
            <Drawer type="permanent">
                <Option onClick={onClick}>This is an option</Option>
            </Drawer>
        );

        // when
        userEvent.click(screen.getByText(/this is an option/i))

        // then
        expect(onClick).toHaveBeenCalled();
    })
})