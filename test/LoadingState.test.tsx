import React from 'react';
import { screen, render, waitFor } from '@testing-library/react';

import { LoadingState, Text } from '../src';

describe('LoadingState', () => {
    it('renders correctly', () => {
        // given
        render(<LoadingState>Hello World!</LoadingState>);

        // when then
        expect(screen.queryByText(/hello world!/i)).not.toBeInTheDocument();
    });

    it('will render the progressbar type', () => {
        // given
        render(<LoadingState size="large" type="progress" progress={0.5}></LoadingState>);
        // when then
        waitFor(() => expect(screen.getByRole('progressbar')).toBeInTheDocument());
    });

    it('will render the spinner type', () => {
        // given
        render(
            <Text>
                <LoadingState size="large" type="spinner">
                    Hello World
                </LoadingState>
            </Text>
        );
        // when then
        const label = screen.queryByText(/hello world/i);
        waitFor(() => expect(label).toHaveAttribute('aria-busy', 'true'));
    });
});
