import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Button, ButtonGroup } from '../src';

describe('ButtonGroup', () => {
    it('renders correctly', () => {
        // given
        render(
            <ButtonGroup>
                <Button>First Button</Button>
                <Button>Second Button</Button>
                <Button>Third Button</Button>
            </ButtonGroup>
        );

        // when then
        expect(screen.getAllByText(/ button/i)).toHaveLength(3);
    });

    it('allows buttons to be clicked', () => {
        // given
        const onClick: jest.Mock<any, any> = jest.fn();
        render(
            <ButtonGroup>
                <Button onClick={onClick}>First Button</Button>
                <Button onClick={onClick}>Second Button</Button>
                <Button onClick={onClick}>Third Button</Button>
            </ButtonGroup>
        );
        const buttons: HTMLElement[] = screen.getAllByText(/ button/i);

        // when
        buttons.forEach((button: HTMLElement) => userEvent.click(button));

        // then
        expect(onClick).toHaveBeenCalledTimes(3);
    });

    it('allows for links and redirects', () => {
        // given
        const link: string = 'https://google.com';
        render(
            <ButtonGroup>
                <Button href={link}>First Button</Button>
            </ButtonGroup>
        );

        // when then
        expect(screen.getByText(/first button/i).closest('a')).toHaveAttribute(
            'href',
            link
        );
    });

    it('will disable all buttons when the button group is disabled', () => {
        // given
        const onClick: jest.Mock<any, any> = jest.fn();
        render(
            <ButtonGroup disabled>
                <Button onClick={onClick}>First Button</Button>
                <Button onClick={onClick}>Second Button</Button>
                <Button onClick={onClick}>Third Button</Button>
            </ButtonGroup>
        );
        const buttons: HTMLElement[] = screen.getAllByText(/ button/i);

        // when
        buttons.forEach((button: HTMLElement) => userEvent.click(button));

        // then
        expect(onClick).not.toHaveBeenCalled();
    });
});
