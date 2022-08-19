// import logo from './logo.svg';
import React from 'react';
import Header from './components/Header.js';
import Hero from './components/Hero.js';
import Browse from './components/Browse.js';
import Arrived from './components/Arrived.js'
import Clients from './components/Clients.js';
import AsideMenu from './components/AsideMenu.js';
import Footer from './components/Footer.js';
import './tailwind.css';

function App() {
  const [items, setItems] = React.useState([]);

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
    })();
  }, []);
  return (
    <>
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
