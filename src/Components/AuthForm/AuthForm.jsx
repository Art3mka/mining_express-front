import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import styles from './AuthForm.module.scss'

const AuthForm = ({handleAuth, handleToken}) => {

    const navigate = useNavigate()

    const [formValid, setFormValid] = useState(false)
    const [codeValid, setCodeValid] = useState(false)
    const [clientPhone, setClientPhone] = useState('375')
    const [authCode, setAuthCode] = useState('')
    const [clientPhoneDirty, setClientPhoneDirty] = useState(false)
    const [authCodeDirty, setAuthCodeDirty] = useState(false)
    const [clientPhoneError, setClientPhoneError] = useState('Введите номер телефона!')
    const [authCodeError, setAuthCodeError] = useState('Введите код из SMS!')
    const [accessToken, setAccessToken] = useState('')
    const [isAuth, setIsAuth] = useState(false)
    const [data, setData] = useState({
        phoneNumber: '',
    })

    const code = {
        confirmationCode: `${authCode}`
    }

    useEffect(() => {
        if (clientPhoneError) {
            setCodeValid(false)
        } else {
            setCodeValid(true)
        }
        if (clientPhoneError || authCodeError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [clientPhoneError, authCodeError])

    const phoneHandler = (e) => {
        setClientPhone(e.target.value)
        const re = /^[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{6}$/im
        if (!re.test(String(e.target.value))) {
            setClientPhoneError('Некорректный номер телефона')
        } else {
            setData({ ...data, phoneNumber: e.target.value })
            setClientPhoneError('')
        }
    }

    const codeHandler = (e) => {
        setAuthCode(e.target.value)
        const re = /^[0-9]{4}$/
        if (!re.test(String(e.target.value))) {
            setAuthCodeError('Некорректный код')
        } else {
            setAuthCodeError('')
        }
    }

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'clientPhone':
                setClientPhoneDirty(true)
                break
            case 'authCode':
                setAuthCodeDirty(true)
                break
        }
    }

    const onSubmitHandler = async (e) => {
        const authConfirm = `http://199.247.18.191:7777/api/auth/confirm`
        e.preventDefault()
        await fetch(authConfirm, {
            method: 'POST',
            body: JSON.stringify(code),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': `bearer ${accessToken}`
            }
        })
        .then(response => {
            if(response.status == 200) {
                handleAuth(true)
                navigate("/")
            } else {
                setAuthCodeError('Неверный код')
            }
        })
    }

    const codeReceiveHandler = async (e) => {
        e.preventDefault()
        const authUrl = `http://199.247.18.191:7777/api/auth`
        const createUserUrl = 'http://199.247.18.191:7777/users?Phone=' + clientPhone

        let token = null
        await fetch(authUrl, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }).then(response => response.json()            
        ).then(
            result => {
                token = result.accessToken
                setAccessToken(result.accessToken)  
                handleToken(result.accessToken)              
            },
        ).catch(e => {
            console.log('e', e)
        })
        if(!token) {
            await fetch(createUserUrl, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            }).then(response => {
                if (response.status == 200) {
                    fetch(authUrl, {
                        method: 'POST',
                        body: JSON.stringify(data),
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        }
                    }).then(response => response.json()            
                    ).then(
                        result => {
                            token = result.accessToken
                            setAccessToken(result.accessToken)
                            handleToken(result.accessToken) 
                        },
                    ).catch(e => {
                        console.log('e', e)
                    })  
                }
            }).catch(e => {
                console.log('e', e)
            })
        }
    }

    return (
        <div className={styles.auth}>
            <form onSubmit={e => onSubmitHandler(e)} className={styles.auth__form}>
                <div className={styles.form__title}>Авторизация</div>
                <div className={styles.form__content}>
                    <input onChange={e => phoneHandler(e)} onBlur={e => { blurHandler(e) }} name='clientPhone' value={clientPhone} type="text" className={styles.input__phone} />
                    {(clientPhoneDirty && clientPhoneError) && <div style={{ color: 'red' }}>{clientPhoneError}</div>}
                    <button onClick={e => codeReceiveHandler(e)} disabled={!codeValid} className={styles.button__receive}>Получить код из СМС</button>
                    <input onChange={e => codeHandler(e)} onBlur={e => { blurHandler(e) }} name='authCode' value={authCode} type="text" className={styles.input__code} />
                    {(authCodeDirty && authCodeError) && <div style={{ color: 'red' }}>{authCodeError}</div>}
                </div>
                <button disabled={!formValid} type='submit' className={styles.button__signIn}>Войти</button>
            </form>
        </div>
    )
}

export default AuthForm