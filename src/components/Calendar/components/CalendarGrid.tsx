import React, { FC, useEffect, useState } from 'react';
import type * as CSS from 'csstype';
import { Section } from '../../Section/Section';
import { Text } from '../../Text/Text';
import { getTimezoneDate } from '../util';

interface ICalendarGrid {
    theme?: string;
    calendarData: string[][];
    startDate?: string;
    marks?: Set<string>;
    dateRange?: string[];
    onChange?: (date: string) => void;
    fontSize?: CSS.Property.FontSize;
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
    onChange,
}) => {
    useArrowNavigation();

    // handles current calendar selection
    const [selected, updateSelected] = useState(getTimezoneDate(startDate).toLocaleDateString());
    useOnChange(selected, onChange);

    // get current month
    const [currentMonth] = calendarData?.[1]?.[0]?.split('/') ?? [];

    return (
        <Section
            column
            id={`apollodateBounds-${calendarData.length}`}
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
                    {week.map((day, dayIndex) => {
                        const [dateMonth] = day.split('/');
                        const active = selected === day;
                        const marked = marks.has(day);
                        const date = new Date(day);

                        // check if date is within range
                        let isValid = true;
                        if (dateRange) {
                            const [start, end] = dateRange;
                            const currentDate = date.getTime();

                            const startDate = new Date(start).getTime();
                            isValid = startDate <= currentDate;

                            if (end) {
                                const endDate = new Date(end).getTime();
                                isValid = isValid && endDate >= currentDate;
                            }
                        }

                        return (
                            <button
                                data-apollo="CalendarDate"
                                key={`day-${day}`}
                                disabled={!isValid}
                                style={{ fontSize }}
                                aria-label={`${active ? 'selected, ' : ''}${date.toLocaleString(
                                    'en-US',
                                    {
                                        weekday: 'long',
                                        month: 'long',
                                        day: 'numeric',
                                    }
                                )}${marked ? ', marked' : ''}`}
                                className={`
                                    apollo
                                    ${theme}
                                    apollodate 
                                    ${currentMonth !== dateMonth ? 'not-current' : ''}
                                    ${active ? 'selected' : ''}
                                `}
                                id={getDateId(weekIndex, dayIndex)}
                                onClick={() => updateSelected(day)}
                            >
                                <Text>{date.getDate()}</Text>
                                <div
                                    className={`apollo ${theme}  ${active ? 'selected' : ''}`}
                                    data-apollo="CalendarMark"
                                    style={{ opacity: marked ? 1 : 0 }}
                                />
                            </button>
                        );
                    })}
                </Section>
            ))}
        </Section>
    );
};

/**
 * Hook that handles navigation on calendar element
 * @param setDate function that sets the date
 */
const useArrowNavigation = (): void => {
    // Add event listeners
    useEffect(() => {
        window.addEventListener('keydown', (event) => handleNavigation(event));

        // Remove event listeners on cleanup
        return () => {
            window.removeEventListener('keydown', (event) => handleNavigation(event));
        };
    }, []);
};

/**
 * Function that handles keypresses
 *
 * @param event keyboard event
 * @param setDate function that sets the date
 */
const handleNavigation = (event: KeyboardEvent): void => {
    // check if there is an active element within scope of our calendar
    const apolloDate = document?.activeElement?.id;
    if (!apolloDate?.includes('apollodate-')) return;

    // prevent default behavior for arrow keys
    if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].indexOf(event.code) > -1) {
        event.preventDefault();
    }

    // extract relevant information from id
    const [, weekIndexStr, dayIndexStr] = apolloDate.split('-');
    const weekIndex = parseInt(weekIndexStr);
    const dayIndex = parseInt(dayIndexStr);

    // get date bounds
    const [, boundsStr] = document.querySelector('[id^="apollodateBounds-"]')?.id?.split('-') ?? [];
    const bounds = parseInt(boundsStr);

    // switch based on key
    switch (event?.key) {
        case 'Left':
        case 'ArrowLeft':
            if (dayIndex > 0) {
                document?.getElementById(getDateId(weekIndex, dayIndex - 1))?.focus();
            } else if (weekIndex > 0) {
                document?.getElementById(getDateId(weekIndex - 1, 6))?.focus();
            }
            break;
        case 'Right':
        case 'ArrowRight':
            if (dayIndex < 6) {
                document?.getElementById(getDateId(weekIndex, dayIndex + 1))?.focus();
            } else if (weekIndex < bounds) {
                document?.getElementById(getDateId(weekIndex + 1, 0))?.focus();
            }
            break;
        case 'Down':
        case 'ArrowDown':
            if (weekIndex < bounds) {
                document?.getElementById(getDateId(weekIndex + 1, dayIndex))?.focus();
            }
            break;
        case 'Up':
        case 'ArrowUp':
            if (weekIndex > 0) {
                document?.getElementById(getDateId(weekIndex - 1, dayIndex))?.focus();
            }
            break;
    }
};

/**
 * Creates an id given a date that will let us track focus in the DOM
 *
 * @param weekIndex index keeping track of week
 * @param dayIndex index keeping track of day
 * @return date id
 */
const getDateId = (weekIndex: number, dayIndex: number): string =>
    `apollodate-${weekIndex}-${dayIndex}`;

/**
 * Will call onChange function when selected date changes
 *
 * @param selected currently selected date
 * @param onChange function that handles date change
 */
const useOnChange = (selected: string, onChange?: (date: string) => void): void => {
    useEffect(() => {
        if (!onChange) return;
        onChange(selected);
    }, [selected]);
};
