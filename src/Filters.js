import React, { useEffect, useState } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { publish } from "./Events"

const Filter = ({ end, start }) => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    useEffect(() => {
        setStartDate(new Date(start))
        setEndDate(new Date(end))
    }, [end, start])
    
    function onEndDateChange(date) {
        if (date > end) {
            date = end
        }
        setEndDate(date)
        publish('endDateChange')
    }
   
    function onStartDateChange(date) {
        if (date < start || date > end) {
            date = start
        }
        setStartDate(date)        
        publish('startDateChange')
    }
    return (
        <>
            <DatePicker
                dateFormat="MM/yyyy"
                showMonthYearPicker
                selected={startDate}
                onChange={(date) => onStartDateChange(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
            />
            <DatePicker
                dateFormat="MM/yyyy"
                showMonthYearPicker
                selected={endDate}
                onChange={(date) => onEndDateChange(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
            />
        </>
    )
}

export default Filter