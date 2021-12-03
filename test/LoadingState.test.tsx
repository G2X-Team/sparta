import React from 'react';
import { screen, render } from '@testing-library/react';

import { LoadingState } from '../src';

describe('LoadingState', () => {
    it('renders correctly', () => {
        // given
        render(<LoadingState>Hello World!</LoadingState>);

        // when then
        expect(screen.queryByText(/hello world!/i)).not.toBeInTheDocument();
    })
})
