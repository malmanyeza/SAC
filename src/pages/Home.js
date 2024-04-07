import React from 'react';
import Contacts from './Contacts';
import Catalogue from './Catalogue';
import About from './About';
import './styles/Home.css';
import MissionBox from '../components/Home/MissionBox';
import Header from '../components/Header';
import HomeButtons from '../components/Home/HomeButton'; // Corrected component name

const Home = () => {
  return (
    <div>
      <section id="hero">
        <Header />
        <div className="hero-content">
          <MissionBox />
          <HomeButtons />
        </div>
      </section>

      <section id="catalogue">
        <div className="catalogue-content">
          <Catalogue />
        </div>  
      </section>

      <section id="about">
        <About />
      </section>

      <section id="contact">
        <Contacts />
      </section>
    </div>
  );
}

export default Home;