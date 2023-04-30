import React, { useState, useEffect } from 'react'

const Calendar = ({ className, onChange }) => {

    const zeroFirstFormat = (value) => {
        if (value < 10) {
            value = '0' + value;
        }
        return value;
    }
    const d = new Date()
    const dayId = d.getDay()
    const day = zeroFirstFormat(d.getDate())
    const month = zeroFirstFormat(d.getMonth() + 1)
    const year = d.getFullYear()
    const currentDate = `${year}-${month}-${day}`

    const curD = new Date(year, month-1, day)
    curD.setDate(d.getDate()+6)
    const dayAfterWeek = zeroFirstFormat(curD.getDate())
    const monthAfterWeek = zeroFirstFormat(curD.getMonth() + 1)
    const yearAfterWeek = curD.getFullYear()
    const dateAfterWeek = `${yearAfterWeek}-${monthAfterWeek}-${dayAfterWeek}`

    const [selectedDate, setSelectedDate] = useState(currentDate)
    const [selectedDayId, setSelectedDayId] = useState(dayId)

    useEffect(() => {
        onChange(selectedDayId, selectedDate)
    }, [selectedDayId])

    const getDayIndex = (date) => {
        const dat = new Date(date)
        let dayNumber = dat.getDay()
        if(dayNumber === 0) {
            dayNumber = 7
        }
        setSelectedDayId(dayNumber)
    }

    const handleDataChange = (e) => {
        setSelectedDate(e.target.value)
        getDayIndex(e.target.value)
    }

    return (
            <input onChange={e => handleDataChange(e)} min={currentDate} max={dateAfterWeek} value={selectedDate} type="date" className={className}></input>
    )
}

export default Calendar