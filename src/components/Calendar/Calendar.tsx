import React, { FC, useEffect, useState } from 'react';
import type { Apollo } from '../../interfaces/Apollo';
import type * as CSS from 'csstype';
import { CalendarGrid } from './components/CalendarGrid';
import './Calendar.css';
import { Section } from '../Section/Section';
import { Icon } from '../Icon/Icon';
import { Text } from '../Text/Text';
import { getTimezoneDate } from './util';

export interface ICalendar extends Apollo<'Calendar'> {
    /** Determines whether the calender is used for date ranges or single dates */
    type?: 'single' | 'range';
    /**
     * Everytime the user clicks on a new date, you will get the date or date range based on the
     * `type`.
     *
     * - If `type="single"` then the date param will be `"YYYY/MM/DD"`.
     * - If type="range"` then the date param will be `"YYYY/MM/DD-YYYY/MM/DD"`
     */
    onChange?: (date: string, payload?: any) => void;
    /**
     * This is an object that will let the calendar know if it needs to mark any specific date
     * with a dot signfiying importance.
     */
    marks?: Array<string>;
    /** Determines what date the calendar starts on, by default it's the current date */
    startDate?: string;
    /**
     * This should be a tuple of dates where the first date is the start date and the second date
     * is the end date. Any date out of this range will not be able to be selected.
     */
    dateRange?: string[];
    /** Determines the width of the calendar */
    width?: CSS.Property.Width;
    /** Determines the height of the calendar */
    height?: CSS.Property.Height;
    /** Determines the font size of the calendar */
    fontSize?: CSS.Property.FontSize;
}

/**
 * This is the Calendar component used to simplify getting dates
 *
 * @return Calendar component
 */
export const Calendar: FC<ICalendar> = ({
    startDate,
    dateRange,
    marks,
    theme = 'primary',
    onChange,
    width = '300px',
    height = '300px',
    fontSize = '1rem',
}) => {
    const [calendarData, date, setDate] = useCalendarData(
        startDate ?? new Date().toLocaleDateString()
    );

    // date range standardized to "YYYY/MM/DD-YYYY/MM/DD"
    if (dateRange) {
        const start = getTimezoneDate(dateRange[0]).toLocaleDateString();
        const end = getTimezoneDate(dateRange[1]).toLocaleDateString();
        dateRange = [start, end];
    }

    // marks standardized to set of "YYYY/MM/DD"
    const setOfMarks = new Set(marks?.map((mark) => getTimezoneDate(mark).toLocaleDateString()));
    return (
        <Section
            column
            center
            inline
            width={width}
            height={height}
            aria-label="calendar"
            role="application"
            tabIndex={0}
        >
            <Section
                style={{
                    padding: '0 10px',
                    boxSizing: 'border-box',
                    paddingBottom: 5,
                    maxHeight: 50,
                }}
                width="100%"
                justifyContent="space-between"
                alignItems="center"
                tabIndex={0}
                aria-label="calendar month controls"
            >
                <Icon
                    aria-label="previous month"
                    onClick={() => setDate('prev')}
                    name="keyboard_arrow_left"
                />
                <Text bold tabIndex={0} style={{ outline: 'none' }}>
                    {date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </Text>
                <Icon
                    aria-label="next month"
                    onClick={() => setDate('next')}
                    name="keyboard_arrow_right"
                />
            </Section>
            <CalendarGrid
                fontSize={fontSize}
                onChange={onChange}
                theme={theme}
                calendarData={calendarData}
                dateRange={dateRange}
                marks={setOfMarks}
                startDate={startDate}
            />
        </Section>
    );
};

/**
 * This hook will keep track of the data to render on the calendar grid
 *
 * @param startDate the current date
 * @return tuple containing calendar data and date update
 */
const useCalendarData = (startDate: string): [string[][], Date, (incomingDate: string) => void] => {
    const [date, setDate] = useState(getTimezoneDate(startDate));
    const [calendarData, updateCalendarData] = useState<string[][]>([]);

    useEffect(() => {
        // check if this needs to execute
        if (calendarData?.length && new Date(calendarData[1][0]).getMonth() == date.getMonth()) {
            return;
        }

        // get month and year
        const month = date.getMonth();
        const year = date.getFullYear();

        // get the first day of the month using date
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);

        // this is a variable that will let us fill last and first days
        let daysToFill: number;

        // variable containing all weeks
        const weeks: string[][] = [];
        let day = 1;
        while (day < lastDay.getDate()) {
            const week: string[] = [];

            // populate first week
            if (day == 1) {
                daysToFill = firstDay.getDay();

                // fill in days until there are no days to filll
                while (daysToFill > 0) {
                    const fill = new Date(year, month, 1 - daysToFill);
                    week.push(fill.toLocaleDateString());
                    daysToFill--;
                }
            }

            // fill week with days from date
            while (week.length < 7 && day < lastDay.getDate()) {
                week.push(`${month + 1}/${day}/${year}`);
                day++;
            }

            if (day == lastDay.getDate()) {
                daysToFill = 6 - lastDay.getDay() + 1;

                const lastWeek = daysToFill === 7 ? [] : week;

                const totalLastDays = daysToFill;
                // fill in days until there are no days to fill
                while (daysToFill > 0) {
                    const fill = new Date(
                        date.getFullYear(),
                        date.getMonth() + 1,
                        totalLastDays - daysToFill
                    );
                    lastWeek.push(fill.toLocaleDateString());
                    daysToFill--;
                }
            }

            weeks.push(week);
        }

        updateCalendarData([...weeks]);
    }, [date]);

    return [
        calendarData,
        date,
        (incoming: string) => {
            switch (incoming) {
                // case for increment
                case 'next':
                    setDate(new Date(date.setMonth(date.getMonth() + 1)));
                    break;
                // case for decrement
                case 'prev':
                    setDate(new Date(date.setMonth(date.getMonth() - 1)));
                    break;
                default:
                    const incomingDate = new Date(incoming);
                    if (incomingDate.getMonth() === date.getMonth()) break;
                    setDate(incomingDate);
            }
        },
    ];
};