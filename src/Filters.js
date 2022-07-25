import React, { useEffect, useState } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

const Filter = ({end, start}) => {
    const [startDate, setStartDate] = useState(new Date());    
    const [endDate, setEndDate] = useState(new Date());

    useEffect(() =>{
        setStartDate( new Date(start))
        setEndDate(new Date(end))
        console.log( "From parameters" + JSON.stringify(end + start))
        
        console.log( "From State" + endDate + startDate)
    },[end,start])
    
    useEffect(()=>{
        console.log(startDate)
        console.log(endDate)
    },[startDate,endDate])
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