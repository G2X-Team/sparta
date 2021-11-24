import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Modal, ButtonGroup, Button, Header, Footer } from '../src';

describe('Modal', () => {
    it('renders correctly', () => {
        // given
        render(<Modal>Hello World!</Modal>);

        // when then
        expect(screen.queryByText(/hello world!/i)).not.toBeInTheDocument();
    })

    it('shows the modal when open', () => {
        // given
        render(<Modal open>Hello World!</Modal>);

        // when then
        expect(screen.getByText(/hello world!/i)).toBeInTheDocument();
    })

    it('renders the Header', () => {
        // given
        render(
            <Modal open>
                <Header>This is the header</Header>
                Hello World!
            </Modal>
        );

        // when then
        expect(screen.getByText(/this is the header/i)).toBeInTheDocument();
    })

    it('renders the Footer', () => {
        // given 
        render(
            <Modal open>
                Hello World!
                <Footer>This is the footer</Footer>
            </Modal>
        )

        // when then
        expect(screen.getByText(/this is the footer/i)).toBeInTheDocument();
    })

    it('renders the button group in the footer', () => {
        // given
        render(
            <Modal open>
                Hello World!
                <Footer>
                    <ButtonGroup>
                        <Button>Button 1</Button>
                        <Button>Button 2</Button>
                    </ButtonGroup>
                </Footer>
            </Modal>
        )

        // when then
        expect(screen.getAllByText(/button /i)).toHaveLength(2);
    })

    it('allows for buttons in button group to be clicked', () => {
        // given
        const onClick: jest.Mock<any, any> = jest.fn();
        render(
            <Modal open>
                Hello World!
                <Footer>
                    <ButtonGroup>
                        <Button onClick={onClick}>Button 1</Button>
                        <Button onClick={onClick}>Button 2</Button>
                    </ButtonGroup>
                </Footer>
            </Modal>
        )

        // when
        screen.getAllByText(/button /i).forEach((button: HTMLElement) => userEvent.click(button));

        // then
        expect(onClick).toHaveBeenCalledTimes(2);
    })
})