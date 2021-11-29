import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Icon } from '../src';

describe('Icon', () => {
    it('renders correctly', () => {
        // given
        render(<Icon name="close"/>);

        // when then
        expect(screen.getByText(/close/i)).toBeInTheDocument();
    })

    it('will trigger on click callback', () => {
        // given
        const onClick: jest.Mock<any, any> = jest.fn();
        render(<Icon name="close" onClick={onClick} />);

        // when
        userEvent.click(screen.getByText(/close/i));

        // then
        expect(onClick).toHaveBeenCalled();
    })
})