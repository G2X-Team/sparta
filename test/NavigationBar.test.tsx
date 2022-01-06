import React from 'react';
import { render, screen } from '@testing-library/react';

import { NavigationBar } from '../src';

describe('NavigationBar', () => {
    it('will render correctly', () => {
        // given
        render(<NavigationBar>Hello</NavigationBar>);

        // when then
        expect(screen.getByText(/hello/i)).toBeInTheDocument();
    });
});
