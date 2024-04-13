import React, { useContext, useState } from 'react';
import Categories from './Categories';
import './styles/CatalogueHeader.css'; // CSS for styling
import SearchBar from '../Home/SearchBar';
import ItemsInCartButton from './ItemsInCartButton'; // Import the ItemsInCartButton
import UploadContentButton from './UploadContentButton'; // Import the new component
import UpperNavigator from './UpperNavigator'; // Import the UpperNavigator component
import { UserDataContext } from '../../hooks/userDataContext';
import { ProductsContext } from '../../hooks/productsContext';

const CatalogueHeader = () => {
  const { setViewApprovedProducts, viewApprovedProducts } = useContext(ProductsContext);
  const { userData, setUserData } = useContext(UserDataContext);
  const itemsInCartCount = 3;

  // State to track which button is selected
  

  // Handler for changing the view to approved products
  const handleApprovedProductsClick = () => {
    setViewApprovedProducts(true);
  };

  // Handler for changing the view to unapproved products
  const handleUnapprovedProductsClick = () => {
    setViewApprovedProducts(false);
  };

  // Handler for the upload content button
  const handleUploadContent = () => {
    console.log('Upload content button clicked');
  };

  return (
    <div className="catalogue-header">
      <UpperNavigator /> {/* Render the UpperNavigator component */}
      <div className="header-bottom">
        <div className="header-left">
          <Categories />
        </div>

        {userData.userType === 'admin' ? (
          <div className="admin-panel">
            <button
              className={`admin-button ${!viewApprovedProducts ? 'selected' : ''}`}
              onClick={handleUnapprovedProductsClick}
            >
              Unapproved Products
            </button>
            <button
              className={`admin-button ${viewApprovedProducts ? 'selected' : ''}`}
              onClick={handleApprovedProductsClick}
            >
              Approved Products
            </button>
            <div className="admin-text">Admin Panel</div>
          </div>
        ) : userData.userType === 'artisan' ? (
          <div className="header-right">
            <SearchBar />
            <ItemsInCartButton count={itemsInCartCount} />
            <UploadContentButton onPress={handleUploadContent} />
          </div>
        ) : (
          <div className="header-right">
            <SearchBar />
            <ItemsInCartButton count={itemsInCartCount} />
          </div>
        )}

      </div>
    </div>
  );
}

export default CatalogueHeader;
