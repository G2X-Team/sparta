import { configure } from '@storybook/react';
import { ApolloCSS } from '../src/util/Theming';

// https://storybook.js.org/docs/react/writing-stories/parameters#global-parameters
export const parameters = {
    // https://storybook.js.org/docs/react/essentials/actions#automatically-matching-args
    actions: { argTypesRegex: '^on.*' },
};

const apolloCSS = new ApolloCSS({}, document, true);
apolloCSS.applyCSS(document, true);

// automatically import all files ending in *.stories.js
configure(require.context('../src', true, /\.stories\.mdx$/), module);
