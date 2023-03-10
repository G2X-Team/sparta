import React, { FC, useEffect, useState } from 'react';
import type * as CSS from 'csstype';
import { Section } from '../../Section/Section';
import { Text } from '../../Text/Text';
import { getTimezoneDate } from '../util';
import { CalendarCell } from './CalendarCell';
import { CalendarRange } from './CalendarRange';

interface ICalendarGrid {
    type: 'range' | 'single';
    theme?: string;
    calendarData: string[][];
    startDate?: string;
    marks?: Set<string>;
    dateRange?: string[];
    onChange?: (date: string[]) => void;
    fontSize?: CSS.Property.FontSize;
    id: string;
    setDate: (date: string) => void;
    value?: [string] | [string, string];
}

/**
 * Renders and keeps track of calendar dates
 *
 * @return calendar grid component
 */
export const CalendarGrid: FC<ICalendarGrid> = ({
    calendarData,
    marks = new Set(),
    theme,
    dateRange,
    fontSize = '1rem',
    startDate = new Date().toLocaleDateString(),
    type,
    id,
    value,
    setDate,
    onChange,
}) => {
    // handles current calendar selection
    const [selected, updateSelected] = useSelection(type, startDate, value);
    useOnChange(selected, onChange);

    // get current month
    const [currentMonth] = calendarData?.[1]?.[0]?.split('/') ?? [];

    return (
        <>
            <CalendarRange
                id={id}
                type={type}
                selected={selected}
                setDate={setDate}
                updateSelected={updateSelected}
            />
            <Section
                column
                id={`apollodateBounds${id}-${calendarData.length}`}
                aria-label="select a calendar date"
                tabIndex={0}
                height="100%"
                width="100%"
            >
                <div id="apollodate-day" className={`apollo ${theme}`} data-apollo="CalendarDay">
                    <Text style={{ fontSize }}>Su</Text>
                    <Text style={{ fontSize }}>Mo</Text>
                    <Text style={{ fontSize }}>Tu</Text>
                    <Text style={{ fontSize }}>We</Text>
                    <Text style={{ fontSize }}>Th</Text>
                    <Text style={{ fontSize }}>Fr</Text>
                    <Text style={{ fontSize }}>Sa</Text>
                </div>
                {calendarData.map((week, weekIndex) => (
                    <Section key={`week-${week[0]}`}>
                        {week.map((day, dayIndex) => (
                            <CalendarCell
                                key={`day-${day}`}
                                day={day}
                                selected={selected}
                                marks={marks}
                                dateRange={dateRange}
                                fontSize={fontSize}
                                id={id}
                                theme={theme}
                                currentMonth={currentMonth}
                                weekIndex={weekIndex}
                                dayIndex={dayIndex}
                                updateSelected={updateSelected}
                            />
                        ))}
                    </Section>
                ))}
            </Section>
        </>
    );
};

/**
 * Handles selection of dates
 *
 * @param type type of selection
 * @param startDate currently selected dates
 * @param value override of current value
 * @return hooks that handle selection
 */
const useSelection = (
    type: string,
    startDate: string,
    value?: [string] | [string, string]
): [string[], (date: string | [string] | [string, string]) => void] => {
    const [selected, updateSelected] = useState([getTimezoneDate(startDate).toLocaleDateString()]);

    useEffect(() => {
        if (!value?.length) return;
        if (value === selected) return;
        if (type === 'single' && value.length > 1) return;
        if (value.length > 2) return;

        // format the current value
        const formattedValue = value.map((date) => getTimezoneDate(date).toLocaleDateString());
        updateSelected(formattedValue);
    }, [value]);

    return [
        selected,
        (date: string | [string] | [string, string]) => {
            // handle full range selection
            if (Array.isArray(date)) return updateSelected(date);

            // handle single selection inputs
            if (type === 'single') return updateSelected([date]);

            // convert strings to dates
            const input = new Date(date);
            const selectedDates = selected.map((date) => new Date(date));

            // get start and end dates
            const [start, end] = selectedDates;

            // handle selection of less than one date
            if (!end) {
                // handle single selection behind start date
                if (input.getTime() <= start.getTime()) updateSelected([date]);
                // handle single selection after start date
                else updateSelected([...selected, date]);
            } else {
                // handle selection of more than one date
                updateSelected([date]);
            }
        },
    ];
};

/**
 * Will call onChange function when selected date changes
 *
 * @param selected currently selected date
 * @param onChange function that handles date change
 */
const useOnChange = (selected: string[], onChange?: (date: string[]) => void): void => {
    useEffect(() => {
        if (!onChange) return;
        const [start, end] = selected;
        onChange(end ? [start, end] : [start]);
    }, [selected]);
};
