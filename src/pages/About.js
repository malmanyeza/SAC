import React from 'react';
import './styles/About.css'; // Import CSS file for styling
import Header from '../components/Header';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-background-image">
        <div className="about-overlay"></div>
        <div className="about-header">
          <Header />
        </div>
        <div className="about-content">
          <h1 className="about-header">About Us</h1>
          <hr className="about-line" />
          <p className="about-text">
            Empowering Zimbabwean artisans through our cutting-edge platfom, SAC Private Limited is redifining the art of 
            craftmanship and preserving cultural heritage with a modern twist. Join us in revolutionizing the artisanal landscape of Zimbabwean
          </p>
          <hr className="about-line" />
        </div>
      </div>
    </div>
  );
};

export default About;
