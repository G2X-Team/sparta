import React from 'react';
import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';

import { Dropdown, Button, Text, Option } from '../src';

describe('Dropdown', () => {
    it('renders correctly', () => {
        // given
        render(
            <Dropdown>
                <Button>
                    <Text>Hello World</Text>
                </Button>
                <Option>Option 1</Option>
                <Option>Option 2</Option>
                <Option>Option 3</Option>
            </Dropdown>
        )

        // when then
        expect(screen.getByText(/hello world/i)).toBeInTheDocument();
    })

    it('does not render the items initiall', () => {
        // given
        render(
            <Dropdown>
                <Button>
                    <Text>Hello World</Text>
                </Button>
                <Option>Option 1</Option>
                <Option>Option 2</Option>
                <Option>Option 3</Option>
            </Dropdown>
        )

        // when
        expect(screen.getAllByText(/option /i)).toHaveLength(0);
    })
})