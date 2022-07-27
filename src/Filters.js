import React, { useEffect, useState } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { publish } from "./Events"
import Select from "react-select"
import "./App.css"

const Filter = ({ end, start, startMin, endMax, AbvList }) => {
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [startMinDate, setStartMinDate] = useState(new Date())
    const [endMaxDate, setEndMaxDate] = useState(new Date())
    const [AbvOptions, setABVOptions] = useState([{}])
    const [AbvSelected, setAbvSelected] = useState(0)

    useEffect(() => {
        let options = []
        for (let abv of AbvList) {
            options.push({
                label: abv,
                value: abv
            })
        }
        setABVOptions(options)
    }, [AbvList])

    useEffect(() => {
        setStartDate(new Date(start))
        setEndDate(new Date(end))
    }, [end, start])

    useEffect(() => {
        setStartMinDate(new Date(startMin))
        setEndMaxDate(new Date(endMax))
    }, [startMin, endMax])

    useEffect(() => {
        setABVOptions(AbvList)
    }, [AbvSelected])

    function onEndDateChange(date) {
        if (date > endMaxDate) {
            date = end
        }
        setEndDate(date)
        publish('endDateChange', date)
    }

    function onStartDateChange(date) {
        if (date < startMinDate || date > end) {
            date = start
        }
        setStartDate(date)
        publish('startDateChange', date)
    }
    function onSelectChange(value) {

        setAbvSelected(value.value)
        publish('abvValueChange', value.value)
    }
    function refreshPage(){
        window.location.reload();
    }
    return (
        <>
            <div className="filter-container">
                <div className="datepikers-container">
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
                </div>
                <Select
                    options={AbvOptions}
                    onChange={(value) => onSelectChange(value)
                    } />
                <button type="button" onClick={refreshPage}>Reset</button>    
            </div>
        </>
    )
}

export default Filter