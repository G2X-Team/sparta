import React from 'react';
import { screen, render } from '@testing-library/react';

import { Default as View } from '../stories/View.stories';

describe('View', () => {
    it('renders correctly', () => {
        // given
        render(<View>Hello World!</View>);

        // when then
        expect(screen.getByText(/hello world!/i)).toBeInTheDocument();
    });
});
