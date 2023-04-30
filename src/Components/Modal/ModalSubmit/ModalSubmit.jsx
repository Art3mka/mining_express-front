import React from 'react'
import styles from './ModalSubmit.module.scss'

const ModalSubmit = ({ token, orderId, active, setActive, setVersion }) => {

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        setActive(false)
        const deleteRequest = `http://199.247.18.191:7777/api/orders/cancel?orderToDeleteId=${orderId}`
        await fetch(deleteRequest, {
            method: 'DELETE',
            headers: {
                'accept': '*/*',
                'Authorization': `bearer ${token}`,
            }
        })
            // .then(res => res.json())
            .then(res => console.log(res))
            .then(setVersion(v=>v+1))
    }

    return (
        <div className={active ? `${styles.modal} ${styles.active}` : styles.modal} onClick={() => setActive(false)}>
            <form onSubmit={e => onSubmitHandler(e)} className={active ? `${styles.modal__content} ${styles.active}` : styles.modal__content} onClick={e => e.stopPropagation()}>
                <div className={styles.modal__title}>Вы уверны, что хотите отменить заказ?</div>
                <span className={styles.modal__close} onClick={() => setActive(false)}>X</span>
                <div className={styles.modal__wrap}>
                    <button className={styles.button__submit} type='submit'>ДА</button>
                </div>
            </form>
        </div>
    )
}

export default ModalSubmit