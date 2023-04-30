import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Home from './Components/Home';
import AuthForm from './Components/AuthForm/AuthForm';
import OrderForm from './Components/OrderForm/OrderForm';
import './index.scss';

const App = () => {

  const [isLoaded, setIsLoaded] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [token, setToken] = useState('')
  const [routes, setRoutes] = useState([]);

  const routesRequest = `http://199.247.18.191:7777/api/routes`

  useEffect(() => {
    fetch(routesRequest)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setRoutes(result);
        }
      )
  }, [])

  const handleAuth = (state) => {
    setIsAuth(state)
  }

  const handleToken = (token) => {
    setToken(token)
  }

  if (!isLoaded) {
    return <div className='loader'><div className='loader__text'>Загрузка</div></div>;
  } else {
    return (
      <Layout isAuth={isAuth} handleAuth={handleAuth}>
        <Routes>
          <Route
            path='/'
            element={<Home
              routes={routes}
              isAuth={isAuth}
              token={token} />}
          />
          <Route
            path='/auth'
            element={<AuthForm
              handleAuth={handleAuth}
              handleToken={handleToken} />}
          />
          <Route
            path='/orders'
            element={<OrderForm
              token={token}
              isAuth={isAuth} />}
          />
        </Routes>

      </Layout>
    );
  }
}

export default App;
