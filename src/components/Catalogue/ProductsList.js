import React, { useState, useEffect, useContext } from 'react';
import { ProductsContext } from '../../hooks/productsContext';
import './styles/ProductsSlider.css'; // Your CSS for styling

const ProductsSlider = () => {
  const { selectedCategory } = useContext(ProductsContext);

  const products = [
    { id: 1, name: 'Product 1', price: '$10', image: require('../../assets/images/circularTswanda.jpeg'), category: 'Pottery' },
    { id: 2, name: 'Product 2', price: '$15', image: require('../../assets/images/family.jpg'), category: 'Woodwork' },
    { id: 3, name: 'Product 3', price: '$20', image: require('../../assets/images/stool.jpg'), category: 'Beadwork' },
    { id: 4, name: 'Wala wala', price: '$10', image: require('../../assets/images/chirongo.jpg'), category: 'Metalwork' },
    { id: 5, name: 'Flores', price: '$15', image: require('../../assets/images/3tswanda.jpg'), category: 'Textiles' },
    { id: 6, name: 'Real', price: '$20', image: require('../../assets/images/2tswanda.jpg'), category: 'Paintings' },
    // Add more products as needed
  ];

  const [filteredProducts, setFilteredProducts] = useState(products);
  const [scrollX, setScrollX] = useState(0);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product => product.category === selectedCategory);
      setFilteredProducts(filtered);
    }
  }, [selectedCategory]);

  const handleScrollLeft = () => {
    const container = document.querySelector('.product-list');
    if (container) {
      const scrollAmount = container.clientWidth;
      setScrollX(scrollX - scrollAmount);
    }
  };

  const handleScrollRight = () => {
    const container = document.querySelector('.product-list');
    if (container) {
      const scrollAmount = container.clientWidth;
      setScrollX(scrollX + scrollAmount);
    }
  };

  const handleProductClick = (productId) => {
    // Handle click event, you can navigate to a product page or do any other action
    console.log('Product clicked:', productId);
  };

  return (
    <div className="products-slider">
      <div className="product-list-container">
        <ul className="product-list" style={{ transform: `translateX(${scrollX}px)` }}>
          {filteredProducts.map((product, index) => (
            <li key={index} className="product-card" onClick={() => handleProductClick(product.id)}>
              <img src={product.image} alt={product.name} className="product-image" />
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">{product.price}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ProductsSlider;
