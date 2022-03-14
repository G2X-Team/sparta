import React from 'react';
import { screen, render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations);

import { LoadingState } from '../src';

describe('LoadingState', () => {
    it('complies with WCAG 2.0', async () => {
        // given: you need to test all variants of this component, make sure all states are present
        const { container: progressBar } = render(
            <LoadingState
                loading
                size="large"
                type="progress"
                progress={0.5}
                label="progressbar_id"
            />
        );

        const { container: spinner } = render(
            <LoadingState size="large" type="spinner" loading label="spinner_id" />
        );

        // when
        const results = [];
        results[0] = await axe(progressBar);
        results[1] = await axe(spinner);

        // then
        results.forEach((result: any) => expect(result).toHaveNoViolations());
    });

    it('renders correctly', () => {
        // given
        render(<LoadingState loading label="progressbar_id" />);
        const loading = document.querySelector('[aria-busy="true"]');

        // when then
        expect(loading).toBeTruthy();
    });

    it('will not render', () => {
        // given
        render(<LoadingState loading label="progressbar_id" />);
        const loading = document.querySelector('[aria-busy="false"]');

        // when then
        expect(loading).not.toBeTruthy();
    });

    it('will render the progressbar type', () => {
        // given
        render(
            <LoadingState
                loading
                label="progressbar_id"
                size="large"
                type="progress"
                progress={0.5}
            />
        );

        // when then
        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('will render the spinner type', () => {
        // given
        render(<LoadingState loading label="spinner_id" size="large" type="spinner" />);

        // when then
        expect(screen.queryByLabelText('spinner_id')).toBeInTheDocument();
    });
});
