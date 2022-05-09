import React from 'react';
import { screen, render } from '@testing-library/react';

import { Grid } from '../src';

describe('Grid', () => {
    it('should render correctly', () => {
        // given
        render(
            <Grid>
                <div>Hello</div>
                <div>World</div>
            </Grid>
        );

        // when then
        expect(screen.getByText('Hello')).toBeInTheDocument();
        expect(screen.getByText('World')).toBeInTheDocument();
    });
});
