import React from 'react';
import type { FC } from 'react';
import type * as CSS from 'csstype';
import { Text } from '../../Text/Text';

interface ICalendarCell {
    day: string;
    selected: string[];
    marks?: Set<string>;
    dateRange?: string[];
    fontSize?: CSS.Property.FontSize;
    id: string;
    theme?: string;
    currentMonth: string;
    weekIndex: number;
    dayIndex: number;
    updateSelected: (date: string) => void;
}

/**
 * Calendar cell component
 * @return Calendar Cell
 */
export const CalendarCell: FC<ICalendarCell> = ({
    day,
    selected,
    marks = new Set(),
    dateRange,
    fontSize = '1rem',
    id,
    theme,
    currentMonth,
    weekIndex,
    dayIndex,
    updateSelected,
}) => {
    const [dateMonth] = day.split('/');
    const active = selected?.includes(day);
    const marked = marks.has(day);
    const date = new Date(day);
    let covered = false;

    if (selected?.length ?? 0 > 1) {
        const [start, end] = selected;
        const startDate = new Date(start);
        const endDate = new Date(end);

        // check if date is within range
        covered = date > startDate && date < endDate;
    }

    // check if date is within range
    let isValid = true;
    if (dateRange) {
        const [start, end] = dateRange;
        const currentDate = date.getTime();

        const startDate = new Date(start).getTime();
        isValid = startDate <= currentDate;

        if (end?.length && end !== 'Invalid Date') {
            const endDate = new Date(end).getTime();
            isValid = isValid && endDate >= currentDate;
        }
    }

    return (
        <button
            data-sparta="CalendarDate"
            key={`day-${day}`}
            disabled={!isValid}
            style={{ fontSize }}
            onKeyDownCapture={(event) => handleNavigation(event as any, id)}
            aria-label={`${active ? 'selected, ' : ''}${date.toLocaleString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
            })}${marked ? ', marked' : ''}`}
            className={`
                sparta
                ${covered ? 'covered' : ''}
                ${theme}
                spartadate 
                ${currentMonth !== dateMonth ? 'not-current' : ''}
                ${active ? 'selected' : ''}
            `}
            id={getDateId(weekIndex, dayIndex, id)}
            onClick={() => updateSelected(day)}
        >
            <Text>{date.getDate()}</Text>
            <div
                className={`sparta ${theme}  ${active ? 'selected' : ''}`}
                data-sparta="CalendarMark"
                style={{ opacity: marked ? 1 : 0 }}
            />
        </button>
    );
};

/**
 * Function that handles keypresses
 *
 * @param event keyboard event
 * @param id calendar id
 */
const handleNavigation = (event: KeyboardEvent, id: string): void => {
    // check if there is an active element within scope of our calendar
    const spartaDate = document?.activeElement?.id;
    if (!spartaDate?.startsWith(`spartadate-${id}`)) return;

    // prevent default behavior for arrow keys
    if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].indexOf(event.code) > -1) {
        event.preventDefault();
    }

    // extract relevant information from id
    const [, , weekIndexStr, dayIndexStr] = spartaDate.split('-');
    const weekIndex = parseInt(weekIndexStr);
    const dayIndex = parseInt(dayIndexStr);

    // get date bounds
    const [, boundsStr] =
        document.querySelector(`[id^="spartadateBounds${id}-"]`)?.id?.split('-') ?? [];
    const bounds = parseInt(boundsStr);

    // switch based on key
    switch (event?.key) {
        case 'Left':
        case 'ArrowLeft':
            if (dayIndex > 0) {
                document?.getElementById(getDateId(weekIndex, dayIndex - 1, id))?.focus();
            } else if (weekIndex > 0) {
                document?.getElementById(getDateId(weekIndex - 1, 6, id))?.focus();
            }
            break;
        case 'Right':
        case 'ArrowRight':
            if (dayIndex < 6) {
                document?.getElementById(getDateId(weekIndex, dayIndex + 1, id))?.focus();
            } else if (weekIndex < bounds) {
                document?.getElementById(getDateId(weekIndex + 1, 0, id))?.focus();
            }
            break;
        case 'Down':
        case 'ArrowDown':
            if (weekIndex < bounds) {
                document?.getElementById(getDateId(weekIndex + 1, dayIndex, id))?.focus();
            }
            break;
        case 'Up':
        case 'ArrowUp':
            if (weekIndex > 0) {
                document?.getElementById(getDateId(weekIndex - 1, dayIndex, id))?.focus();
            }
            break;
    }
};

/**
 * Creates an id given a date that will let us track focus in the DOM
 *
 * @param weekIndex index keeping track of week
 * @param dayIndex index keeping track of day
 * @param id calendar id
 * @return date id
 */
const getDateId = (weekIndex: number, dayIndex: number, id: string): string =>
    `spartadate-${id}-${weekIndex}-${dayIndex}`;
