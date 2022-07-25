import React, { useState } from "react"
import DatePicker from "react-datepicker"

import "react-datepicker/dist/react-datepicker.css"

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css'

const Filter = () => {
    const [startDate, setStartDate] = useState(new Date());    
    const [endDate, setEndDate] = useState(new Date());
    return (
        <>
            <DatePicker
            dateFormat="MM/yyyy"
            showMonthYearPicker 
            selected={startDate} 
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            />
            <DatePicker
            dateFormat="MM/yyyy"
            showMonthYearPicker 
            selected={endDate} 
            onChange={(date) => setEndDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}  
            />
        </>
    );
};

export default Filter