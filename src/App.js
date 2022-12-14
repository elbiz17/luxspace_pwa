import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Splash from './pages/Splash.js';
import Header from './components/Header.js';
import Hero from './components/Hero.js';
import Browse from './components/Browse.js';
import Arrived from './components/Arrived.js';
import Clients from './components/Clients.js';
import AsideMenu from './components/AsideMenu.js';
import Footer from './components/Footer.js';
import Offline from './components/Offline.js';
import Profile from './pages/Profile.js';
import Details from './pages/Details.js'
import Cart from './pages/Cart.js';

function App({ cart }) {
  const [items, setItems] = React.useState([]);
  const [offlineStatus, setOfflineStatus] = React.useState(!navigator.onLine);
  const [isLoading, setIsLoading] = React.useState(true);


  function handleOfflineStatus() {
    setOfflineStatus(!navigator.onLine);
  }

  React.useEffect(function () {
    (async function () {
      const response = await fetch(   
        'https://mocki.io/v1/be8858ee-83ff-439b-9c5a-44a2d885f29c',
      {
      method :'GET',
      headers:{
          "Content-Type" : "application/json",
          "accept": "application/json",
          "x-api-key": process.env.REACT_APP_APIKEY
        }
      });
      const { nodes } = await response.json();
      setItems(nodes);

      setTimeout(function () {
        setIsLoading(false);
      }, 1500);

      const script = document.createElement("script");
      script.src = "/carousel.js";
      script.async = false;
      document.body.appendChild(script);
    })();

    handleOfflineStatus();
    window.addEventListener('online', handleOfflineStatus);
    window.addEventListener('offline', handleOfflineStatus);

    return function () {
      window.removeEventListener('online', handleOfflineStatus);
      window.removeEventListener('offline', handleOfflineStatus);
    }
  }, [offlineStatus]);
  return (
    <>
      {isLoading ? <Splash /> : (
        <>
          {offlineStatus && <Offline />}
          <Header mode="light" cart={cart} />
          <Hero />
          <Browse />
          <Arrived items={items} />
          <Clients />
          <AsideMenu />
          <Footer />
        </>
      )}
    </>
  );
}

export default function Routes() {
  const cachedCart = window.localStorage.getItem("cart");
  const [cart, setCart] = React.useState([]);

  function handleAddToCart(item) {
    const currentIndex = cart.length;
    const newCart = [...cart, { id: currentIndex + 1, item }];
    setCart(newCart);
    window.localStorage.setItem("cart", JSON.stringify(newCart));
  }

  function handleRemoveCartItem(event, id) {
    const revisedCart = cart.filter(function (item) {
      return item.id !== id;
    });
    setCart(revisedCart);
    window.localStorage.setItem("cart", JSON.stringify(revisedCart));
  }

  React.useEffect(function () {
    console.info("useEffect for localStorage");
    if (cachedCart !== null) {
      setCart(JSON.parse(cachedCart));
    }
  }, [cachedCart])

  return (
    <Router>
      <Route path="/" exact>
        <App cart={cart} />
      </Route>
      <Route path="/profile" exact component={Profile} />
      <Route path="/details/:id">
        <Details handleAddToCart={handleAddToCart} cart={cart} />
      </Route>
      <Route path="/cart">
        <Cart cart={cart} handleRemoveCartItem={handleRemoveCartItem} />
      </Route>
    </Router>
  )
}




