import React from 'react';
import { screen, render } from '@testing-library/react';

import { Section } from '../src';

describe('Section', () => {
    it('renders correctly', () => {
        // given
        render(<Section>Hello World</Section>);

        // when then
        expect(screen.getByText(/hello world/i)).toBeInTheDocument();
    });
});
