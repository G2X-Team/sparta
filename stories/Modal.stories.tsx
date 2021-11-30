import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react';

import { Modal, Props } from '../src/components/Modal/Modal';
import { Button, Text, Header, Footer, ButtonGroup } from '../src';

const meta: Meta = {
    title: "Layout/Modal",
    component: Modal
}

export default meta;

const Template: Story<Props> = (args) => {
    const [open, toggleModal] = useState(false);

    return (
        <React.Fragment>
            <Button onClick={() => toggleModal(!open)}>Open Modal</Button>
            <Modal open={open} toggleModal={() => toggleModal(!open)}>
                <Header>
                    <Text header={2} bold>This is a Modal</Text>
                </Header>
                <Text>This is a modal that shows dialogue.</Text>
                <Footer>
                    <ButtonGroup>
                        <Button variant="secondary">Accept</Button>
                        <Button>Decline</Button>
                    </ButtonGroup>
                </Footer>
            </Modal>
        </React.Fragment>
    )
}

export const Default = Template.bind({});