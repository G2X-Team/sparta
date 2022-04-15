import React from 'react';
import { useState } from 'react';
import type { SampleStory } from './util';
import { Modal, Button, Text, Header, Footer, ButtonGroup } from '../../src';

export const StandardModal: SampleStory = (args) => {
    const [open, toggleModal] = useState(false);
    return (
        <React.Fragment>
            <Button onClick={() => toggleModal(!open)}>Open Modal</Button>
            <Modal
                id="modal"
                label="This is a Modal"
                description="This is a modal that shows dialogue."
                open={open}
                toggleModal={() => toggleModal(!open)}
                {...args}
            >
                <Footer>
                    <Button variant="secondary">Accept</Button>
                </Footer>
            </Modal>
        </React.Fragment>
    );
};

export const AlertModal: SampleStory = (args) => {
    const [open, toggleModal] = useState(false);
    return (
        <React.Fragment>
            <Button onClick={() => toggleModal(!open)}>Open Modal</Button>
            <Modal
                id="modal"
                label="This is a Modal"
                description="This is a modal that shows dialogue."
                open={open}
                toggleModal={() => toggleModal(!open)}
                {...args}
            >
                <Footer>
                    <Button variant="secondary">Accept</Button>
                </Footer>
            </Modal>
        </React.Fragment>
    );
};

export const ButtonsGroup: SampleStory = (args) => {
    const [open, toggleModal] = useState(false);
    return (
        <React.Fragment>
            <Button onClick={() => toggleModal(!open)}>Open Modal</Button>
            <Modal
                id="modal"
                label="This is a Modal"
                description="This is a modal that shows dialogue."
                open={open}
                toggleModal={() => toggleModal(!open)}
                {...args}
            >
                <Footer>
                    <ButtonGroup>
                        <Button variant="secondary">Accept</Button>
                        <Button>Decline</Button>
                    </ButtonGroup>
                </Footer>
            </Modal>
        </React.Fragment>
    );
};
