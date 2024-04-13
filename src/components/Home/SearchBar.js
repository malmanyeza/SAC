import React, { useState, useContext } from 'react';
import './styles/SearchBar.css'; // CSS for styling
import { FaSearch, FaTimes } from 'react-icons/fa';
import { ProductsContext } from '../../hooks/productsContext';
import DetailsModal from '../Catalogue/DetailsModal';

const SearchBar = () => {
  const { products } = useContext(ProductsContext);

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); // State to store the selected product
  const [showDetailsModal, setShowDetailsModal] = useState(false); // State to manage DetailsModal visibility

  // Function to handle search input change
  const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    // Filter products based on search term
    const results = products.filter(product =>
      product.name.toLowerCase().includes(term.toLowerCase())
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

  // Function to handle click on a search result item
  const handleResultClick = (product) => {
    setSelectedProduct(product);
    setShowDetailsModal(true); // Show the DetailsModal when a product is clicked
  };

  // Function to close the DetailsModal
  const handleCloseDetailsModal = () => {
    setShowDetailsModal(false);
  };

  return (
    <div className={`search-bar ${showResults ? 'show-results' : ''}`}>
      <div className="search-input">
        <FaSearch className="search-icon" />
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search products"
        />
        {searchTerm && <FaTimes className="clear-icon" onClick={clearSearch} />}
      </div>
      {showResults && (
        <div className="search-results">
          {searchResults.map(product => (
            <div key={product.id} className="search-result-item" onClick={() => handleResultClick(product)}>
              {product.name}
            </div>
          ))}
        </div>
      )}
      {showDetailsModal && (
        <DetailsModal
          product={selectedProduct}
          isOpen={showDetailsModal}
          onClose={handleCloseDetailsModal}
        />
      )}
    </div>
  );
};

export default SearchBar;
