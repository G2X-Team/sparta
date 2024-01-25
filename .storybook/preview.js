import { configure } from '@storybook/react';
import { SpartaCSS } from '../src/util/Theming';

// https://storybook.js.org/docs/react/writing-stories/parameters#global-parameters
export const parameters = {
    // https://storybook.js.org/docs/react/essentials/actions#automatically-matching-args
    actions: { argTypesRegex: '^on.*' },
};

const spartaCSS = new SpartaCSS({}, document, true);
spartaCSS.applyCSS(document, true);

// automatically import all files ending in *.stories.js
configure(require.context('../src', true, /\.stories\.mdx$/), module);
