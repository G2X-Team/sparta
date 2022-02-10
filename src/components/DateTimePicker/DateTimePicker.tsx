import type { HTMLAttributes, FC } from 'react';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import './DateTimePicker.css';

export interface Props extends Omit<HTMLAttributes<HTMLFormElement>, 'onChange'> {
    /**
     * Determines format of date to be displayed
     * tag i.e. format=dd/MM/yyyy => 24/12/2020
     */
    format?:
        | 'dd/MM/yyyy'
        | 'mm/dd/yyyy'
        | 'yyyy/MM/dd'
        | 'yyyy/dd/MM'
        | 'dd/MM/yyyy'
        | 'mm/dd/yyyy'
        | 'yyyy/MM/dd'
        | 'yyyy/dd/MM';
    /** on change method updates the date input field with selected date */
    onChange?: (value: { [input: string]: string | string[] | boolean }) => void;
    /**  Determine the type of dropdown of year and month selecter */
    mode?: 'select' | 'scroll';
    /** Placeholder for no date is selected */
    placeholder?: string;
    /** Date to be selected */
    selectedDate?: Date;
}

/**
 * Component that serves as an datepicker input field to let the user select Date
 *
 * @return DateTimePicker component
 */
export const DateTimePicker: FC<Props> = ({
    format = 'dd/MM/yyyy',
    mode = 'select',
    placeholder = 'Click to add a date',
    selectedDate = new Date(),
}) => {
    const [startDate, setStartDate] = useState<Date | null>(selectedDate);
    return (
        <DatePicker
            className={`apollo-component-library-date-picker-component`}
            placeholderText={`${placeholder}`}
            dateFormat={`${format}`}
            selected={startDate}
            onChange={(date) => date && setStartDate(date)}
            dropdownMode={`${mode}`}
            showMonthDropdown
            showYearDropdown
            adjustDateOnChange
        />
    );
};
