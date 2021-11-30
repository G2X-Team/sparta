import React from 'react';
import { screen, render, waitFor } from '@testing-library/react';

import { LoadingState, Text, Button } from '../src';

describe('LoadingState', () => {
    it('it renders correctly', () => {
        // given
        render(
            <Text>
                Hello World<LoadingState open></LoadingState>
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
                    <LoadingState type="inline">Hello World</LoadingState>
                </Text>
            </React.Fragment>
        );
        // when then
        expect(screen.queryByText(/hello world/i)).not.toBeInTheDocument();
    });

    it('will be visible when not collapsed in all types', () => {
        // given
        render(
            <React.Fragment>
                <Text>
                    <LoadingState open type="inline">
                        Hello World
                    </LoadingState>
                </Text>
                <Button>
                    <LoadingState open type="absolute">
                        Hello World
                    </LoadingState>
                </Button>
            </React.Fragment>
        );
        // when then
        waitFor(() => expect(screen.queryByText(/hello world/i)).toBeInTheDocument());
    });

    it('will render the large size', () => {
        // given
        render(
            <Text>
                <LoadingState type="absolute" size="large" variant="static">
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
                <LoadingState type="absolute" size="medium" variant="static">
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
                <LoadingState type="absolute" size="small" variant="static">
                    Hello World
                </LoadingState>
            </Text>
        );
        // when then
        waitFor(() => expect(screen.queryByText(/hello world/i)).toBeInTheDocument());
    });

    it('will render the progress varrient', () => {
        // given
        render(
            <Button>
                <LoadingState type="absolute" size="small" variant="progress" progressFilled={1}>
                    Hello World
                </LoadingState>
            </Button>
        );
        // when then
        waitFor(() => expect(screen.queryByText(/hello world/i)).toBeInTheDocument());
    });
});
