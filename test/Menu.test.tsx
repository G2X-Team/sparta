import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

    it('will execute handleOptionClick when option is clicked', () => {
        // given
        const handleOptionClick: jest.Mock<any, any> = jest.fn();
        render(
            <Menu label="menu" handleOptionClick={handleOptionClick}>
                <Option>Hello World!</Option>
            </Menu>
        );

        // when
        userEvent.click(screen.getByText(/hello world/i));

        // then
        expect(handleOptionClick).toHaveBeenCalled();
    });

    it('will execute option on click method when handleOptionClick is called', () => {
        // given
        const optionOnClick: jest.Mock<any, any> = jest.fn();
        const handleOptionClick: jest.Mock<any, any> = jest.fn(() => optionOnClick());
        render(
            <Menu label="menu" handleOptionClick={handleOptionClick}>
                <Option onClick={optionOnClick}>Hello World!</Option>
            </Menu>
        );

        // when
        userEvent.click(screen.getByText(/hello world/i));

        // then
        expect(handleOptionClick).toHaveBeenCalled();
        expect(optionOnClick).toHaveBeenCalled();
    });

    it('will execute onOutsideClick when useOutsideClick is set to true', () => {
        // given
        const onOutsideClick: jest.Mock<any, any> = jest.fn();
        render(
            <>
                <Menu label="options" onOutsideClick={onOutsideClick} useOutsideClick>
                    <Option>Option 1</Option>
                </Menu>
                <Text>Something Else</Text>
            </>
        );

        // when
        userEvent.click(screen.getByText(/something else/i));

        // then
        expect(onOutsideClick).toHaveBeenCalled();
    });

    it('will not execute onOutsideClick when useOutsideClick is set to false', () => {
        // given
        const onOutsideClick: jest.Mock<any, any> = jest.fn();
        render(
            <>
                <Menu label="options" onOutsideClick={onOutsideClick}>
                    <Option>Option 1</Option>
                </Menu>
                <Text>Something Else</Text>
            </>
        );

        // when
        userEvent.click(screen.getByText(/something else/i));

        // then
        expect(onOutsideClick).not.toHaveBeenCalled();
    });

    it('will execute onEscape function when the escape button is typed', () => {
        // given
        const onEscape: jest.Mock<any, any> = jest.fn();
        render(
            <Menu label="options" onEscape={onEscape}>
                <Option>Option 1</Option>
            </Menu>
        );

        // when
        userEvent.keyboard('{esc}');

        // then
        expect(onEscape).toHaveBeenCalled();
    });

    it('will focus on the first option when "Home" is pressed', () => {
        // given
        render(
            <Menu label="options">
                <Option>Option 1</Option>
                <Option>Option 2</Option>
                <Option>Option 3</Option>
            </Menu>
        );

        // when
        userEvent.keyboard('{home}');

        // then
        expect(screen.getByText(/option 1/i).parentElement).toHaveFocus();
    });

    it('will focus on the last option when "End" is pressed', () => {
        // given
        render(
            <Menu label="options">
                <Option>Option 1</Option>
                <Option>Option 2</Option>
                <Option>Option 3</Option>
            </Menu>
        );

        // when
        userEvent.keyboard('{end}');

        // then
        expect(screen.getByText(/option 3/i).parentElement).toHaveFocus();
    });
});
