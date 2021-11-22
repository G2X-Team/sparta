import React from 'react';
import { screen, render } from '@testing-library/react';

import { Default as Header } from '../stories/Header.stories';

describe('Header', () => {
    it('renders correctly', () => {
        // given 
        render(<Header>Hello World</Header>);

        // when then
        expect(screen.getByText(/hello world/i)).toBeInTheDocument();
    })
})