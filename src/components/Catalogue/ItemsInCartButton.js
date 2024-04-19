import React, { useContext, useState, useEffect } from 'react';
import { RiShoppingCart2Line } from 'react-icons/ri'; // Cart icon
import './styles/ItemsInCartButton.css';
import { ProductsContext } from '../../hooks/productsContext';
import { UserDataContext } from '../../hooks/userDataContext';
import ItemsInCartModal from './ItemsInCartModal'; // Import the ItemsInCartModal component
import PaymentModal from './PaymentModal';
import SignInModal from '../Home/SignInModal';

const ItemsInCartButton = () => {
  const { numberOfItemsInCart, isPaymentModalOpen, setIsPaymentModalOpen } = useContext(ProductsContext);
  const { userData, setIsLoginInProcess, isLoginInProcess } = useContext(UserDataContext);
  const [showModal, setShowModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [buyButtonClicked, setBuyButtonClicked] = useState(false);


  useEffect(() => {
    if (buyButtonClicked && userData.isLoggedIn) {
      setLoginModal(false);
      setBuyButtonClicked(false);
      setShowModal(true);
      
    }
  }, [userData.email]);

  const closePaymentModal = () => {
    setIsPaymentModalOpen(false);
  };

  const handleButtonClick = () => {
    if (!userData.email) {
      // If user is not logged in, setLoginModal to true
      setLoginModal(true);
      setBuyButtonClicked(true);
      setIsLoginInProcess(true)
    } else {
      // If user is logged in, show the modal
      setShowModal(true);
      setBuyButtonClicked(true)
    }
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
      {isPaymentModalOpen && <PaymentModal onClose={closePaymentModal} showModal={isPaymentModalOpen} />}
      {loginModal && isLoginInProcess&& <SignInModal />}
    </>
  );
};

export default ItemsInCartButton;
