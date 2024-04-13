import React, { useState, useEffect, useContext } from 'react';
import { ProductsContext } from '../../hooks/productsContext';
import './styles/ProductsSlider.css';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';
import { RiShoppingCart2Line, RiDeleteBinLine } from 'react-icons/ri';
import DetailsModal from './DetailsModal';
import { UserDataContext } from '../../hooks/userDataContext';

const ProductsSlider = () => {
  const { selectedCategory, setNumberOfItemsInCart, products, setProducts, productsToBeApproved, viewApprovedProducts,deleteProduct } = useContext(ProductsContext);
  const { userData } = useContext(UserDataContext);

  const [filteredProducts, setFilteredProducts] = useState(products);
  const [scrollX, setScrollX] = useState(0);
  const [itemWidth, setItemWidth] = useState(200);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Filter products based on userType and viewApprovedProducts
    let filtered = [];
    if (userData.userType === 'admin' && !viewApprovedProducts) {
      filtered = productsToBeApproved;
    } else {
      filtered = selectedCategory === 'All' ? products : products.filter(product => product.category === selectedCategory);
    }
    setFilteredProducts(filtered);
  }, [selectedCategory, products, productsToBeApproved, userData.userType, viewApprovedProducts]);

  const handleScrollLeft = () => {
    setScrollX(prevScrollX => prevScrollX + (itemWidth * 2));
  };

  const handleScrollRight = () => {
    setScrollX(prevScrollX => prevScrollX - (itemWidth * 2));
  };

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

  const openDetailsModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeDetailsModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = (productId) => {
    // Implement delete product logic here
    deleteProduct(productId)
  };

  return (
    <div className="products-slider">
      <button className="scroll-button left" onClick={handleScrollLeft}>
        <RiArrowLeftSLine size={40} />
      </button>
      <div className="product-list-container">
        <ul className="product-list" style={{ transform: `translateX(${scrollX}px)` }}>
          {filteredProducts.map((product, index) => (
            <li key={index} className="product-card" onClick={() => openDetailsModal(product)}>
              <img src={product.imageUrl} alt={product.name} className="product-image" />
              <div className="product-info">
                <div className="product-bottom">
                  <h3 className="product-name">{product.name}</h3>
                </div>
                {userData.userType === 'admin' ? (
                  <div className="admin-buttons">
                    <button onClick={() => openDetailsModal(product)}>View Details</button>
                    <button onClick={() => handleDelete(product.id)}><RiDeleteBinLine size={20} /></button>
                  </div>
                ) : (
                  <div className='price-and-button'>
                    <p className="product-price">${product.price}</p> {/* Added dollar sign */}
                    <button
                      className={product.isInCart ? "quick-add-button in-cart" : "quick-add-button"}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleQuickAdd(product.id);
                      }}
                      onMouseDown={(e) => e.preventDefault()}
                    >
                      <RiShoppingCart2Line size={20} />
                      {product.isInCart ? "Added" : "Add"}
                    </button>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <button className="scroll-button right" onClick={handleScrollRight}>
        <RiArrowRightSLine size={40} />
      </button>
      {/* Render DetailsModal */}
      <DetailsModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={closeDetailsModal}
      />
    </div>
  );
}

export default ProductsSlider;
