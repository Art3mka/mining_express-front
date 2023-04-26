import React, { memo } from 'react'
import { Card, CardBody, CardTitle, CardText, CardColumns, Container } from 'reactstrap'
import styles from './Rules.module.scss'

const Rules = () => {
  return (
    <div id='rules'>
      <Container>
        <h2 className={styles.title}>Правила</h2>
        <CardColumns>

          <Card className={styles.card} outline color='light'>
            <CardBody className={styles.card__body}>
              <CardTitle className={styles.card__title}>1</CardTitle>
              <div className={styles.card__content}>
                <CardText>Воспользоваться онлайн заказом 24/7, пройдя регистрацию на сайте через SMS-подтвереждение или заказать по телефону с 7 до 22</CardText>
              </div>
            </CardBody>
          </Card>

          <Card className={styles.card} outline color='light'>
            <CardBody className={styles.card__body}>
              <CardTitle className={styles.card__title}>2</CardTitle>
              <div className={styles.card__content}>
                <CardText>Вам нужно будет указать направление, дату, время, кол-во мест, номер мобильного телефона</CardText>
              </div>
            </CardBody>
          </Card>

          <Card className={styles.card} outline color='light'>
            <CardBody className={styles.card__body}>
              <CardTitle className={styles.card__title}>3</CardTitle>
              <div className={styles.card__content}>
                <CardText>После обработки заказа на ваш номер мобильного телефона придет SMS с подтверждением заказа</CardText>
              </div>
            </CardBody>
          </Card>

          <Card className={styles.card} outline color='light'>
            <CardBody className={styles.card__body}>
              <CardTitle className={styles.card__title}>4</CardTitle>
              <div className={styles.card__content}>
                <CardText>После авторизации на сайте Вам доступен личный кабинет, в котором можно просмотреть всю информацию о заказах и отменить выбранный заказ</CardText>
              </div>
            </CardBody>
          </Card>
        </CardColumns>
      </Container>
    </div>
  )
}

export default memo(Rules)