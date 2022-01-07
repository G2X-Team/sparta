/* eslint-disable max-len */
import React from 'react';
import { render, screen } from '@testing-library/react';

import { NavigationBar, Option, Section } from '../src';

describe('NavigationBar', () => {
    it('will render correctly', () => {
        // given
        render(<NavigationBar>Hello</NavigationBar>);

        // when then
        expect(screen.getByText(/hello/i)).toBeInTheDocument();
    });

    /**
     * Due to limiations of jest-dom, the section turning into a hamburger menu cannot be tested.
     * For more information, please refer to:
     *
     * https://stackoverflow.com/questions/64281467/react-testing-library-rtl-test-a-responsive-design
     */
});
