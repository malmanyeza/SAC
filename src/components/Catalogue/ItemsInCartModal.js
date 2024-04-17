import React, { useState, useEffect, useContext } from 'react';
import { ProductsContext } from '../../hooks/productsContext';
import './styles/ItemsInCartModal.css'; // Your CSS for styling
import RatingsModal from './RatingsModal';
import { getFunctions, httpsCallable} from 'firebase/functions';
import app from '../../firebase';


const ItemsInCartModal = ({ showModal, setShowModal }) => {
  const { products, setIsPaymentModalOpen , isRatingsModalOpen} = useContext(ProductsContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartItems, setCartItems] = useState([]);


  const functions = getFunctions(app); // Get the Firebase Functions instance

  useEffect(() => {
    // Calculate total price of items in cart
    console.log(products)
    const totalPrice = products.reduce((total, product) => {
      if (product.isInCart) {
        return total + parseInt(product.price, 10); // Remove the '$' and convert to number
      }
      return total;
    }, 0);
    setTotalPrice(totalPrice);
    const cartItems = products.filter(product => product.isInCart);
    setCartItems(cartItems);
    console.log('Here are the items in cart:', cartItems);
  }, [products]);

  const handleBuyItems = () => {
    // Assuming Firebase has been initialized elsewhere in your project
    const buyFunction = httpsCallable(functions, 'processPayment'); // Define the callable function
    buyFunction({ items: cartItems })
      .then(result => {
        window.location.href = result.data.url; // Redirect to Paynow payment page
      })
      .catch(error => {
        console.error('Error during payment:', error);
      });
  };

  const openPaymentModal = () => {
    setShowModal(false);
    setIsPaymentModalOpen(true);
    
  }

  const useCallDoubleNumber = (number) => {
    useEffect(() => {
      const doubleNumber = httpsCallable(functions, 'doubleNumber');
  
      doubleNumber({ number })
        .then((result) => {
          console.log('Result:', result.data.result);
        })
        .catch((error) => {
          console.error('Error:', error.message);
        });
    }, [number]); // useEffect will re-run when `number` changes
  };
  

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
                  <img src={product.imageUrl} alt={product.name} />
                </div>
                <div className="item-details">
                  <p>{product.name}</p>
                  <p>${product.price}</p>
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
          <button className="buy-button" onClick={openPaymentModal}>Buy Items</button>
        </div>
      </div>
    </div>
  );
}

export default ItemsInCartModal;
