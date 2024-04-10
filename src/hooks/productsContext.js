import React, { createContext, useState, useContext } from 'react';

// Create the ProductsContext
const ProductsContext = createContext();

// Create the ProductsProvider component
const ProductsProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [numberOfItemsInCart, setNumberOfItemsInCart] = useState(0)
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Product 1',
      price: '$10',
      image: require('../assets/images/circularTswanda.jpeg'),
      category: 'Pottery',
      isInCart: false,
      description: 'This is a beautiful pottery product.',
      artisan: {
        name: 'Artisan 1',
        avatar: require('../assets/images/stool.jpg')
      }
    },
    {
      id: 2,
      name: 'Product 2',
      price: '$15',
      image: require('../assets/images/family.jpg'),
      category: 'Woodwork',
      isInCart: false,
      description: 'A lovely woodwork creation for your home. aljfoar oi aoireaoe faoiea odi aoejf foaoeifjaoief aoiea oiaiefa oe afeoi aoieai iaeoi fa iefwao ief ojeaoiwo aoieawoef ao ieaojeaiejaef',
      artisan: {
        name: 'Artisan 2',
        avatar: require('../assets/images/stool.jpg')
      }
    },
    {
      id: 3,
      name: 'Product 3',
      price: '$20',
      image: require('../assets/images/stool.jpg'),
      category: 'Beadwork',
      isInCart: false,
      description: 'Exquisite beadwork perfect for any occasion.',
      artisan: {
        name: 'Artisan 3',
        avatar: require('../assets/images/stool.jpg')
      }
    },
    {
      id: 4,
      name: 'Wala wala',
      price: '$10',
      image: require('../assets/images/chirongo.jpg'),
      category: 'Metalwork',
      isInCart: false,
      description: 'Unique metalwork design.',
      artisan: {
        name: 'Artisan 4',
        avatar: require('../assets/images/stool.jpg')
      }
    },
    {
      id: 5,
      name: 'Flores',
      price: '$15',
      image: require('../assets/images/3tswanda.jpg'),
      category: 'Textiles',
      isInCart: false,
      description: 'Beautiful textile artistry for your space.',
      artisan: {
        name: 'Artisan 5',
        avatar: require('../assets/images/stool.jpg')
      }
    },
    {
      id: 6,
      name: 'Real',
      price: '$20',
      image: require('../assets/images/2tswanda.jpg'),
      category: 'Paintings',
      isInCart: false,
      description: 'Captivating painting that tells a story.',
      artisan: {
        name: 'Artisan 6',
        avatar: require('../assets/images/stool.jpg')
      }
    },
    // Add more products as needed
  ]);
  

  const selectCategory = (category) => {
    setSelectedCategory(category);
  };

  return (
    <ProductsContext.Provider value={{ 
      selectedCategory, selectCategory , setNumberOfItemsInCart, numberOfItemsInCart,
      products, setProducts
    }}>
      {children}
    </ProductsContext.Provider>
  );
};

export { ProductsProvider, ProductsContext };
