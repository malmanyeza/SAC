import React, { useContext } from 'react';
import './styles/DetailsModal.css';
import { ProductsContext } from '../../hooks/productsContext';
import { UserDataContext } from '../../hooks/userDataContext';
import { RiLoader4Line } from 'react-icons/ri'; // Loader icon from React Icons

const DetailsModal = ({ product, isOpen, onClose }) => {
  const { 
    disapproveProduct, approveProduct, approvalInProgress, 
    disapprovalInProgress, products, setProducts, setNumberOfItemsInCart,
    viewApprovedProducts
  } = useContext(ProductsContext);
  const { userData } = useContext(UserDataContext);

  const handleQuickAdd = (productId) => {
    const updatedProducts = products.map(product =>
      product.id === productId ? { ...product, isInCart: !product.isInCart } : product
    );
    setProducts(updatedProducts);

    const productToUpdate = updatedProducts.find(product => product.id === productId);
    if (productToUpdate) {
      if (productToUpdate.isInCart) {
        setNumberOfItemsInCart(prevCount => prevCount + 1);
      } else {
        setNumberOfItemsInCart(prevCount => prevCount - 1);
      }
    }
  };

  const handleDelete = (productId) => {
    disapproveProduct(productId);
    onClose(); // Close the modal after deleting
  };

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
              <img src={product.imageUrl} alt={product.name} />
            </div>
          </div>
        </div>
        <div className="product-info">
          <p className="product-price">Price: ${product.price}</p> {/* Added dollar sign */}
          <div className="product-description">
            <h4>Description:</h4>
            <p>{product.description}</p>
          </div>
          <div className="artisan-info">
            <h4>Artisan Info:</h4>
            <div className="artisan">
              <img src={product.artisanImage} alt={product.artisanImage} className="artisan-avatar" />
              <p className="artisan-name">{product.artisanName}</p>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          {userData.userType === 'admin' && viewApprovedProducts ? (
            <button
              className="delete-button"
              onClick={() => handleDelete(product.id)}
              disabled={approvalInProgress || disapprovalInProgress}
            >
              {disapprovalInProgress ? (
                <RiLoader4Line className="spinner" />
              ) : (
                'Delete'
              )}
            </button>
          ) : (
            <>
              {userData.userType === 'admin' ? (
                <>
                  <button
                    className="approve-button"
                    onClick={() => approveProduct(product.id)}
                    disabled={approvalInProgress || disapprovalInProgress}
                  >
                    {approvalInProgress ? (
                      <RiLoader4Line className="spinner" />
                    ) : (
                      'Approve'
                    )}
                  </button>
                  <button
                    className="disapprove-button"
                    onClick={() => disapproveProduct(product.id)}
                    disabled={approvalInProgress || disapprovalInProgress}
                  >
                    {disapprovalInProgress ? (
                      <RiLoader4Line className="spinner" />
                    ) : (
                      'Disapprove'
                    )}
                  </button>
                </>
              ) : (
                <>
                  <button 
                    className="add-to-cart-button" 
                    onClick={(e) => {
                              e.stopPropagation();
                              handleQuickAdd(product.id);
                            }}
                    onMouseDown={(e) => e.preventDefault()} 
                  >Add to Cart
                  </button>
                  <button className="buy-button">Buy</button>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailsModal;
