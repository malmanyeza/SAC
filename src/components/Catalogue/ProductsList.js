import React, { useState, useEffect, useContext } from 'react';
import { ProductsContext } from '../../hooks/productsContext';
import './styles/ProductsSlider.css'; // Your CSS for styling
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri'; // React Icons for chevron icons
import { RiShoppingCart2Line } from 'react-icons/ri'; // Cart icon

const ProductsSlider = () => {
  const { selectedCategory, setNumberOfItemsInCart } = useContext(ProductsContext);

  const [products, setProducts] = useState([
    { id: 1, name: 'Product 1', price: '$10', image: require('../../assets/images/circularTswanda.jpeg'), category: 'Pottery', isInCart: false },
    { id: 2, name: 'Product 2', price: '$15', image: require('../../assets/images/family.jpg'), category: 'Woodwork', isInCart: false },
    { id: 3, name: 'Product 3', price: '$20', image: require('../../assets/images/stool.jpg'), category: 'Beadwork', isInCart: false },
    { id: 4, name: 'Wala wala', price: '$10', image: require('../../assets/images/chirongo.jpg'), category: 'Metalwork', isInCart: false },
    { id: 5, name: 'Flores', price: '$15', image: require('../../assets/images/3tswanda.jpg'), category: 'Textiles', isInCart: false },
    { id: 6, name: 'Real', price: '$20', image: require('../../assets/images/2tswanda.jpg'), category: 'Paintings', isInCart: false },
    // Add more products as needed
  ]);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [scrollX, setScrollX] = useState(0);
  const [itemWidth, setItemWidth] = useState(200); // Width of one product item

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

  return (
    <div className="products-slider">
      <button className="scroll-button left" onClick={handleScrollLeft}>
        <RiArrowLeftSLine size={40} />
      </button>
      <div className="product-list-container">
        <ul className="product-list" style={{ transform: `translateX(${scrollX}px)` }}>
          {filteredProducts.map((product, index) => (
            <li key={index} className="product-card">
              <img src={product.image} alt={product.name} className="product-image" />
              <div className="product-info">
                <div className="product-bottom">
                  <h3 className="product-name">{product.name}</h3>
                </div>
                <div className='price-and-button'>
                  <p className="product-price">{product.price}</p>
                  <button
                    className={product.isInCart ? "quick-add-button in-cart" : "quick-add-button"}
                    onClick={() => handleQuickAdd(product.id)}
                    onMouseDown={(e) => e.preventDefault()} // Prevent default mousedown behavior
                  >
                    <RiShoppingCart2Line size={20} />
                    {product.isInCart ? "Added" : "Add"}
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <button className="scroll-button right" onClick={handleScrollRight}>
        <RiArrowRightSLine size={40} />
      </button>
    </div>
  );
}

export default ProductsSlider;
