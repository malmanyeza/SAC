import React from 'react';
import './styles/DetailsModal.css';

const DetailsModal = ({ product, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{product.name}</h2>
          <button className="details-close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <div className="product-details">
            <div className="product-image">
              <img src={product.image} alt={product.name} />
            </div>
          </div>
          
        </div>
        <div className="product-info">
            <p className="product-price">Price: {product.price}</p>
            <div className="product-description">
            <h4>Description:</h4>
            <p>{product.description}</p>
            </div>
            <div className="artisan-info">
            <h4>Artisan Info:</h4>
            <div className="artisan">
                <img src={product.artisan.avatar} alt={product.artisan.name} className="artisan-avatar" />
                <p className="artisan-name">{product.artisan.name}</p>
            </div>
            </div>
        </div>
        <div className="modal-footer">
            <button className="add-to-cart-button">Add to Cart</button>
            <button className="buy-button">Buy</button>
        </div>
      </div>
    </div>
  );
};

export default DetailsModal;
