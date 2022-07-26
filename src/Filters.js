import React, { useEffect, useState } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { publish } from "./Events"
import Select from "react-select"

const Filter = ({ end, start, startMin, endMax, AbvList }) => {
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [startMinDate, setStartMinDate] = useState(new Date())
    const [endMaxDate, setEndMaxDate] = useState(new Date())
    const [AbvOptions, setABVOptions] = useState([{}])
    const [AbvSelected, setAbvSelected] = useState(0)
    useEffect(() =>{
        let options = []
        for (let abv of AbvList){
            options.push({
                label : abv,
                value : abv
            })
        }
        setABVOptions(options)
    },[AbvList])

    useEffect(() => {
        setStartDate(new Date(start))
        setEndDate(new Date(end))
    }, [end, start])
    
    useEffect(() =>{
        setStartMinDate(new Date(startMin))
        setEndMaxDate(new Date(endMax))
    },[startMin, endMax])
    
    useEffect(() =>{
        publish('abvValueChange', AbvSelected)
    },[AbvSelected])

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
            <Select 
            options={AbvOptions}
            onChange={setAbvSelected}>
            Select an ABV 
            </Select>
            
        </>
    )
}

export default Filter