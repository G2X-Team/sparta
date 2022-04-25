import React, { useState } from 'react';
import type { SampleStory } from './util';
import { ErrorMessage, Card, Text, Divider, Button } from '../../src';

// the name of this function should be the name of the story in the docs
export const StandaloneError: SampleStory = (args) => <ErrorMessage {...args} />;

export const ProperUseOfErrorMessage: SampleStory = (args) => {
    const [active, setActive] = useState(false);

    return (
        <Card>
            <Text header={3}>Something will happen if you click the button!</Text>
            <Divider />
            <Text>Click it</Text>
            <br />
            <Button onClick={() => setActive(!active)} aria-errormessage="click-error">
                Click me :)
            </Button>
            <ErrorMessage {...args} id="click-error" active={args.active || active}>
                Nothing Happened :/
            </ErrorMessage>
        </Card>
    );
};
