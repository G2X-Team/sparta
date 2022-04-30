import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations);

import { Dropdown, Button, Text, Option, Menu } from '../src';

describe('Dropdown', () => {
    it('complies with WCAG 2.0 ', async () => {
        // given
        const { container: closedDropdown } = render(
            <Dropdown>
                <Button>Hello World</Button>
                <Menu label="dropdown-1">
                    <Option>Option 1</Option>
                    <Option>Option 2</Option>
                    <Option>Option 3</Option>
                </Menu>
            </Dropdown>
        );

        render(
            <Dropdown>
                <Button>Hello World 2</Button>
                <Menu label="dropdown-2">
                    <Option>Option 1</Option>
                    <Option>Option 2</Option>
                    <Option>Option 3</Option>
                </Menu>
            </Dropdown>
        );

        userEvent.click(screen.getByText(/hello world 2/i));
        const { parentElement: openDropdown } = screen.getByText(/Hello World 2/i);
        if (openDropdown === null) throw new Error('Open dropdown not found');

        // when
        const results = [];
        results[0] = await axe(closedDropdown);
        results[1] = await axe(openDropdown);

        // then
        results.forEach((result: any) => expect(result).toHaveNoViolations());
    });

    it('renders correctly', () => {
        // given
        render(
            <Dropdown>
                <Button>Hello World</Button>
                <Menu label="dropdown">
                    <Option>Option 1</Option>
                    <Option>Option 2</Option>
                    <Option>Option 3</Option>
                </Menu>
            </Dropdown>
        );

        // when then
        expect(screen.getByText(/hello world/i)).toBeInTheDocument();
    });

    it('does not render the items initially', () => {
        // given
        render(
            <Dropdown>
                <Button>Hello World</Button>
                <Menu label="dropdown">
                    <Option>Option 1</Option>
                    <Option>Option 2</Option>
                    <Option>Option 3</Option>
                </Menu>
            </Dropdown>
        );

        // when then
        expect(screen.queryAllByText(/option /i)).toHaveLength(0);
    });

    it('renders item when button is clicked', () => {
        // given
        render(
            <Dropdown>
                <Button>Hello World</Button>
                <Menu label="dropdown">
                    <Option>Option 1</Option>
                    <Option>Option 2</Option>
                    <Option>Option 3</Option>
                </Menu>
            </Dropdown>
        );

        // when
        userEvent.click(screen.getByText(/hello world/i));

        // then
        expect(screen.queryAllByText(/option /i)).toHaveLength(3);
    });

    it('will follow throuhg with the general flow', async () => {
        // given
        render(
            <Dropdown>
                <Button>Hello World</Button>
                <Menu label="dropdown">
                    <Option>Option 1</Option>
                    <Option>Option 2</Option>
                    <Option>Option 3</Option>
                </Menu>
            </Dropdown>
        );
        const dropdownButton: HTMLElement = screen.getByText(/hello world/i);

        // when then
        // should start with no options able to see
        expect(screen.queryAllByText(/option /i)).toHaveLength(0);

        // should open the menu on click
        await act(async () => {
            userEvent.click(dropdownButton);
        });
        expect(screen.queryAllByText(/option /i)).toHaveLength(3);

        // should close the menu on second click
        await act(async () => {
            userEvent.click(dropdownButton);
        });
        setTimeout(() => {
            expect(screen.queryAllByText(/option /i)).toHaveLength(0);
        }, 500);
    });

    it('will close when clicked outside', () => {
        // given
        render(
            <React.Fragment>
                <Dropdown>
                    <Button>Hello World</Button>
                    <Menu label="dropdown">
                        <Option>Option 1</Option>
                        <Option>Option 2</Option>
                        <Option>Option 3</Option>
                    </Menu>
                </Dropdown>
                <Text>Some other element</Text>
            </React.Fragment>
        );
        const dropdownButton: HTMLElement = screen.getByText(/hello world/i);
        const otherElement: HTMLElement = screen.getByText(/some other element/i);

        // when
        // should open on click
        userEvent.click(dropdownButton);
        expect(screen.queryAllByText(/option /i)).toHaveLength(3);

        // click outside element
        userEvent.click(otherElement);

        // then
        setTimeout(() => {
            expect(screen.queryAllByText(/option /i)).toHaveLength(0);
        }, 300);
    });

    it('allows on click callback to execute for all options', () => {
        // given
        const firstClick: jest.Mock<any, any> = jest.fn();
        const secondClick: jest.Mock<any, any> = jest.fn();
        const thirdClick: jest.Mock<any, any> = jest.fn();
        render(
            <Dropdown>
                <Button>Hello World</Button>
                <Menu label="dropdown">
                    <Option onClick={firstClick}>Option 1</Option>
                    <Option onClick={secondClick}>Option 2</Option>
                    <Option onClick={thirdClick}>Option 3</Option>
                </Menu>
            </Dropdown>
        );

        // when
        for (let i = 1; i <= 3; i++) {
            userEvent.click(screen.getByText(/hello world/i));
            userEvent.click(screen.getByText(`Option ${i}`));
        }

        // then
        expect(firstClick).toHaveBeenCalled();
        expect(secondClick).toHaveBeenCalled();
        expect(thirdClick).toHaveBeenCalled();
    });

    it('will close the menu when escape is pressed', () => {
        // given
        render(
            <Dropdown>
                <Button>Hello World</Button>
                <Menu label="dropdown">
                    <Option>Option 1</Option>
                    <Option>Option 2</Option>
                    <Option>Option 3</Option>
                </Menu>
            </Dropdown>
        );
        const dropdownButton: HTMLElement = screen.getByText(/hello world/i);
        userEvent.click(dropdownButton); // open menu
        expect(screen.queryAllByText(/option /i)).toHaveLength(3);

        // when
        userEvent.keyboard('{esc}');

        // then
        setTimeout(() => {
            expect(screen.queryAllByText(/option /i)).toHaveLength(0);
            expect(document.activeElement).toEqual(dropdownButton);
        }, 300);
    });

    it('will close when option is clicked', () => {
        // given
        render(
            <Dropdown>
                <Button>Hello World</Button>
                <Menu label="dropdown">
                    <Option>Option 1</Option>
                    <Option>Option 2</Option>
                    <Option>Option 3</Option>
                </Menu>
            </Dropdown>
        );
        const dropdownButton: HTMLElement = screen.getByText(/hello world/i);
        userEvent.click(dropdownButton); // open menu
        expect(screen.queryAllByText(/option /i)).toHaveLength(3);

        // when
        userEvent.click(screen.getByText(/option 1/i));

        // then
        setTimeout(() => {
            expect(screen.queryAllByText(/option /i)).toHaveLength(0);
        }, 300);
    });
});
