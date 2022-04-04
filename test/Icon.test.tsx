import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations);

import { Icon } from '../src';

describe('Icon', () => {
    it('complies with WCAG 2.0', async () => {
        // given
        const { container: icon } = render(<Icon name="menu" />);

        // when
        const results = await axe(icon);

        // then
        expect(results).toHaveNoViolations();
    });

    it('renders correctly', () => {
        // given
        render(<Icon name="close" />);

        // when then
        expect(screen.getByText(/close/i)).toBeInTheDocument();
    });

    it('will trigger on click callback', () => {
        // given
        const onClick: jest.Mock<any, any> = jest.fn();
        render(<Icon name="close" onClick={onClick} />);

        // when
        userEvent.click(screen.getByText(/close/i));

        // then
        expect(onClick).toHaveBeenCalled();
    });

    it('will execute on click when "Enter" is pressed while focused', () => {
        // given
        const onClick: jest.Mock<any, any> = jest.fn();
        render(<Icon name="close" onClick={onClick} />);
        const icon = screen.getByText(/close/i);

        // when
        userEvent.tab();
        expect(icon).toHaveFocus();
        userEvent.keyboard('{enter}');

        // then
        expect(onClick).toHaveBeenCalled();
    });

    it('will execute on click when "Space" is pressed while focused', () => {
        // given
        const onClick: jest.Mock<any, any> = jest.fn();
        render(<Icon name="close" onClick={onClick} />);
        const icon = screen.getByText(/close/i);

        // when
        userEvent.tab();
        expect(icon).toHaveFocus();
        userEvent.keyboard('{space}');

        // then
        expect(onClick).toHaveBeenCalled();
    });

    it('will not execute on click when "Enter" is pressed while not focused', () => {
        // given
        const onClick: jest.Mock<any, any> = jest.fn();
        render(<Icon name="close" onClick={onClick} />);

        // when
        userEvent.keyboard('{enter}');

        // then
        expect(onClick).not.toHaveBeenCalled();
    });

    it('will not execute on click when "Space" is pressed while not focused', () => {
        // given
        const onClick: jest.Mock<any, any> = jest.fn();
        render(<Icon name="close" onClick={onClick} />);

        // when
        userEvent.keyboard('{space}');

        // then
        expect(onClick).not.toHaveBeenCalled();
    });
});
