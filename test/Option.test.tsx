import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations);

import { Option } from '../src';

describe('Option', () => {
    it('is compliant to WCAG 2.0', async () => {
        // given
        const { container: option } = render(
            <ul role="listbox" aria-label="option">
                <Option>Option 1</Option>
            </ul>
        );

        // when
        const result = await axe(option);

        // then
        expect(result).toHaveNoViolations();
    });

    it('renders correctly', () => {
        // given
        render(<Option>Hello World!</Option>);

        // when then
        expect(screen.getByText(/hello world!/i)).toBeInTheDocument();
    });

    it('will perform on click callback', () => {
        // given
        const onClick: jest.Mock<any, any> = jest.fn();
        render(<Option onClick={onClick}>Hello World!</Option>);

        // when
        userEvent.click(screen.getByText(/hello world!/i));

        // then
        expect(onClick).toHaveBeenCalled();
    });

    it('will be wrapped by other component when wrap function called', () => {
        // given
        render(<Option wrap={(option) => <div>Hello {option}</div>}> World!</Option>);

        // when then
        expect(screen.getByText(/hello/i)).toBeInTheDocument();
    });

    it('will execute on click when "Enter" is pressed while focused', () => {
        // given
        const onClick: jest.Mock<any, any> = jest.fn();
        render(<Option onClick={onClick}>Hello World!</Option>);
        const { parentElement: option } = screen.getByText(/hello world!/i);

        // when
        userEvent.tab();
        expect(option).toHaveFocus();
        userEvent.keyboard('{enter}');

        // then
        expect(onClick).toHaveBeenCalled();
    });

    it('will not execute on click when "Enter" is pressed while not focused', () => {
        // given
        const onClick: jest.Mock<any, any> = jest.fn();
        render(<Option onClick={onClick}>Hello World!</Option>);

        // when
        userEvent.keyboard('{enter}');

        // then
        expect(onClick).not.toHaveBeenCalled();
    });
});
