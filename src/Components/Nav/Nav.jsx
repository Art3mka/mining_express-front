import React, {useState} from 'react'
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import styles from './Nav.module.scss'
import user from '../../img/icons/user_icon.svg'
import phone from '../../img/icons/phone_icon.svg'
import rules from '../../img/icons/rule_draft_icon.svg'
import logout from '../../img/icons/logout_icon.png'
import orders from '../../img/icons/orders_icon.png'

const Nav = ({isAuth, handleAuth}) => {

    const [isOpen, setIsOpen] = useState(false)

    const toggleNavbar = () => {
        setIsOpen(!isOpen)
    }

    const exitHandler = () => {
        handleAuth(false)
    }



  return (
    <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm bg-dark box-shadow px-3" container='fluid' dark >
          <NavbarBrand className='text-warning fs-2 text-uppercase fw-bold me-0' tag={Link} to="/">Шахтерский Экспресс</NavbarBrand>
          <NavbarToggler onClick={toggleNavbar} className="mr-2 bg-secondary" />
          <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={isOpen} navbar>
            <ul className="navbar-nav flex-grow">
              <NavItem>
                <NavLink tag={Link} className="text-white fs-5 fw-bold me-3" to="/">
                  <img className={styles.nav__icon} src={phone} alt="phone_icon" />
                  <span className={styles.navlink__text}>Контакты</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} className="text-white fs-5 fw-bold me-3" to="/">
                  <img className={styles.nav__icon} src={rules} alt="rule_icon" />
                  <span className={styles.navlink__text}>Правила</span>
                </NavLink>
              </NavItem>
              <NavItem>
                {isAuth ?
                  <div className='d-flex'>
                    <NavLink tag={Link} className="text-white fs-5 fw-bold me-3" to="/orders">
                      <img className={styles.nav__icon} src={orders} alt="orders_icon" />
                      <span className={styles.navlink__text}>Заказы</span>
                    </NavLink>
                    <NavLink onClick={exitHandler} tag={Link} className="text-white fs-5 fw-bold" to="/">
                      <img className={styles.nav__icon} src={logout} alt="logout_icon" />
                      <span className={styles.navlink__text}>Выход</span>
                    </NavLink>
                  </div>
                  :
                  <NavLink tag={Link} className="text-white fs-5 fw-bold" to="/auth">
                    <img className={styles.nav__icon} src={user} alt="user_icon" />
                    <span className={styles.navlink__text}>Вход</span>
                  </NavLink>
                }
              </NavItem>
            </ul>
          </Collapse>
        </Navbar>
    </header>
  )
}

export default Nav