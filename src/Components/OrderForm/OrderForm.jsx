import React, { useEffect, useState } from 'react'
import { Container } from 'reactstrap'
import styles from './OrderForm.module.scss'
import ModalSubmit from '../Modal/ModalSubmit/ModalSubmit'

const OrderForm = ({ token }) => {

    const [isLoaded, setIsLoaded] = useState(false)
    const [orders, setOrders] = useState([])
    const [modalConfirmActive, setModalConfirmActive] = useState(false);
    const [orderId, setOrderID] = useState(0);
    const [version, setVersion] = useState(0)

    useEffect(() => {
        const orderRequest = 'http://199.247.18.191:7777/api/orders'
        fetch(orderRequest, {
            method: 'GET',
            headers: {
                'accept': 'text/plain',
                'Authorization': `bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setOrders(result);
                }
            )
            .catch(e => {
                console.log('e', e)
            })
    }, [version])

    // const deleteHandler = async (id) => {
    //     let x = 0
    //     x+=1
    //     setReRender(x)
    //     const deleteRequest = `https://localhost:7204/api/orders/cancel?orderToDeleteId=${id}`
    //     if (true) {
    //         await fetch(deleteRequest, {
    //             method: 'DELETE',
    //             headers: {
    //                 'accept': '*/*',
    //                 'Authorization': `bearer ${token}`,
    //             }
    //         })
    //             // .then(res => res.json())
    //             .then(res => console.log(res))
    //     }

    // }

    const handleModalConfirmOpen = (state, orderId) => {
        setModalConfirmActive(state)
        setOrderID(orderId)
    }

    if (!isLoaded) {
        return <div className='loader'>
            <div className='loader__text'>Загрузка</div>
        </div>;
    } else {
        return (
            <div className={styles.orders}>
                <Container>
                    <h2 className={styles.title}>ЗАКАЗЫ</h2>
                    {orders.length !== 0 ?
                        orders.map(order => (
                            <div className={styles.order__item}>
                                <div>{order.routeName}</div>
                                <div>{order.date}</div>
                                <div>{order.busStopName}</div>
                                <div>{order.departureTime}</div>
                                <div>{order.seatsCount} {order.seatsCount === 1 ? <span>место</span> : <span>места</span>}</div>
                                {/* <div className={styles.button__delete} onClick={e => deleteHandler(order.orderId)}>ОТМЕНИТЬ</div> */}
                                <div className={styles.button__delete} onClick={e => handleModalConfirmOpen(!modalConfirmActive, order.orderId)}>Отменить</div>
                            </div>
                        ))
                        :
                        <div>Заказов нет</div>
                    }
                </Container>
                <ModalSubmit token={token} orderId={orderId} active={modalConfirmActive} setActive={setModalConfirmActive} setVersion={setVersion} />
            </div>
        )
    }

}

export default OrderForm