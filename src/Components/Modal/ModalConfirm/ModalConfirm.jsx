import React, {useState, useEffect} from 'react'
import styles from './ModalConfirm.module.scss';
import Stops from './../../Stops';

const ModalConfirm = ({ active, setActive, route, routeId, date, dayId, stops, token, tripData }) => {

    const [formValid, setFormValid] = useState(false)
    const [tripRoute, setTripRoute] = useState('')
    const [tripDate, setTripDate] = useState('')
    const [clientPhone, setClientPhone] = useState('+375')
    const [clientStopId, setClientStopId] = useState(0)
    const [clientArrivalTimeId, setClientArrivalTimeId] = useState(0)
    const [clientSeatsCount, setClientSeatsCount] = useState(0)
    const [clientPhoneDirty, setClientPhoneDirty] = useState(false)
    const [clientSeatsDirty, setClientSeatsDirty] = useState(false)
    const [clientPhoneError, setClientPhoneError] = useState('Введите номер телефона!')
    const [clientStopError, setClientStopError] = useState('Выберите остановку!')
    const [clientSeatsError, setClientSeatsError] = useState('Выберите кол-во мест!')
    const [clientComment, setClientComment] = useState('')
    
    useEffect(() => {
        if(clientPhoneError || clientSeatsError || clientStopError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [clientPhoneError, clientSeatsError, clientStopError])

    useEffect(() => {
        setTripRoute(route)
        setTripDate(date)
    }, [route, date])

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'clientPhone':
                setClientPhoneDirty(true)
                break
            case 'seatsCount':
                setClientSeatsDirty(true)
                break
        }
    }

    const phoneHandler = (e) => {
        setClientPhone(e.target.value)
        const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{6}$/im
        if (!re.test(String(e.target.value))) {
            setClientPhoneError('Некорректный номер телефона')
        } else {
            setClientPhoneError('')
        }
    }

    const seatsHandler = (e) => {
        setClientSeatsCount(Number(e.target.value))
        if (e.target.value !== 0 && e.target.value !== 'Выберите кол-во мест') {
            setClientSeatsError('')
        }
    }

    const commentHandler = (e) => {
        setClientComment(e.target.value)
    }

    const handleStopChange = (stopId, arrivalTimeId, error) => {
        setClientStopId(stopId)
        setClientArrivalTimeId(arrivalTimeId)
        setClientStopError(error)
    }

    const onSubmitHandler = async (e) => {
        const data ={
            SeatsCount: clientSeatsCount,
            Comment: clientComment,
            Phone: clientPhone,
            DepartureBusStopId: clientStopId,
            RouteId: routeId,
            TripId: JSON.parse(tripData).tripId,
            ArrivalTimeId: clientArrivalTimeId,
        }
        const url = 'http://199.247.18.191:7777/api/orders'
        e.preventDefault()
        await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${token}`,
                'Access-Control-Allow-Origin': '*'
            }
        })
            .then(response => {
                if (response.status == 200) {
                    alert('Success');
                }
            }).catch(e => {
                console.log('error', e.message)
            })
    }

    return (
            <div className={active ? `${styles.modal} ${styles.active}` : styles.modal} onClick={() => setActive(false)}>
                <form onSubmit={e => onSubmitHandler(e)} className={active ? `${styles.modal__content} ${styles.active}` : styles.modal__content} onClick={e => e.stopPropagation()}>
                    <div className={styles.modal__title}>{tripRoute}</div>
                    <div className={styles.modal__title}>{tripDate}</div>
                    <span className={styles.content__close} onClick={() => setActive(false)}>X</span>
                    <div className={styles.modal__wrap}>
                    <div className={styles.content__left}>
                        {(clientPhoneDirty && clientPhoneError) && <div style={{color: 'red'}}>{clientPhoneError}</div>}
                        <input onChange={e => phoneHandler(e)} value={clientPhone} onBlur={e => blurHandler(e)} name='clientPhone' className='w-100 rounded-pill text-dark fw-bold border border-1 py-2 px-4 mb-3' type="text" placeholder="№ телефона"/>
                        <Stops 
                            departureTime={tripData ? JSON.parse(tripData).arrivalTimeId : ''}
                            stops={stops}
                            dayId={dayId}
                            routeId={routeId}
                            name='clientStop'
                            onChange={handleStopChange}
                            />
                        {(clientSeatsDirty && clientSeatsError) && <div style={{color: 'red'}}>{clientSeatsError}</div>}
                        <select onChange={e => {seatsHandler(e)}} className='w-100 rounded-pill text-dark fw-bold border border-1 py-2 px-4 mb-3' onBlur={e => blurHandler(e)} name="seatsCount">
                            <option selected={true} disabled={true} value="Выберите кол-во мест">Выберите кол-во мест</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                        </select>
                        <input onChange={e => commentHandler(e)} value={clientComment} placeholder='Комментарий' className='w-100 rounded-pill text-dark fw-bold border border-1 py-2 px-4 mb-3' type="text" />
                    </div>
                    <div className={styles.content__right}>
                        <button disabled={!formValid} className='mb-3 text-dark bg-warning text-uppercase fw-bold rounded-pill border border-1 py-2 px-4' type="submit">Подтвердить</button>

                    </div>
                    </div>
                </form>
            </div>
    )
}

export default ModalConfirm