import React, { useRef } from 'react';
import type { SampleStory } from './util';
import { Button, Form, TextInput } from '../../src';

// the name of this function should be the name of the story in the docs
export const StandardTextInput: SampleStory = (args) => <TextInput {...args} />;

export const InputWithRef: SampleStory = (args) => {
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <>
            <Button onClick={() => inputRef.current?.focus()} style={{ marginBottom: 20 }}>
                Focus Input
            </Button>
            <TextInput {...args} ref={inputRef} name="something " />
        </>
    );
};
