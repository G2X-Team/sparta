import { configure } from '@storybook/react'

// https://storybook.js.org/docs/react/writing-stories/parameters#global-parameters
export const parameters = {
    // https://storybook.js.org/docs/react/essentials/actions#automatically-matching-args
    actions: { argTypesRegex: '^on.*' },
};

// automatically import all files ending in *.stories.js
configure(require.context('../src', true, /\.stories\.mdx$/), module);