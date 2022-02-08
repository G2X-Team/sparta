import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

/**
 * Component that serves as an datepicker for ease of implamenting date timestamp
 *
 * @return DatePicker component
 */
const Example = () => {
    const [startDate, setStartDate] = useState(new Date());
    return <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />;
};
