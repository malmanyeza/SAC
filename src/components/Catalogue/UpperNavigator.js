import React from 'react';
import './styles/UpperNavigator.css'; // CSS for styling
import { useNavigate } from 'react-router-dom';

const UpperNavigator = () => {

  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/');
  };

  const goToAbout = () => {
    navigate('/about');
  }
  
  const goToContacts = () => {
    navigate('/contacts');
  }


  return (
    <div className="upper-navigator">
      <div className="store-text">Catalogue.</div>
      <div className="nav-links">
        <button className="upper-nav-link" onClick={goToHome}>Home</button>
        <button className="upper-nav-link" onClick={goToAbout}>About</button>
        <button className="upper-nav-link" onClick={goToContacts}>Contacts</button>
      </div>
    </div>
  );
}

export default UpperNavigator;
