import React from 'react';
import Categories from './Categories';
import './styles/CatalogueHeader.css'; // CSS for styling
import SearchBar from '../Home/SearchBar';

const CatalogueHeader = () => {
  return (
    <div className="catalogue-header">
      <Categories />
      <SearchBar/>
    </div>
  );
}

export default CatalogueHeader;
