import React, { useState } from "react"
import DatePicker from "react-datepicker"

import "react-datepicker/dist/react-datepicker.css"

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css'

const Filter = () => {
    const [startDate, setStartDate] = useState(new Date());    
    const [finishDate, setFinishDate] = useState(new Date());
    return (
        <>
            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
            <DatePicker selected={finishDate} onChange={(date) => setFinishDate(date)} />
        </>
    );
};

export default Filter