// import logo from './logo.svg';
import React from 'react';
import Header from './components/Header.js';
import Hero from './components/Hero.js';
import Browse from './components/Browse.js';
import Arrived from './components/Arrived.js'
import Clients from './components/Clients.js';
import AsideMenu from './components/AsideMenu.js';
import Footer from './components/Footer.js';
import Offline from './components/Offline.js';

import './tailwind.css';

function App() {
  const [items, setItems] = React.useState([]);
  const [offlineStatus, setOfflineStatus] = React.useState(!navigator.onLine);

  function handleOfflineStatus(){
    setOfflineStatus(!navigator.onLine);
  }


  React.useEffect(function(){
    (async function(){
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

      const script = document.createElement("script");
      script.src = "/carousel.js";
      script.async = false;
      document.body.appendChild(script);
    })();

    handleOfflineStatus();
    window.addEventListener('online', handleOfflineStatus);
    window.addEventListener('offline', handleOfflineStatus);

    return function(){
      window.removeEventListener('online', handleOfflineStatus);
      window.removeEventListener('offline', handleOfflineStatus);

    }
  }, [offlineStatus]);
  return (
    <>
    {offlineStatus && <Offline />}
    <Header/>
    <Hero/>
    <Browse/>
    <Arrived items={items}/>
    <Clients/>
    <AsideMenu/>
    <Footer/>
    </>
  ); 
}

export default App;
