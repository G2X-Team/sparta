import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Default as Option } from '../stories/Option.stories';

describe('Option', () => {
    it('renders correctly', () => {
        // given
        render(<Option>Hello World!</Option>);

        // when then
        expect(screen.getByText(/hello world!/i)).toBeInTheDocument();
    });

    it('will perform on click callback', () => {
        // given
        const onClick: jest.Mock<any, any> = jest.fn();
        render(<Option onClick={onClick}>Hello World!</Option>);

        // when
        userEvent.click(screen.getByText(/hello world!/i));

        // then
        expect(onClick).toHaveBeenCalled();
    });
});
