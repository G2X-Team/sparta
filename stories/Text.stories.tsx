import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Text, IText } from '../src/components/Text/Text';

const meta: Meta = {
    title: 'Layout/Text',
    component: Text,
    args: {
        children: 'This is a text component',
    },
};

export default meta;

/**
 * Template text component
 *
 * @param args storybook arguments
 * @return template text
 */
const Template: Story<IText> = (args) => <Text {...args} />;

export const Default = Template.bind({});

/**
 * Header Text
 *
 * @return header text
 */
export const Headers = (): JSX.Element => (
    <React.Fragment>
        <Text header={1}>This is an h1</Text>
        <Text header={2}>This is an h2</Text>
        <Text header={3}>This is an h3</Text>
    </React.Fragment>
);

/**
 * Different types of Text
 *
 * @return different styles of text
 */
export const DifferentStyles = (): JSX.Element => (
    <React.Fragment>
        <Text bold>Bold</Text>
        <Text italic>Italic</Text>
        <Text underline>Underline</Text>
        <Text bold italic underline>
            All Three
        </Text>
    </React.Fragment>
);

/**
 * Different types of casing
 *
 * @return different types of casing
 */
export const DifferentCasing = (): JSX.Element => (
    <React.Fragment>
        <Text upper>upper case</Text>
        <Text lower>LOWER CASE</Text>
        <Text pascal>first letter upper case</Text>
    </React.Fragment>
);

/**
 * Text inside of text
 *
 * @return text inside of text
 */
export const TextInsideOfText = (): JSX.Element => (
    <Text>
        This is the story of how{' '}
        <Text bold inline pascal>
            captain barnacles
        </Text>{' '}
        defeated the{' '}
        <Text italic upper inline>
            evil monster
        </Text>{' '}
        and became the{' '}
        <Text inline underline pascal>
            king of the pirates.
        </Text>
    </Text>
);

/**
 * Demo of blocking text highlight
 *
 * @return Text block highlight demo
 */
export const TextHighlightDisabled = (): JSX.Element => (
    <React.Fragment>
        <Text disabled>This text is disabled which means it can not be highlighend or copied</Text>
    </React.Fragment>
);
