import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations);

import { Group, Radio, Checkbox } from '../src';

describe('Group', () => {
    it('complies with WCAG', async () => {
        // given
        const { container: validGroup } = render(
            <Group label="something" type="radio">
                <Radio value="something">something</Radio>
            </Group>
        );

        const { container: validGroupWithHint } = render(
            <Group label="something" type="radio" hint="hint">
                <Radio value="something">something</Radio>
            </Group>
        );

        const { container: invalidGroup } = render(
            <Group label="something" type="radio" invalid>
                <Radio value="something">something</Radio>
            </Group>
        );

        const { container: invalidGroupWithMessage } = render(
            <Group label="something" type="radio" name="name" invalid errorMessage="failed">
                <Radio value="something">something</Radio>
            </Group>
        );

        // when
        const results = [];
        results[0] = await axe(validGroup);
        results[1] = await axe(validGroupWithHint);
        results[2] = await axe(invalidGroup);
        results[3] = await axe(invalidGroupWithMessage);

        // then
        results.forEach((result: any) => expect(result).toHaveNoViolations());
    });

    it('renders correctly', () => {
        // given
        render(
            <Group label="label" type="radio" name="group">
                <Radio value="1">Option 1</Radio>
                <Radio value="1">Option 2</Radio>
                <Radio value="1">Option 3</Radio>
            </Group>
        );

        // when then
        expect(screen.getAllByText(/option /i)).toHaveLength(3);
    });

    it('will render label', () => {
        // given
        render(
            <Group label="label" type="radio" name="group">
                <Radio value="1">Option 1</Radio>
                <Radio value="1">Option 2</Radio>
                <Radio value="1">Option 3</Radio>
            </Group>
        );

        // when then
        expect(screen.getByText(/label/i)).toBeInTheDocument();
    });

    it('will render hint', () => {
        // given
        render(
            <Group label="label" hint="hint" type="radio" name="group">
                <Radio value="1">Option 1</Radio>
                <Radio value="1">Option 2</Radio>
                <Radio value="1">Option 3</Radio>
            </Group>
        );

        // when then
        expect(screen.getByText(/hint/i)).toBeInTheDocument();
    });

    it('will render an error message when conditions are met', () => {
        // given
        render(
            <Group label="label" type="radio" name="group" invalid errorMessage="failed">
                <Radio value="1">Option 1</Radio>
                <Radio value="1">Option 2</Radio>
                <Radio value="1">Option 3</Radio>
            </Group>
        );

        // when then
        expect(screen.getByText(/failed/i)).toBeInTheDocument();
    });

    it('will update the group value when radio is clicked', () => {
        // given
        const onChange: jest.Mock<any, any> = jest.fn();
        const groupValue = '1';
        render(
            <Group label="label" type="radio" name="group" onChange={onChange}>
                <Radio value={groupValue}>Option 1</Radio>
            </Group>
        );

        // when
        userEvent.click(screen.getByRole('radio'));

        // then
        expect(onChange).toHaveBeenLastCalledWith(groupValue);
    });

    it('will not update the group value if radio is disabled', () => {
        // given
        const onChange: jest.Mock<any, any> = jest.fn();
        const groupValue = '1';
        render(
            <Group label="label" type="radio" name="group" onChange={onChange}>
                <Radio disabled value={groupValue}>
                    Option 1
                </Radio>
            </Group>
        );

        // when
        userEvent.click(screen.getByRole('radio'));

        // then
        expect(onChange).not.toHaveBeenLastCalledWith(groupValue);
    });

    it('will call radio onChange method', () => {
        // given
        const onRadioChange: jest.Mock<any, any> = jest.fn();
        render(
            <Group label="label" type="radio" name="group">
                <Radio value="groupValue" onChange={onRadioChange}>
                    Option 1
                </Radio>
            </Group>
        );

        // when
        userEvent.click(screen.getByRole('radio'));

        // then
        expect(onRadioChange).toHaveBeenCalled();
    });

    it('will update the group value correctly for checkboxes', () => {
        // given
        const onChange: jest.Mock<any, any> = jest.fn();
        const groupValue: string[] = ['value 1', 'value 2'];
        render(
            <Group label="label" name="group" type="checkbox" onChange={onChange}>
                <Checkbox value={groupValue[0]}>Option 1</Checkbox>
                <Checkbox value={groupValue[1]}>Option 2</Checkbox>
            </Group>
        );
        const checkboxes: HTMLElement[] = screen.getAllByRole('checkbox');

        // when
        checkboxes.forEach((checkbox: HTMLElement) => {
            userEvent.click(checkbox);
        });

        // then
        expect(onChange).toHaveBeenCalledTimes(3);

        /* because react testing-library doesn't really support multiple toHaveBeenCalledWith 
           as long as we see value change in an array, we can consider this enough for this 
           test to pass 
           
           source: https://github.com/jasmine/jasmine/issues/228 */
        expect(onChange).toHaveBeenLastCalledWith([...groupValue]);
    });

    it('will not update the group value when checkboxes are disabled', () => {
        // given
        const onChange: jest.Mock<any, any> = jest.fn();
        const groupValue: string[] = ['value 1', 'value 2'];
        render(
            <Group label="label" name="group" type="checkbox" onChange={onChange}>
                <Checkbox disabled value={groupValue[0]}>
                    Option 1
                </Checkbox>
                <Checkbox disabled value={groupValue[1]}>
                    Option 2
                </Checkbox>
            </Group>
        );
        const checkboxes: HTMLElement[] = screen.getAllByRole('checkbox');

        // when
        checkboxes.forEach((checkbox: HTMLElement) => {
            userEvent.click(checkbox);
        });

        // then
        expect(onChange).not.toHaveBeenCalledTimes(2);
    });

    it('will call checkbox onChange method', () => {
        // given
        const onCheckboxChange: jest.Mock<any, any> = jest.fn();
        render(
            <Group label="label" name="group" type="checkbox">
                <Checkbox onChange={onCheckboxChange} value="value 1">
                    Option 1
                </Checkbox>
            </Group>
        );

        // when
        userEvent.click(screen.getByRole('checkbox'));

        // then
        expect(onCheckboxChange).toHaveBeenCalled();
    });

    it('can render any element other than the specified type', () => {
        // given
        render(
            <Group label="label" type="checkbox" name="options">
                <Checkbox value="option 1">Option 1</Checkbox>
                <Radio value="option 2">Option 2</Radio>
                <p>option 3</p>
                option 4
            </Group>
        );

        // when then
        expect(screen.getAllByText(/option /i)).toHaveLength(4);
    });

    it('can disable all checkboxes when the group is disabled', () => {
        // given
        const onChange: jest.Mock<any, any> = jest.fn();
        render(
            <Group label="label" name="group" type="checkbox" disabled>
                <Checkbox value="value 1" onChange={onChange}>
                    Option 1
                </Checkbox>
                <Checkbox value="value 2" onChange={onChange}>
                    Option 2
                </Checkbox>
            </Group>
        );
        const inputs: HTMLElement[] = screen.getAllByRole('checkbox');

        // when
        inputs.forEach((input: HTMLElement) => userEvent.clear(input));

        // then
        expect(onChange).not.toHaveBeenCalled();
    });

    it('can disable all radios when the group is disabled', () => {
        // given
        const onChange: jest.Mock<any, any> = jest.fn();
        render(
            <Group label="label" name="group" type="radio" disabled>
                <Radio value="value 1" onChange={onChange}>
                    Option 1
                </Radio>
                <Radio value="value 2" onChange={onChange}>
                    Option 2
                </Radio>
            </Group>
        );
        const inputs: HTMLElement[] = screen.getAllByRole('radio');

        // when
        inputs.forEach((input: HTMLElement) => userEvent.click(input));

        // then
        expect(onChange).not.toHaveBeenCalled();
    });
});
