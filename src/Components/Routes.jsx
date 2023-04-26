import React, { useState, useEffect, memo } from 'react'

const Routes = ({ className, routes, onChange }) => {

    const [selectedRoute, setSelectedRoute] = useState('')
    const [selectedRouteId, setSelectedRouteId] = useState(0)

    useEffect(() => {
        for (let i = 0; i < routes.length; i++) {
            if (selectedRoute === routes[i].routeName) {
                setSelectedRouteId(routes[i].routeId)
            }
        }
        
    }, [selectedRoute])

    useEffect(() => {
        onChange(selectedRouteId, selectedRoute)
    }, [selectedRouteId])

    const handleRouteChange = (e) => {
        setSelectedRoute(e.target.value)
    }

    return (
        <select onChange={e => handleRouteChange(e)} name='routes' className={className}>
            <option className='bg-light' value='Выберите направление' selected={true} disabled={true}>Маршрут</option>
            {routes.map(route => (<option className='bg-light' key={route.routeId} value={route.routeName}>{route.routeName}</option>))}
        </select>
    )
}

export default memo(Routes)