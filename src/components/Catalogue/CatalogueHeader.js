import React from 'react';
import Categories from './Categories';
import './styles/CatalogueHeader.css'; // CSS for styling
import SearchBar from '../Home/SearchBar';
import ItemsInCartButton from './ItemsInCartButton'; // Import the new component

const CatalogueHeader = () => {
  // Dummy count for demonstration, you'll need to calculate this based on products in cart
  const itemsInCartCount = 3;

  return (
    <div className="catalogue-header">
      <Categories />
      <div className="header-right">
        <SearchBar/>
        <ItemsInCartButton count={itemsInCartCount} />
      </div>
    </div>
  );
}

export default CatalogueHeader;
