import React from 'react';
import './styles/Header.css'; // CSS for styling
import SearchBar from './Home/SearchBar';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom


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
        {/* Use Link from react-router-dom */}
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/catalogue" className="nav-link">Catalogue</Link>
        <Link to="/about" className="nav-link">About Us</Link>
        <Link to="/contact" className="nav-link">Contact Us</Link>
      </div>
    </div>
  );
}

export default Header;
