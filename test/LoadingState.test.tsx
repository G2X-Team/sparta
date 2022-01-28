import React from 'react';
import { screen, render } from '@testing-library/react';

import { LoadingState } from '../src';

describe('LoadingState', () => {
    it('renders correctly', () => {
        // given
        render(<LoadingState loading />);
        const loading = document.querySelector('[aria-busy="true"]');

        // when then
        expect(loading).toBeTruthy();
    });

    it('will not render', () => {
        // given
        render(<LoadingState loading />);
        const loading = document.querySelector('[aria-busy="false"]');

        // when then
        expect(loading).not.toBeTruthy();
    });

    it('will render the progressbar type', () => {
        // given
        render(<LoadingState loading size="large" type="progress" progress={0.5} />);
        // when then
        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('will render the spinner type', () => {
        // given
        render(<LoadingState loading size="large" type="spinner" />);
        const loading = document.querySelector('[aria-busy="true"]');

        // when then
        expect(loading).toBeTruthy();
    });
});
