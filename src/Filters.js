import React, { useState } from "react"
import DatePicker from "react-datepicker"

import "react-datepicker/dist/react-datepicker.css"

const Filter = ({end, start}) => {
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
            endDate={end}
            />
            <DatePicker
            dateFormat="MM/yyyy"
            showMonthYearPicker 
            selected={endDate} 
            onChange={(date) => setEndDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            minDate={start}  
            />
        </>
    );
};

export default Filter