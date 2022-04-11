/* eslint-disable @typescript-eslint/explicit-function-return-type */
import type { FC } from 'react';
import React, { useState } from 'react';
import './DateTimePicker.css';

import type { Apollo } from '../../interfaces/Apollo';
import { gaurdApolloName } from '../../util/ErrorHandling';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export interface IDateTimePicker extends Apollo<'DateTimePicker'> {
    /**
     * Determines format of date to be displayed
     * tag i.e. format=dd/MM/yyyy => 24/12/2020
     */
    format?: 'dd/MM/yyyy' | 'mm/dd/yyyy' | 'yyyy/MM/dd' | 'yyyy/dd/MM';
    /** on change method updates the date input field with selected date */
    onChange?: (date: Date | null) => void;
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
export const DateTimePicker: FC<IDateTimePicker> = ({
    format = 'dd/MM/yyyy',
    mode = 'select',
    placeholder = 'Click to add a date',
    selectedDate = new Date(),
    onChange,
    ...props
}) => {
    gaurdApolloName(props, 'DateTimePicker');

    const [startDate, setStartDate] = useState<Date | null>(selectedDate);
    // eslint-disable-next-line require-jsdoc
    const newOnChange = (selectedDate: React.SetStateAction<Date | null>) => {
        if (onChange) onChange(startDate);
        setStartDate(selectedDate);
    };
    return (
        <DatePicker
            className="apollo-component-library-date-picker-component"
            placeholderText={placeholder}
            dateFormat={format}
            selected={startDate}
            onChange={newOnChange}
            dropdownMode={mode}
            showMonthDropdown
            showYearDropdown
            adjustDateOnChange
        />
    );
};

DateTimePicker.defaultProps = { 'data-apollo': 'DateTimePicker' };
