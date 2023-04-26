import React, { Component } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import styles from './NavMenu.module.scss'
import user from '../../img/icons/user_icon.svg'
import phone from '../../img/icons/phone_icon.svg'
import rule from '../../img/icons/rule_draft_icon.svg'

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    }); 
  }

  exitHandler(e) {
    this.props.isAuth = false
  }

  render() {
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm bg-dark box-shadow px-3" container='fluid' dark >
          <NavbarBrand className='text-warning fs-2 text-uppercase fw-bold me-0' tag={Link} to="/">Шахтерский Экспресс</NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2 bg-secondary" />
          <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
            <ul className="navbar-nav flex-grow">
              <NavItem>
                <NavLink tag={Link} className="text-white fs-5 fw-bold me-3" to="/">
                  <img className={styles.nav__icon} src={phone} alt="phone_icon" />
                  <span className={styles.navlink__text}>Контакты</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} className="text-white fs-5 fw-bold me-3" to="/">
                  <img className={styles.nav__icon} src={rule} alt="rule_icon" />
                  <span className={styles.navlink__text}>Правила</span>
                </NavLink>
              </NavItem>
              <NavItem>
                {this.props.isAuth ?
                  <div className='d-flex'>
                    <NavLink tag={Link} className="text-white fs-5 fw-bold me-3" to="/orders">
                      <img className={styles.nav__icon} src={user} alt="user_icon" />
                      <span className={styles.navlink__text}>Заказы</span>
                    </NavLink>
                    <NavLink onClick={e => this.exitHandler(e)} tag={Link} className="text-white fs-5 fw-bold" to="/">
                      <img className={styles.nav__icon} src={user} alt="user_icon" />
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
    );
  }
}
