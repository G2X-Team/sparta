import React, { FC, useEffect, useState } from 'react';
import { TextInput } from '../../TextInput/TextInput';
import { Section } from '../../Section/Section';

interface ICalendar {
    /** Type of calendar */
    type: 'range' | 'single';
    /** Determines whether the calender is used for date ranges or single dates */
    selected: string[];
    /** Determines what date the calendar starts on, by default it's the current date */
    updateSelected: (date: string | [string] | [string, string]) => void;
    /**  */
    setDate: (date: string) => void;
}

/**
 * Input that keeps track of range selection
 *
 * @return Calendar Range input
 */
export const CalendarRange: FC<ICalendar> = ({ type, selected, updateSelected, setDate }) => {
    const [range, setRange] = useRangeInput(selected, updateSelected, setDate);

    return type === 'range' ? (
        <Section
            alignItems="center"
            justifyContent="space-between"
            width="calc(100% - 15px)"
            gap="5px"
        >
            <TextInput
                placeholder="mm/dd/yyyy"
                style={{ width: 120 }}
                name="start"
                label="Start Date"
                onChange={(e) => setRange('start', e)}
                value={range.start}
                hideLabel
            />
            <div className="apollo-range-divider" />
            <TextInput
                style={{ width: 120 }}
                name="end"
                label="End Date"
                placeholder="mm/dd/yyyy"
                onChange={(e) => setRange('end', e)}
                value={range.end}
                hideLabel
            />
        </Section>
    ) : null;
};

/**
 * Will give the necessary handlers to handle range selection
 *
 * @param selected current selected dates
 * @param updateSelected function that updates selected
 * @param setDate function that changes calendar date
 * @return functions to handle range selection
 */
const useRangeInput = (
    selected: string[],
    updateSelected: (dates: string | [string] | [string, string]) => void,
    setDate: (date: string) => void
): [{ start: string; end: string }, (type: 'start' | 'end', event: any) => void] => {
    const [range, setRange] = useState({ start: selected[0] ?? '', end: selected[1] ?? '' });

    useEffect(() => {
        setRange({ start: selected[0] ?? '', end: selected[1] ?? '' });
    }, [selected]);

    return [
        range,
        (type: 'start' | 'end', inputEvent: any) => {
            const dateStr = inputEvent.target.value;

            // update the range
            setRange({ ...range, [type]: dateStr });

            // format current into current dates
            const [start, end] = selected.map((date) => new Date(date));

            // check that the date is valid
            const isValidFormat = dateStr.match(
                '^(0?[1-9]|1[0-2])[-./](0?[1-9]|[12][0-9]|3[01])[-./]([12][0-9]{3})$'
            );

            if (isValidFormat) {
                // check that the date is valid when february accounting for leap years
                const [monthStr, dayStr, yearStr] = dateStr.split('/');

                const month = parseInt(monthStr);
                const day = parseInt(dayStr);
                const year = parseInt(yearStr);

                // check that date is valid with leap years
                if ((month === 2 && day > 29) || (day === 29 && year % 4 !== 0)) {
                    return;
                }

                // check that if start date, it should be before the end date
                if (type === 'start' && end < new Date(dateStr)) {
                    return;
                }

                // check that if end date, it should be after the start date
                if (type === 'end' && start > new Date(dateStr)) {
                    return;
                }

                // update the selected date
                updateSelected([
                    type === 'start' ? dateStr : selected[0],
                    type === 'end' ? dateStr : selected[1],
                ]);
                setDate(dateStr);
            }
        },
    ];
};
