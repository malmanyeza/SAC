import React, { useContext } from 'react';
import CatalogueHeader from '../components/Catalogue/CatalogueHeader';
import ProductsSlider from '../components/Catalogue/ProductsList';
import { ProductsContext } from '../hooks/productsContext';
import RatingsModal from '../components/Catalogue/RatingsModal';

const Catalogue = () => {

const {isRatingsModalOpen} = useContext(ProductsContext)

  return (
    <div className="catalogue-container">
      <div className="overlay"></div>
      <div className="content">
        <CatalogueHeader />
        <ProductsSlider/>
        {isRatingsModalOpen && <RatingsModal/>}
      </div>
    </div>
  );
}

export default Catalogue;
