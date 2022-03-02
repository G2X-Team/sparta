import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations);

import { Dropdown, Button, Text, Option } from '../src';

describe('Dropdown', () => {
    it('complies with WCAG 2.0 ', async () => {
        // given
        const { container: closedDropdown } = render(
            <Dropdown name="dropdown">
                <Button>
                    <Text>Hello World</Text>
                </Button>
                <Option>Option 1</Option>
                <Option>Option 2</Option>
                <Option>Option 3</Option>
            </Dropdown>
        );

        render(
            <Dropdown name="dropdown-2" id="something">
                <Button>
                    <Text>Hello World 2</Text>
                </Button>
                <Option>Option 1</Option>
                <Option>Option 2</Option>
                <Option>Option 3</Option>
            </Dropdown>
        );

        userEvent.click(screen.getByText(/hello world 2/i));
        const button = screen.getByText(/Hello World 2/i);

        // when
        const results = [];
        results[0] = await axe(closedDropdown);
        if (button?.parentElement?.parentElement)
            results[1] = await axe(button.parentElement.parentElement);

        // then
        results.forEach((result: any) => expect(result).toHaveNoViolations());
    });

    it('renders correctly', () => {
        // given
        render(
            <Dropdown name="dropdown">
                <Button>
                    <Text>Hello World</Text>
                </Button>
                <Option>Option 1</Option>
                <Option>Option 2</Option>
                <Option>Option 3</Option>
            </Dropdown>
        );

        // when then
        expect(screen.getByText(/hello world/i)).toBeInTheDocument();
    });

    it('does not render the items initially', () => {
        // given
        render(
            <Dropdown name="dropdown">
                <Button>
                    <Text>Hello World</Text>
                </Button>
                <Option>Option 1</Option>
                <Option>Option 2</Option>
                <Option>Option 3</Option>
            </Dropdown>
        );

        // when then
        expect(screen.queryAllByText(/option /i)).toHaveLength(0);
    });

    it('renders item when button is clicked', () => {
        // given
        render(
            <Dropdown name="dropdown">
                <Button>
                    <Text>Hello World</Text>
                </Button>
                <Option>Option 1</Option>
                <Option>Option 2</Option>
                <Option>Option 3</Option>
            </Dropdown>
        );

        // when
        userEvent.click(screen.getByText(/hello world/i));

        // then
        expect(screen.queryAllByText(/option /i)).toHaveLength(3);
    });

    it('will follow throuhg with the general flow', () => {
        // given
        render(
            <Dropdown name="dropdown">
                <Button>
                    <Text>Hello World</Text>
                </Button>
                <Option>Option 1</Option>
                <Option>Option 2</Option>
                <Option>Option 3</Option>
            </Dropdown>
        );
        const dropdownButton: HTMLElement = screen.getByText(/hello world/i);

        // when then
        // should start with no options able to see
        expect(screen.queryAllByText(/option /i)).toHaveLength(0);

        // should open the menu on click
        userEvent.click(dropdownButton);
        expect(screen.queryAllByText(/option /i)).toHaveLength(3);

        // should close the menu on second click
        userEvent.click(dropdownButton);
        expect(screen.queryAllByText(/option /i)).toHaveLength(0);
    });

    it('will closed when clicked outside the button', () => {
        // given
        render(
            <React.Fragment>
                <Dropdown name="dropdown">
                    <Button>
                        <Text>Hello World</Text>
                    </Button>
                    <Option>Option 1</Option>
                    <Option>Option 2</Option>
                    <Option>Option 3</Option>
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
        expect(screen.queryAllByText(/option /i)).toHaveLength(0);
    });

    it('allows on click callback to execute for all options', () => {
        // given
        const firstClick: jest.Mock<any, any> = jest.fn();
        const secondClick: jest.Mock<any, any> = jest.fn();
        const thridClick: jest.Mock<any, any> = jest.fn();
        render(
            <Dropdown name="dropdown">
                <Button>
                    <Text>Hello World</Text>
                </Button>
                <Option onClick={firstClick}>Option 1</Option>
                <Option onClick={secondClick}>Option 2</Option>
                <Option onClick={thridClick}>Option 3</Option>
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
        expect(thridClick).toHaveBeenCalled();
    });
});
