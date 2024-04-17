import React, { useState, useContext } from 'react';
import './styles/PaymentModal.css'; // Your CSS for styling
import { ProductsContext } from '../../hooks/productsContext';

const PaymentModal = ({ showModal, onClose }) => {
  const { setIsPaymentModalOpen, setIsRatingsModalOpen } = useContext(ProductsContext);

  const [selectedMethod, setSelectedMethod] = useState('visa'); // Default selected method
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [cvv, setCvv] = useState('');
  const [collectionPoint, setCollectionPoint] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleMethodSelect = (method) => {
    setSelectedMethod(method);
  };

  const handleConfirmPayment = () => {
    // Clear previous errors
    setErrors({});

    // Perform validations
    const errors = {};
    if (!cardName.trim()) {
      errors.cardName = 'Card Name is required';
    }
    if (!cardNumber.trim()) {
      errors.cardNumber = 'Card Number is required';
    } else if (!/^\d+$/.test(cardNumber)) {
      errors.cardNumber = 'Card Number should only contain numbers';
    }
    if (!expiryMonth.trim()) {
      errors.expiryMonth = 'Expiry Month is required';
    }
    if (!cvv.trim()) {
      errors.cvv = 'CVV is required';
    } else if (!/^\d+$/.test(cvv)) {
      errors.cvv = 'CVV should only contain numbers';
    }
    if (!collectionPoint.trim()) {
      errors.collectionPoint = 'Collection Point is required';
    }

    if (Object.keys(errors).length === 0) {
      // No errors, proceed with payment confirmation logic
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        alert('Payment was successfully made!');
        setIsPaymentModalOpen(false);
        setIsRatingsModalOpen(true);
      }, 5000); // Simulate 5 seconds delay
    } else {
      // Set errors
      setErrors(errors);
    }
  };

  return (
    <div className={showModal ? 'modal-wrapper active' : 'modal-wrapper'} onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Choose a Payment Method</h2>
        </div>
        <div className="payment-modal-content">
          <hr className="line" />
          <div className="payment-methods">
            <div
              className={selectedMethod === 'visa' ? 'circle selected' : 'circle'}
              onClick={() => handleMethodSelect('visa')}
            ></div>
            <div className="method-images">
              <img src={require('../../assets/images/masterCard.png')} alt="Mastercard" className="method-image" />
              <img src={require('../../assets/images/paypal.png')} alt="Paypal" className="method-image" />
            </div>
          </div>
          <div className="input-section">
            <input
              type="text"
              placeholder="Card Name"
              className={errors.cardName ? 'input-field error' : 'input-field'}
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
            />
            {errors.cardName && <p className="error-text">{errors.cardName}</p>}
            <input
              type="text"
              placeholder="Card Number"
              className={errors.cardNumber ? 'input-field error' : 'input-field'}
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              maxLength={16}
            />
            {errors.cardNumber && <p className="error-text">{errors.cardNumber}</p>}
            <div className="row">
              <input
                type="month"
                placeholder="Expiry Month"
                className={errors.expiryMonth ? 'input-field error' : 'input-field'}
                value={expiryMonth}
                onChange={(e) => setExpiryMonth(e.target.value)}
              />
              <input
                type="text"
                placeholder="CVV"
                className={errors.cvv ? 'input-field error' : 'input-field'}
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                maxLength={3}
              />
            </div>
            {errors.expiryMonth && <p className="error-text">{errors.expiryMonth}</p>}
            {errors.cvv && <p className="error-text">{errors.cvv}</p>}
            <input
              type="text"
              placeholder="Collection Point"
              className={errors.collectionPoint ? 'input-field error' : 'input-field'}
              value={collectionPoint}
              onChange={(e) => setCollectionPoint(e.target.value)}
            />
            {errors.collectionPoint && <p className="error-text">{errors.collectionPoint}</p>}
          </div>
          <button className="confirm-button" onClick={handleConfirmPayment}>
            {isLoading ? <div className="payment-spinner"></div> : 'Confirm Payment'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
