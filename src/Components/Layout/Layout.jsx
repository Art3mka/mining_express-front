import React from 'react'
import {NavMenu} from '../NavMenu/NavMenu';
import Footer from '../Footer/Footer';
import styles from './Layout.module.scss'

const Layout = ({children, isAuth}) => {
    return (
        <div className={styles.layout}>
            <NavMenu isAuth={isAuth}/>
            {children}
            <Footer />
        </div>
    )
}

export default Layout