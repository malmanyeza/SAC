import React, { useState } from 'react';
import './styles/SearchBar.css'; // CSS for styling
import { FaSearch, FaTimes } from 'react-icons/fa';

const SearchBar = () => {
  const artisans = [
    { id: 1, name: 'Artisan 1' },
    { id: 2, name: 'Artisan 2' },
    { id: 3, name: 'Artisan 3' },
    { id: 4, name: 'Artisan 4' },
    { id: 5, name: 'Artisan 5' },
    { id: 6, name: 'Artisan 6' },
    { id: 7, name: 'Artisan 7' },
    { id: 8, name: 'Artisan 8' },
    { id: 9, name: 'Artisan 9' },
    { id: 10, name: 'Artisan 10' }
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  // Function to handle search input change
  const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    // Filter artisans based on search term
    const results = artisans.filter(artisan =>
      artisan.name.toLowerCase().includes(term.toLowerCase())
    );
    setSearchResults(results);
    setShowResults(!!term); // Set showResults to true if there is a search term
  };

  // Function to clear search term
  const clearSearch = () => {
    setSearchTerm('');
    setSearchResults([]);
    setShowResults(false); // Hide results when search is cleared
  };

  return (
    <div className={`search-bar ${showResults ? 'show-results' : ''}`}>
      <div className="search-input">
        <FaSearch className="search-icon" />
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search artisans"
        />
        {searchTerm && <FaTimes className="clear-icon" onClick={clearSearch} />}
      </div>
      {showResults && (
        <div className="search-results">
          {searchResults.map(artisan => (
            <div key={artisan.id}>{artisan.name}</div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
