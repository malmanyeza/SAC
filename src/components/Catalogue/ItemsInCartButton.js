import React,{useContext} from 'react';
import { RiShoppingCart2Line } from 'react-icons/ri'; // Cart icon
import './styles/ItemsInCartButton.css'
import { ProductsContext } from '../../hooks/productsContext';

const ItemsInCartButton = () => {

    const { numberOfItemsInCart } = useContext(ProductsContext);

  return (
    <button className="items-in-cart-button">
      <div className="cart-icon">
        <RiShoppingCart2Line size={20} />
        {numberOfItemsInCart > 0 && (
          <div className="cart-count">{numberOfItemsInCart}</div>
        )}
      </div>
      <span>Buy Items</span>
    </button>
  );
};

export default ItemsInCartButton;
