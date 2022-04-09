import React from 'react';
import { screen, render } from '@testing-library/react';

import { Footer } from '../src';

describe('Footer', () => {
    it('renders correctly', () => {
        // given
        render(<Footer>Hello World</Footer>);

        // when then
        expect(screen.getByText(/hello world/i)).toBeInTheDocument();
    });
});
