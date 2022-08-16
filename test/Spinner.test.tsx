import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations);

import { Spinner } from '../src';

describe('Spinner', () => {
    it('renders correctly', () => {
        // given
        render(<Spinner />);

        // when then
        expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });

    it('has no accessibility violations', async () => {
        // given
        const { container } = render(<Spinner loading />);

        // when
        const results = await axe(container);

        // then
        expect(results).toHaveNoViolations();
    });

    it('renders correctly with loading', () => {
        // given
        render(<Spinner loading />);

        // when then
        expect(screen.getByRole('status')).toBeInTheDocument();
    });
});
