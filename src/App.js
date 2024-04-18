import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Catalogue from './pages/Catalogue';
import About from './pages/About';
import Contacts from './pages/Contacts';
import { ProductsProvider } from './hooks/productsContext';
import { UserDataProvider } from './hooks/userDataContext';

function App() {
  return (
    <UserDataProvider>
      <ProductsProvider>
        <BrowserRouter>
        <Routes>
            <Route path="/catalogue" element={<Catalogue />} />
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contacts" element={<Contacts/>} />
          </Routes>
        </BrowserRouter>
      </ProductsProvider>
    </UserDataProvider>
  );
}

export default App;
