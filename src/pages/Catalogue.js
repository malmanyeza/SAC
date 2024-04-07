import React from 'react';
import CatalogueHeader from '../components/Catalogue/CatalogueHeader';
import ProductsSlider from '../components/Catalogue/ProductsList';

const Catalogue = () => {
  return (
    <div className="catalogue-container">
      <div className="overlay"></div>
      <div className="content">
        <CatalogueHeader />
        <ProductsSlider/>
      </div>
    </div>
  );
}

export default Catalogue;
