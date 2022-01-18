import React from 'react';
import { screen, render } from '@testing-library/react';

import { Alert, Text } from '../src';

describe('Alert', () => {
    it('renders correctly', () => {
        // given
        render(
            <Alert type="danger">
                <Text bold>Error</Text>
            </Alert>
        );

        // when then
        expect(screen.getByText(/Error/i)).toBeInTheDocument();
    });
});
