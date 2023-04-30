import React from 'react'
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import styles from './Layout.module.scss'


const Layout = ({children, isAuth, handleAuth}) => {
    return (
        <div className={styles.layout}>
            <Nav isAuth={isAuth} handleAuth={handleAuth}/>
            {children}
            <Footer />
        </div>
    )
}

export default Layout