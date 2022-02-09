import type { FC } from 'react';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import './DateTimePicker.css';

/**
 * Component that serves as an hr for ease of templating
 *
 * @return DateTimePicker component
 */
export const DateTimePicker: FC = () => {
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    return (
        <>
            <DatePicker
                wrapperClassName="apollo-component-library-date-picker-component"
                dateFormat="dd/MM/yyyy"
                selected={startDate}
                onChange={(date) => date && setStartDate(date)}
                dropdownMode="select"
                showMonthDropdown
                showYearDropdown
                adjustDateOnChange
            />
        </>
    );
};
