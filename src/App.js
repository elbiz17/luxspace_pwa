// import logo from './logo.svg';
import Header from './components/Header.js';
import Hero from './components/Hero.js';
import Browse from './components/Browse.js';
import Arrived from './components/Arrived.js'
import Clients from './components/Clients.js';
import AsideMenu from './components/AsideMenu.js';
import Footer from './components/Footer.js';
import './tailwind.css';

function App() {
  return (
    <>
    <Header/>
    <Hero/>
    <Browse/>
    <Arrived/>
    <Clients/>
    <AsideMenu/>
    <Footer/>
    </>
  ); 
}

export default App;
