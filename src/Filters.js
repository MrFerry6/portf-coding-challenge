import React, { useEffect, useState } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { publish } from "./Events"

const Filter = ({ end, start, startMin, endMax }) => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [startMinDate, setStartMinDate] = useState(new Date());
    const [endMaxDate, setEndMaxDate] = useState(new Date());

    useEffect(() => {
        setStartDate(new Date(start))
        setEndDate(new Date(end))
    }, [end, start])
    useEffect(() =>{
        setStartMinDate(new Date(startMin))
        setEndMaxDate(new Date(endMax))
    },[startMin, endMax])
    
    function onEndDateChange(date) {
        if (date > endMaxDate) {
            date = end
        }
        setEndDate(date)
        publish('endDateChange',date)
    }
   
    function onStartDateChange(date) {
        if (date < startMinDate || date > end) {
            date = start
        }
        setStartDate(date)        
        publish('startDateChange', date)
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