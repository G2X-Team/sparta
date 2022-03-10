import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react';

import { Modal, IModal } from '../src/components/Modal/Modal';
import { Button, Text, Header, Footer, ButtonGroup } from '../src';

const meta: Meta = {
    title: 'Layout/Modal',
    component: Modal,
};

export default meta;

/**
 * Template Modal
 *
 * @param args storybook arguments
 * @return template modal component
 */
const Template: Story<IModal> = (args) => {
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

export const Default = Template.bind({});
