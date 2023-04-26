import React from 'react'
import styles from './Contacts.module.scss'
import bg from '../../img/Contacts_bg.png'


const Contacts = () => {
  return (
    <div className={styles.contacts} id='contacts'>
      <div className={styles.contacts__bg}>
        <img className={styles.bg} src={bg} alt="contacts_bg" />
      </div>

      <div className={styles.contacts__wrapper}>
        <div className={styles.contacts__content}>
          <div className={styles.title}>Шахтерский экспресс</div>
          <div className={styles.subtitle}>Солигорск - Петриков</div>
          <div className={styles.suptitle}>( через Житковичи / Микашевичи )</div>
          <div className={styles.text}>Пассажирские перевозки</div>
          <div className={styles.social}>
            <div className={styles.phone__numbers}>
              <div className={styles.number}>
                <div className={styles.number__icon}></div>
                <a href='tel:+375297365432' className={styles.number__content}><span>+375 29</span> 736-54-32</a>
              </div>
              <div className={styles.number}>
                <div className={styles.number__icon}></div>
                <a href='tel:+375447365436' className={styles.number__content}><span>+375 44</span> 736-54-36</a>
              </div>
            </div>
            <div className={styles.social__links}>
              <div className={styles.social__link}>
                <div className={styles.link__icon}></div>
                <a target='_blank' href="https://instagram.com/shakhta_exp?igshid=YmMyMTA2M2Y=" className={styles.link__content}>Мы в Instagram!</a>
              </div>
              <div className={styles.social__link}>
                <div className={styles.link__icon}></div>
                <a target='_blank' href="https://vk.com/shakhta_exp" className={styles.link__content}>Мы ВКонтакте!</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contacts