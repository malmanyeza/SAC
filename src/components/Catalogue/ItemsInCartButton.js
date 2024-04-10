import React, { useContext, useState } from 'react';
import { RiShoppingCart2Line } from 'react-icons/ri'; // Cart icon
import './styles/ItemsInCartButton.css';
import { ProductsContext } from '../../hooks/productsContext';
import ItemsInCartModal from './ItemsInCartModal'; // Import the ItemsInCartModal component

const ItemsInCartButton = () => {
  const { numberOfItemsInCart } = useContext(ProductsContext);
  const [showModal, setShowModal] = useState(false);

  const handleButtonClick = () => {
    setShowModal(true);
  };

  return (
    <>
      <button className="items-in-cart-button" onClick={handleButtonClick}>
        <div className="cart-icon">
          <RiShoppingCart2Line size={20} />
          {numberOfItemsInCart > 0 && (
            <div className="cart-count">{numberOfItemsInCart}</div>
          )}
        </div>
        <span>Buy Items</span>
      </button>
      {showModal && <ItemsInCartModal showModal={showModal} setShowModal={setShowModal} />}
    </>
  );
};

export default ItemsInCartButton;
