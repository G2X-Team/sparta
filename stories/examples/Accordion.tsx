import React from 'react';
import type { SampleStory } from './utils/util';
import { Accordion, TextInput } from '../../src';

// the name of this function should be the name of the story in the docs
export const BasicAccordion: SampleStory = (args) => (
    <Accordion {...args}>Basic Accordion</Accordion>
);

export const AccordionMenu: SampleStory = (args) => (
    <>
        <Accordion id="option-1" header="Option 1">
            Content of option 1
        </Accordion>
        <Accordion id="option-2" header="Option 2">
            Content of option 2
        </Accordion>
        <Accordion id="option-3" header="Option 3">
            Content of option 3
        </Accordion>
    </>
);

export const ControlledAccordionMenu: SampleStory = (args) => {
    const [open, setOpen] = React.useState<string | null>(null);

    return (
        <>
            <Accordion
                id="option-1"
                header="Option 1"
                override={open === 'option-1'}
                onClick={() => setOpen('option-1')}
            >
                Content of option 1
            </Accordion>
            <Accordion
                id="option-2"
                header="Option 2"
                override={open === 'option-2'}
                onClick={() => setOpen('option-2')}
            >
                Content of option 2
            </Accordion>
            <Accordion
                id="option-3"
                header="Option 3"
                override={open === 'option-3'}
                onClick={() => setOpen('option-3')}
            >
                Content of option 3
            </Accordion>
        </>
    );
};
