import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react';

import { ButtonGroup, Props } from '../src/components/ButtonGroup/ButtonGroup';
import { Button, Switch } from '../src';

const meta: Meta = {
    title: 'Layout/Button Group',
    component: ButtonGroup,
};

export default meta;

/**
 * Template component for button group
 *
 * @param args storybook arguments
 * @return template component
 */
const Template: Story<Props> = (args) => {
    const [checked, setChecked] = useState(false);
    return (
        <>
            <ButtonGroup {...args}>
                <Button>First Button</Button>
                <Button>Second Button</Button>
                <Button>Third Button Button</Button>
            </ButtonGroup>
            <Switch onChange={() => setChecked(!checked)} name="something">
                Hello World
            </Switch>
        </>
    );
};

export const Default = Template.bind({});
