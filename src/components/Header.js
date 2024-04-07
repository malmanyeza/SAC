import React from 'react';
import './styles/Header.css'; // CSS for styling
import { Link } from 'react-scroll';
import SearchBar from './Home/SearchBar';

const Header = () => {
  return (
    <div className="header">
      <div className="logoAndSearchBar">
        <a href="#home">
          <img src="/path/to/your/logo.png" alt="Logo" />
        </a>
        <SearchBar/>
      </div>
      <div className="navigation">
        <Link to="home" className="nav-link">Home</Link>
        <Link to="catalogue" smooth duration={500} className="nav-link">Catalogue</Link>
        <Link to="about" smooth duration={500} className="nav-link">About Us</Link>
        <Link to="contact" smooth duration={500} className="nav-link">Contact Us</Link>
      </div>
    </div>
  );
}

export default Header;
