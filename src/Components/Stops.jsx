import React, { useState, useEffect } from 'react'

const Stops = ({ departureTime, name, stops, onChange }) => {

    const [selectedStopId, setSelectedStopId] = useState(0)
    const [selectedStopATId, setSelectedStopATId] = useState(0)
    const [clientStopDirty, setClientStopDirty] = useState(false)
    const [clientStopError, setClientStopError] = useState('Выберите остановку!')

    useEffect(() => {
        setSelectedStopId(selectedStopId)
        setSelectedStopATId(selectedStopATId)
        onChange(selectedStopId, selectedStopATId, clientStopError)
    }, [selectedStopId, selectedStopATId, clientStopError])

    const blurHandler = (e) => {
        switch (e.target.name) {
            case `${name}`:
                setClientStopDirty(true)
                break
        }
    }

    const onChangeHandler = (e) => {
        if (e.target.value !== 0 || e.target.value !== 'Выберите остановку') {
            setSelectedStopId(Number(e.target.value));
            const stop = stops.find(x => x.id === Number(e.target.value))
            const times = stop.stopTimes
            setSelectedStopATId(times.find(x=>x.time === departureTime).id)
            setClientStopError('')
        }
    }

    return (
        <div>
            {(clientStopDirty && clientStopError) && <div style={{ color: 'red' }}>{clientStopError}</div>}
            <select onBlur={e => blurHandler(e)} onChange={e => onChangeHandler(e)} name={name} className='w-100 rounded-pill text-dark fw-bold border border-1 py-2 px-4 mb-3'>
                <option value='Выберите остановку' selected={true} disabled={true}>Выберите остановку</option>
                {stops ? 
                stops.map(stop => (<option key={stop.id} value={stop.id}>{stop.name}</option>))
                :
                <option value='Остановок не найдено' selected={true} disabled={true}>Остановок не найдено</option>
                }
            </select>
        </div>
    )
}


export default Stops