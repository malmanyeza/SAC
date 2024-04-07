import React, { useContext } from 'react';
import { ProductsContext } from '../../hooks/productsContext';
import './styles/Categories.css';

const Categories = () => {
  const { selectedCategory, selectCategory } = useContext(ProductsContext);

  const categories = [
    'All',
    'Pottery',
    'Woodwork',
    'Beadwork',
    'Metalwork',
    'Textiles',
    'Paintings',
    'Sculptures'
  ];

  const handleCategoryClick = (category) => {
    selectCategory(category);
  };

  return (
    <div className="categories-container">
      {categories.map((category) => (
        <button
          key={category}
          className={selectedCategory === category ? 'category-btn selected' : 'category-btn'}
          onClick={() => handleCategoryClick(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default Categories;
