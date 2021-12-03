import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { LoadingState, Button } from '../src';

describe('LoadingState', () => {
    it('allows for button to be clicked', () => {
        // given
        const onClick: jest.Mock<any, any> = jest.fn();
        render(
            <div>
            <Button onClick={onClick}>Button</Button>
            <LoadingState open>
            </LoadingState>
            </div>
        )

        // when
        screen.getAllByText(/button /i).forEach((button: HTMLElement) => userEvent.click(button));

        // then
        expect(onClick).toHaveBeenCalledTimes(1);
    })
})
