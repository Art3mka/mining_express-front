import React, { useState, useEffect } from 'react'

const Stops = ({ tripData, name, stops, onChange }) => {

    const [selectedStopId, setSelectedStopId] = useState(0)
    const [selectedStopATId, setSelectedStopATId] = useState(0)
    const [clientStopDirty, setClientStopDirty] = useState(false)
    const [clientStopError, setClientStopError] = useState('Выберите остановку!')

    const [fixedTripInfo, setFixedTripInfo] = useState({})
    const [fixedStops, setFixedStops] = useState([])

    useEffect(() => {
        setSelectedStopId(selectedStopId)
        setSelectedStopATId(selectedStopATId)
        onChange(selectedStopId, selectedStopATId, clientStopError)
    }, [selectedStopId, selectedStopATId, clientStopError])

    useEffect(() => {
        console.log(tripData)
        if (isTripsFilled(tripData)) {
            const tripInfo = tripData ? JSON.parse(tripData) : {}
            const fixedTripInfo = getFixedTripInfo(tripInfo)
            console.log(fixedTripInfo)
            setFixedTripInfo(fixedTripInfo)
        }
    }, [tripData])

    useEffect(() => {
        setFixedTripInfo(fixedTripInfo)
        const fixedStops = getFixedStops(stops)
        setFixedStops(fixedStops)
    }, [fixedTripInfo])

    const isTripsFilled = (obj) => {
        for (var i in obj) {
            if (obj.hasOwnProperty(i)) {
                return true;
            }
        }
        return false;
    }

    const blurHandler = (e) => {
        switch (e.target.name) {
            case `${name}`:
                setClientStopDirty(true)
                break
        }
    }

    const getFixedTripInfo = (tripInfo) => {

        const fixedTripInfo = {
            id: tripInfo.tripId,
            departureTime: parseFloat(tripInfo.departureTime.replace(/:/, '.')).toFixed(2),
            arrivalTime: parseFloat(tripInfo.arrivalTime.replace(/:/, '.')).toFixed(2),
        }

        return fixedTripInfo
    }

    const getFixedStops = (stops) => {
        const stopTimes = stops.map(el => { return el.stopTimes }).flat().map(el => ({ time: el.time, id: el.id }))

        const fixedStopTimes = stopTimes.map(el => ({
            time: parseFloat(el.time.replace(/:/, '.')).toFixed(2),
            id: el.id,
        }))

        console.log(fixedStopTimes)

        const departureTime = fixedTripInfo.departureTime
        const arrivalTime = fixedTripInfo.arrivalTime

        console.log(departureTime)
        console.log(arrivalTime)

        const availableStops = fixedStopTimes.filter((el) =>
            el.time >= departureTime &&
            el.time <= arrivalTime
        )

        const fixedStops = stops.map(el => ({
            stopId: el.id,
            name: el.name,
            stopTime: el.stopTimes.find((item) => {
                if (item.time <= arrivalTime && item.time >= departureTime) {
                    return item.time
                }
            })
        }))

        console.log(fixedStops)
        console.log(availableStops)

        return fixedStops
    }

    const onChangeHandler = (e) => {
        if (e.target.value !== 0 || e.target.value !== 'Выберите остановку') {
            setSelectedStopId(Number(e.target.value));
            const stop = fixedStops.find(x => x.stopId === Number(e.target.value))
            console.log(stop)
            const stopTimeID = stop.stopTime.id
            const stopTimeValue = stop.stopTime.time
            console.log(stopTimeID, stopTimeValue)
            setSelectedStopATId(stopTimeID)
            setClientStopError('')
        }
    }

    return (
        <div>
            {(clientStopDirty && clientStopError) && <div style={{ color: 'red' }}>{clientStopError}</div>}
            <select onBlur={e => blurHandler(e)} onChange={e => onChangeHandler(e)} name={name} className='w-100 rounded-pill text-dark fw-bold border border-1 py-2 px-4 mb-3'>
                <option value='Выберите остановку' selected={true} disabled={true}>Выберите остановку</option>
                {fixedStops ?
                    fixedStops.map(stop => (<option key={stop.stopId} value={stop.stopId}>{stop.name}</option>))
                    :
                    <option value='Остановок не найдено' selected={true} disabled={true}>Остановок не найдено</option>
                }
            </select>
        </div>
    )
}


export default Stops