import React from 'react';
import { screen, render } from '@testing-library/react';

import { LoadingState } from '../src';

describe('Drawer', () => {
    it('it renders correctly', () => {
        // given
        render(<LoadingState>Hello World!</LoadingState>);

        // when then
        expect(screen.getByText(/hello world/i)).toBeInTheDocument();
    });

    it('is not visible when collapsed in all types', () => {
        // given
        render(
            <React.Fragment>
                <LoadingState type="inline">Hello World inline</LoadingState>
            </React.Fragment>
        );
        // when then
        expect(screen.queryAllByText(/hello world inline/i)).toHaveLength(0);
    });

    it('will be visible when not collapsed in all types', () => {
        // given
        render(
            <React.Fragment>
                <LoadingState open={true} type="inline">
                    Hello World
                </LoadingState>
                <LoadingState open={true} type="absolute">
                    Hello World
                </LoadingState>
            </React.Fragment>
        );
        // when then
        expect(screen.queryAllByText(/hello world/i)).toHaveLength(3);
    });

    it('will render the large size', () => {
        // given
        render(
            <LoadingState type="absolute" size="large" variant="static">
                Hello World
            </LoadingState>
        );
        // when then
        expect(screen.getByText(/hello world/i)).toBeInTheDocument();
    });

    it('will render the medium size', () => {
        // given
        render(
            <LoadingState type="absolute" size="medium" variant="static">
                Hello World
            </LoadingState>
        );
        // when then
        expect(screen.getByText(/hello world/i)).toBeInTheDocument();
    });

    it('will render the small size', () => {
        // given
        render(
            <LoadingState type="absolute" size="small" variant="static">
                Hello World
            </LoadingState>
        );
        // when then
        expect(screen.getByText(/hello world/i)).toBeInTheDocument();
    });

    it('will render the progress varrient', () => {
        // given
        render(
            <LoadingState type="absolute" size="small" variant="progress">
                Hello World
            </LoadingState>
        );
        // when then
        expect(screen.getByText(/hello world/i)).toBeInTheDocument();
    });
});
