import React, { createContext, useState, useContext } from 'react';

// Create the ProductsContext
const ProductsContext = createContext();

// Create the ProductsProvider component
const ProductsProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [numberOfItemsInCart, setNumberOfItemsInCart] = useState(0)

  const selectCategory = (category) => {
    setSelectedCategory(category);
  };

  return (
    <ProductsContext.Provider value={{ 
      selectedCategory, selectCategory , setNumberOfItemsInCart, numberOfItemsInCart
    }}>
      {children}
    </ProductsContext.Provider>
  );
};

export { ProductsProvider, ProductsContext };
