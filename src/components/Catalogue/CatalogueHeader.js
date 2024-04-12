import React, { useContext, useEffect } from 'react';
import Categories from './Categories';
import './styles/CatalogueHeader.css'; // CSS for styling
import SearchBar from '../Home/SearchBar';
import ItemsInCartButton from './ItemsInCartButton'; // Import the ItemsInCartButton
import UploadContentButton from './UploadContentButton'; // Import the new component
import { UserDataContext } from '../../hooks/userDataContext';

const CatalogueHeader = () => {
  // Dummy count for demonstration, you'll need to calculate this based on products in cart
  const { userData, setUserData } = useContext(UserDataContext);
  const itemsInCartCount = 3;

  // Handler for the Upload Content button
  const handleUploadContent = () => {
    // Implement your logic here
    console.log('Upload Content button clicked!');
  };

  return (
    <div className="catalogue-header">
      <Categories />
      {/* Conditional rendering based on user type */}
      {userData.userType === 'admin' ? (
        <div className="admin-panel">
          Admin Panel
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
  );
}

export default CatalogueHeader;
