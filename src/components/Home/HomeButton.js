import React from 'react';
import SearchBar from './SearchBar';
import './styles/HomeButtons.css'; // CSS for styling
import LoginSignupButtons from './LoginSignupButtons';

const HomeButtons = () => {
  return (
    <div className="home-buttons">
      <LoginSignupButtons/>
    </div>
  );
}

export default HomeButtons;
