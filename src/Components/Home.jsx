import React, { useState, useEffect } from 'react';
import ModalConfirm from './Modal/ModalConfirm/ModalConfirm';
import Rules from './Rules/Rules';
import TripsTable from './TripsTable/TripsTable';
import Contacts from './Contacts/Contacts';

const Home = ({ routes, isAuth, token }) => {

  const [modalConfirmActive, setModalConfirmActive] = useState(false);
  const [selectedRouteId, setSelectedRouteId] = useState(0)
  const [selectedRoute, setSelectedRoute] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedDayId, setSelectedDayId] = useState(0)
  const [selectedTripData, setSelectedTripData] = useState()
  const [isButtonValid, setIsButtonValid] = useState(false);
  const [stops, setStops] = useState([]);
  const [trip, setTrips] = useState({});

  const tripRequest = `http://199.247.18.191:7777/api/trips?RouteId=${selectedRouteId || 1}&DayOfWeekNumber=${selectedDayId}`

  useEffect(() => {
    if (selectedRoute) {
      setIsButtonValid(true)
    } else {
      setIsButtonValid(false)
    }
  }, [selectedRoute, selectedRouteId])

  const handleDataChange = (id, date) => {
    setSelectedDayId(id)
    setSelectedDate(date)
    const tripRequest = `http://199.247.18.191:7777/api/trips?RouteId=${selectedRouteId}&DayOfWeekNumber=${id}`
    fetch(tripRequest)
      .then(res => res.json())
      .then(
        (result) => {
          setTrips(result.trips);
          setStops(result.departureBusStops)
        },
        (error) => {
          console.log(error)
        }
      )
  }

  const handleRouteChange = (id, route) => {
    setSelectedRouteId(id)
    setSelectedRoute(route)
    const tripRequest = `http://199.247.18.191:7777/api/trips?RouteId=${id}&DayOfWeekNumber=${selectedDayId}`
    fetch(tripRequest)
      .then(res => res.json())
      .then(
        (result) => {
          setTrips(result.trips);
          setStops(result.departureBusStops)
        },
        (error) => {
          console.log(error)
        }
      )
  }

  const handleModalConfirmOpen = (state) => {
    setModalConfirmActive(state)
  }

  const handleTripChange = (data) => {
    setSelectedTripData(data)
  }

  return (
    <div>
      <TripsTable isAuth={isAuth} routes={routes} trips={trip} onTripChange={handleTripChange} onDateChange={handleDataChange} onRouteChange={handleRouteChange} onModalConfirmOpen={handleModalConfirmOpen}/>
      <Contacts id="contacts" />
      <Rules id="rules" />
      <ModalConfirm token={token} stops={stops} date={selectedDate} tripData={selectedTripData} trip={trip} routeId={selectedRouteId} route={selectedRoute} active={modalConfirmActive} setActive={setModalConfirmActive}/>
    </div>
  )
}

export default Home