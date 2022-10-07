import React, { useState, useRef } from 'react';
import type { SampleStory } from './utils/util';
import { Button } from '../../src';

export const StandardButton: SampleStory = (args) => <Button {...args} />;

export const ButtonRefs: SampleStory = (args) => {
    const ref = useRef(null);

    return (
        <Button ref={ref} onClick={() => window.alert(`button ref: ${ref.current}`)}>
            Click me
        </Button>
    );
};

export const LoadingButton: SampleStory = (args) => {
    const [loading, setLoading] = useState(false);

    return (
        <Button onClick={() => setLoading(!loading)} loading={loading}>
            Click me
        </Button>
    );
};
