import React from 'react';
import { screen, render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations);

import { Avatar } from '../src';
import userEvent from '@testing-library/user-event';

describe('Avatar', () => {
    it('complies to WCAG 2.0', async () => {
        // given
        const { container: avatar } = render(
            <Avatar
                fallback="John Doe"
                picture="https://randomuser.me/api/portraits/"
                size="large"
            />
        );

        const { container: clickableAvatar } = render(
            <Avatar
                fallback="John Doe"
                picture="https://randomuser.me/api/portraits/"
                size="large"
                clickable
            />
        );

        // when
        const results = [];
        results.push(await axe(avatar));
        results.push(await axe(clickableAvatar));

        // then
        results.forEach((result) => {
            expect(result).toHaveNoViolations();
        });
    });

    it('renders correctly', () => {
        // given
        render(<Avatar fallback="John Doe" />);

        // when then
        expect(screen.getByText(/jd/i)).toBeInTheDocument();
    });

    it('will trigger on click callback', () => {
        // given
        const onClick: jest.Mock<any, any> = jest.fn();
        render(<Avatar fallback="John Doe" onClick={onClick} />);

        // when
        userEvent.click(screen.getByText(/jd/i));

        // then
        expect(onClick).toHaveBeenCalled();
    });

    it('will execute on click when "Enter" is pressed while focused', () => {
        // given
        const onClick: jest.Mock<any, any> = jest.fn();
        render(<Avatar fallback="John Doe" onClick={onClick} />);
        const avatar = screen.getByText(/jd/i);

        // when
        userEvent.tab();
        if (avatar.parentElement) expect(avatar.parentElement).toHaveFocus();
        else throw new Error('Avatar is not in a container');
        userEvent.keyboard('{enter}');

        // then
        expect(onClick).toHaveBeenCalled();
    });

    it('will execute on click when "Space" is pressed while focused', () => {
        // given
        const onClick: jest.Mock<any, any> = jest.fn();
        render(<Avatar fallback="John Doe" onClick={onClick} />);
        const avatar = screen.getByText(/jd/i);

        // when
        userEvent.tab();
        if (avatar.parentElement) expect(avatar.parentElement).toHaveFocus();
        else throw new Error('Avatar is not in a container');
        userEvent.keyboard('{space}');

        // then
        expect(onClick).toHaveBeenCalled();
    });

    it('will not execute on click when "Enter" is pressed while not focused', () => {
        // given
        const onClick: jest.Mock<any, any> = jest.fn();
        render(<Avatar fallback="John Doe" onClick={onClick} />);

        // when
        userEvent.keyboard('{enter}');

        // then
        expect(onClick).not.toHaveBeenCalled();
    });

    it('will not execute on click when "Space" is pressed while not focused', () => {
        // given
        const onClick: jest.Mock<any, any> = jest.fn();
        render(<Avatar fallback="John Doe" onClick={onClick} />);

        // when
        userEvent.keyboard('{space}');

        // then
        expect(onClick).not.toHaveBeenCalled();
    });
});
