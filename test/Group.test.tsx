import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Group, Radio } from '../src';

describe('Group', () => {
    it('renders correctly', () => {
        // given
        render(
            <Group type="radio" name="group">
                <Radio value="1">Option 1</Radio>
                <Radio value="1">Option 2</Radio>
                <Radio value="1">Option 3</Radio>
            </Group>
        );

        // when then
        expect(screen.getAllByText(/option /i)).toHaveLength(3);
    })

    it('assigns group name to every input', () => {
        // given
        render(
            <Group type="radio" name="group">
                <Radio value="1">Option 1</Radio>
            </Group>
        );

        // when then
        expect(screen.getByRole('radio')).toHaveAttribute('name', 'group');
    })

    it('will update the group value when radio is clicked', () => {
        // given
        const onGroupChange: jest.Mock<any, any> = jest.fn();
        const groupValue: string = "1";
        render(
            <Group type="radio" name="group" onGroupChange={onGroupChange}>
                <Radio value={groupValue}>Option 1</Radio>
            </Group>
        )

        // when
        userEvent.click(screen.getByRole('radio'));

        // then
        expect(onGroupChange).toHaveBeenLastCalledWith(groupValue);
    })

    it('will not update the group value if radio is disabled', () => {
        // given
        const onGroupChange: jest.Mock<any, any> = jest.fn();
        const groupValue: string = "1";
        render(
            <Group type="radio" name="group" onGroupChange={onGroupChange}>
                <Radio disabled value={groupValue}>Option 1</Radio>
            </Group>
        )

        // when
        userEvent.click(screen.getByRole('radio'));

        // then
        expect(onGroupChange).not.toHaveBeenLastCalledWith(groupValue);
    })

    it('will call radio onChange method', () => {
        // given
        const onRadioChange: jest.Mock<any, any> = jest.fn();
        render(
            <Group type="radio" name="group">
                <Radio value="groupValue" onChange={onRadioChange}>Option 1</Radio>
            </Group>
        )

        // when
        userEvent.click(screen.getByRole('radio'));

        // then
        expect(onRadioChange).toHaveBeenCalled();
    })
})