import React from 'react';
import { screen, render, waitFor } from '@testing-library/react';

import { LoadingState, Text, Button } from '../src';

describe('LoadingState', () => {
    it('renders correctly', () => {
        // given
        render(
            <Text>
                Hello World
                <LoadingState loading></LoadingState>
            </Text>
        );

        // when then
        expect(screen.queryByText(/hello world/i)).toBeInTheDocument();
    });

    it('is not visible when collapsed in all types', () => {
        // given
        render(
            <React.Fragment>
                <Text>
                    <LoadingState>Hello World</LoadingState>
                </Text>
            </React.Fragment>
        );
        // when then
        expect(screen.queryByText(/hello world/i)).not.toBeInTheDocument();
    });

    it('will render the large size', () => {
        // given
        render(
            <Text>
                <LoadingState size="large" type="spinner">
                    Hello World
                </LoadingState>
            </Text>
        );
        // when then
        waitFor(() => expect(screen.queryByText(/hello world/i)).toBeInTheDocument());
    });

    it('will render the medium size', () => {
        // given
        render(
            <Text>
                <LoadingState size="medium" type="spinner">
                    Hello World
                </LoadingState>
            </Text>
        );
        // when then
        waitFor(() => expect(screen.queryByText(/hello world/i)).toBeInTheDocument());
    });

    it('will render the small size', () => {
        // given
        render(
            <Text>
                <LoadingState size="small" type="spinner">
                    Hello World
                </LoadingState>
            </Text>
        );
        // when then
        waitFor(() => expect(screen.queryByText(/hello world/i)).toBeInTheDocument());
    });

    it('will render the progress type', () => {
        // given
        render(
            <Button>
                <LoadingState size="small" type="progress" progress={1}>
                    Hello World
                </LoadingState>
            </Button>
        );
        // when then
        waitFor(() => expect(screen.queryByText(/hello world/i)).toBeInTheDocument());
    });
});
