import React, { useState, useEffect, useContext } from 'react';
import { ProductsContext } from '../../hooks/productsContext';
import './styles/ProductsSlider.css'; // Your CSS for styling
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri'; // React Icons for chevron icons
import { RiShoppingCart2Line } from 'react-icons/ri'; // Cart icon
import DetailsModal from './DetailsModal'; // Import the DetailsModal component
import { UserDataContext } from '../../hooks/userDataContext';

const ProductsSlider = () => {
  const { selectedCategory, setNumberOfItemsInCart, products, setProducts } = useContext(ProductsContext);
  const { userData } = useContext(UserDataContext);
  
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [scrollX, setScrollX] = useState(0);
  const [itemWidth, setItemWidth] = useState(200); // Width of one product item
  const [selectedProduct, setSelectedProduct] = useState(null); // Selected product for modal
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product => product.category === selectedCategory);
      setFilteredProducts(filtered);
    }
  }, [selectedCategory, products]);

  const handleScrollLeft = () => {
    setScrollX(prevScrollX => prevScrollX + (itemWidth * 2));
  };

  const handleScrollRight = () => {
    setScrollX(prevScrollX => prevScrollX - (itemWidth * 2));
  };

  const handleQuickAdd = (productId) => {
    // Toggle the isInCart property of the clicked product
    const updatedProducts = products.map(product =>
      product.id === productId ? { ...product, isInCart: !product.isInCart } : product
    );
    setProducts(updatedProducts);

    // Increment or decrement numberOfItemsInCart based on isInCart
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

  return (
    <div className="products-slider">
      <button className="scroll-button left" onClick={handleScrollLeft}>
        <RiArrowLeftSLine size={40} />
      </button>
      <div className="product-list-container">
        <ul className="product-list" style={{ transform: `translateX(${scrollX}px)` }}>
          {filteredProducts.map((product, index) => (
            <li key={index} className="product-card" onClick={() => openDetailsModal(product)}>
              <img src={product.image} alt={product.name} className="product-image" />
              <div className="product-info">
                <div className="product-bottom">
                  <h3 className="product-name">{product.name}</h3>
                </div>
                {userData.userType === 'admin' ? (
                  <div className="admin-buttons">
                    <button >View Details</button>
                    <button >Reject</button>
                  </div>
                ) : (
                  <div className='price-and-button'>
                    <p className="product-price">{product.price}</p>
                    <button
                      className={product.isInCart ? "quick-add-button in-cart" : "quick-add-button"}
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent event from bubbling to parent
                        handleQuickAdd(product.id);
                      }}
                      onMouseDown={(e) => e.preventDefault()} // Prevent default mousedown behavior
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
