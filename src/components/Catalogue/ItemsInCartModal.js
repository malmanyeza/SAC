import React, { useState, useEffect, useContext } from 'react';
import { ProductsContext } from '../../hooks/productsContext';
import './styles/ItemsInCartModal.css'; // Your CSS for styling

const ItemsInCartModal = ({ showModal, setShowModal }) => {
  const { products } = useContext(ProductsContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Calculate total price of items in cart
    console.log(products)
    const totalPrice = products.reduce((total, product) => {
      if (product.isInCart) {
        return total + parseInt(product.price.slice(1), 10); // Remove the '$' and convert to number
      }
      return total;
    }, 0);
    setTotalPrice(totalPrice);
    const cartItems = products.filter(product => product.isInCart);
    setCartItems(cartItems);
  }, [products]);

  return (
    <div className={showModal ? "modal-wrapper active" : "modal-wrapper"}>
      <div className="modal">
        <div className="modal-header">
          <h2>Items in Cart</h2>
          <button className="close-btn" onClick={() => setShowModal(false)}>Close</button>
        </div>
        <div className="modal-body2">
          {cartItems.map((product) => {
            return (
              <div key={product.id} className="cart-item">
                <div className="item-image">
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="item-details">
                  <p>{product.name}</p>
                  <p>{product.price}</p>
                </div>
              </div>
            );
          })}
          <div className="total-price">
            <p>Total Price:</p>
            <p>${totalPrice.toFixed(2)}</p>
          </div>
        </div>
        <div className="modal-footer">
          <button className="buy-button">Buy Items</button>
        </div>
      </div>
    </div>
  );
}

export default ItemsInCartModal;
