import React from 'react'
import { Container } from 'reactstrap'
import styles from './Footer.module.scss'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Container>
        <p className={styles.footer__text}>Мы рады работать для вас!</p>
      </Container>
    </footer>
  )
}

export default Footer