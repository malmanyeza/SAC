import React from 'react';
import './styles/Contacts.css'; // Import CSS file for styling
import Header from '../components/Header';
import { FaInstagram, FaTwitter, FaFacebookF, FaPhoneAlt } from 'react-icons/fa'; // Import icons

const Contacts = () => {
  return (
    <div className="contacts-container">
      <div className="contacts-background-image">
        <div className="contacts-overlay"></div>
        <div className="contacts-header">
          <Header />
        </div>
        <div className="contacts-content">
          <h1 className="contacts-header">Contact Us</h1>
          <hr className="contacts-line" />
          <div className="contact-item">
            <FaInstagram className="contact-icon" />
            <span className="contact-name">Instagram: @your_instagram</span>
          </div>
          <div className="contact-item">
            <FaTwitter className="contact-icon" />
            <span className="contact-name">Twitter: @your_twitter</span>
          </div>
          <div className="contact-item">
            <FaFacebookF className="contact-icon" />
            <span className="contact-name">Facebook: @your_facebook</span>
          </div>
          <div className="contact-item">
            <FaPhoneAlt className="contact-icon" />
            <span className="contact-name">Phone: +1234567890</span>
          </div>
          <hr className="contacts-line" />
        </div>
      </div>
    </div>
  );
};

export default Contacts;
