import React from 'react';
import { render, screen } from '@testing-library/react';
import { Calendar } from '../src';
import { axe, toHaveNoViolations } from 'jest-axe';
import userEvent from '@testing-library/user-event';
expect.extend(toHaveNoViolations);

describe('Calendar', () => {
    it('should be accessible through keyboard', async () => {
        // given
        const onChange = jest.fn();
        render(<Calendar id="test" startDate="2021-01-01" onChange={onChange} />);

        // when
        userEvent.tab(); // in app
        userEvent.tab(); // in controls
        userEvent.tab(); // in left arrow
        userEvent.tab(); // in month
        userEvent.tab(); // in right arrow
        userEvent.tab(); // in calendar selection
        userEvent.tab(); // in 27th

        // then
        userEvent.keyboard('{ArrowRight}'); // in 28th
        userEvent.keyboard('{enter}'); // in 28th
        expect(onChange).toHaveBeenCalledWith(['12/28/2020']);

        userEvent.keyboard('{ArrowDown}'); // in 4th
        userEvent.keyboard('{enter}'); // in 4th
        expect(onChange).toHaveBeenCalledWith(['1/4/2021']);

        userEvent.keyboard('{ArrowUp}'); // in 28th
        userEvent.keyboard('{enter}'); // in 28th
        expect(onChange).toHaveBeenCalledWith(['12/28/2020']);

        userEvent.keyboard('{ArrowLeft}'); // in 27th
        userEvent.keyboard('{enter}'); // in 27th
        expect(onChange).toHaveBeenCalledWith(['12/27/2020']);
    });

    it('should render', () => {
        // given
        render(<Calendar id="test" />);

        // when then
        expect(screen.getByRole('application')).toBeInTheDocument();
    });

    it('should comply with WCAG 2.0 AA', async () => {
        // given
        const { container } = render(<Calendar id="test" />);

        // when
        const results = await axe(container);

        // then
        expect(results).toHaveNoViolations();
    });

    it('should render the current month to align with start date', () => {
        // given
        render(<Calendar id="test" startDate="2021-01-01" />);

        // when then
        expect(screen.getByText('January 2021')).toBeInTheDocument();
    });

    it('should have set the active day to align with start date', () => {
        // given
        render(<Calendar id="test" startDate="2021-01-01" />);

        // when then
        expect(screen.getByLabelText('selected, Friday, January 1'));
    });

    it('should increase month when clicking the right arrow', () => {
        // given
        render(<Calendar id="test" startDate="2021-01-01" />);

        // when
        userEvent.click(screen.getByLabelText(/next month/i));

        // then
        expect(screen.getByText('February 2021')).toBeInTheDocument();
    });

    it('should decrease month when clicking on the left arrow', () => {
        // given
        render(<Calendar id="test" startDate="2021-01-01" />);

        // when
        userEvent.click(screen.getByLabelText(/previous month/i));

        // then
        expect(screen.getByText('December 2020')).toBeInTheDocument();
    });

    it('should render with marks', () => {
        // given
        render(<Calendar id="test" startDate="2021-01-01" marks={['2021-01-02']} />);

        // when then
        expect(screen.queryByLabelText('Saturday, January 2, marked')).toBeInTheDocument();
    });

    it('should set the date when clicking on a day', () => {
        // given
        const onChange = jest.fn();
        render(<Calendar id="test" startDate="2021-01-01" onChange={onChange} />);

        // when
        userEvent.click(screen.getByLabelText('Saturday, January 2'));

        // then
        expect(onChange).toHaveBeenCalledWith(['1/2/2021']);
    });

    it('should not be able to select a day before the min date', () => {
        // given
        const onChange = jest.fn();
        render(
            <Calendar
                id="test"
                startDate="2021-01-01"
                onChange={onChange}
                dateRange={['2021-01-02']}
            />
        );

        // when
        userEvent.click(screen.getByLabelText('selected, Friday, January 1'));

        // then
        expect(onChange).not.toHaveBeenCalledTimes(2); // 1 for the initial render
    });

    it('should select a valid date range', () => {
        // given
        const onChange = jest.fn();
        render(
            <Calendar id="test-range" startDate="2021-01-01" onChange={onChange} type="range" />
        );

        // when
        userEvent.click(screen.getByLabelText('Saturday, January 2'));

        // then
        expect(onChange).toHaveBeenCalledWith(['1/1/2021', '1/2/2021']);
    });

    it('should select the correct dates when using range input', async () => {
        // given
        const onChange = jest.fn();
        render(
            <Calendar
                id="test-range"
                startDate="2021-01-01"
                onChange={onChange}
                type="range"
                dateRange={['2021-01-02', '2021-01-03']}
            />
        );

        // when
        userEvent.clear(screen.getByLabelText(/start date/i));
        await userEvent.type(screen.getByLabelText(/start date/i), '1202/2/1', { delay: 1 });
        await userEvent.type(screen.getByLabelText(/end date/i), '1202/3/1', { delay: 1 });

        // then
        expect(onChange).toHaveBeenCalledWith(['1/2/2021', '1/3/2021']);
    });

    it('should only return a single element if only the start is specified', async () => {
        // given
        const onChange = jest.fn();
        render(
            <Calendar
                id="test-range"
                startDate="2021-01-01"
                onChange={onChange}
                type="range"
                dateRange={['2021-01-02']}
            />
        );

        // when
        await userEvent.type(screen.getByLabelText(/end date/i), '1202/2/1', { delay: 1 });

        // then
        expect(onChange).toHaveBeenCalledWith(['1/1/2021', '1/2/2021']);
    });
});
