import React, { useState, useEffect } from 'react'
import { Container } from 'reactstrap'
import { Link } from 'react-router-dom';
import Routes from '../Routes'
import Calendar from '../Calendar/Calendar'
import ButtonOpen from '../Button/ButtonOpen/ButtonOpen'

const TripsTable = ({ isAuth, routes, trips, onTripChange, onDateChange, onRouteChange, onModalConfirmOpen}) => {

    const [isRouteSelected, setIsRouteSelected] = useState(false)

    useEffect(() => {
        setIsRouteSelected(isRouteSelected)
    }, [isRouteSelected])

    const handleRouteChange = (id, route) => {
        onRouteChange(id, route)
        setIsRouteSelected(true)
    }

    const handleDataChange = (id, date) => {
        onDateChange(id, date)
    }

    const handleModalConfirmOpen = (state) => {
        onModalConfirmOpen(state)
    }

    const isTripsFilled = (obj) => {
        for (var i in obj) {
            if (obj.hasOwnProperty(i)) {
                return true;
            }
        }
        return false;
    }

    return (
        <div className='bg-dark pb-2 px-2'>
            <Container>
                <div className="text-warning fs-2 text-uppercase text-center fw-bold me-0">Онлайн заказ 24/7</div>
                <div className="table__wrapper bg-light my-2 rounded">
                    <div className="filter">
                        <Routes className='fs-5 rounded-pill text-dark fw-bold border-0 py-2 px-4 ms-3 me-5 bg-warning' routes={routes} onChange={handleRouteChange} />
                        <Calendar className='fs-5 rounded-pill text-dark fw-bold border border-1 py-2 px-4 mt-2' onChange={handleDataChange} />
                    </div>
                    <table className='w-100 text-center'>
                        <thead className='fs-5'>
                            {isTripsFilled(trips) ?
                                <tr className='w-100'>
                                    <td className=''>Отправление Прибытие</td>
                                </tr>
                                :
                                <tr>
                                    <td></td>
                                </tr>
                            }
                        </thead>
                        <tbody className='fs-5'>
                            {isTripsFilled(trips) ?
                                trips.map((trip) => (
                                    <tr className='w-100 d-flex justify-content-between'>
                                        <label style={{cursor: 'pointer'}} className='d-flex flex-grow-1 justify-content-between'>
                                            <input value={JSON.stringify({ tripId: trip.tripId, arrivalTimeId: trip.departureTime })} type="radio" name="tripId" id="" onClick={e => { onTripChange(e.target.value) }} />
                                            <div className='w-100'>{trip.departureTime}</div>
                                            <div className='w-100'>{trip.arrivalTime}</div>
                                        </label>
                                    </tr>
                                ))
                                :
                                <tr>
                                    <td>Нет маршрутов по заданному критерию</td>
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>
                <div className='buttons__wrapper d-flex justify-content-end'>
                    {isAuth ?
                        <ButtonOpen disabled={!isRouteSelected} setActive={handleModalConfirmOpen} className='text-dark bg-warning text-uppercase fw-bold rounded-pill border border-0 py-2 px-4'>Заказать</ButtonOpen>
                        :
                        <Link className='text-decoration-none text-dark bg-warning text-uppercase fw-bold rounded-pill border border-0 py-2 px-4' to="/auth">Заказать</Link>
                    }
                </div>

            </Container>
        </div>
    )
}

export default TripsTable