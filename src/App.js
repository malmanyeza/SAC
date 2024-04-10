import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Catalogue from './pages/Catalogue';
import About from './pages/About';
import Contacts from './pages/Contacts';
import ScrollUpFloatingButton from './components/ScrollUpFloatingButton';
import { ProductsProvider } from './hooks/productsContext';
import { UserDataProvider } from './hooks/userDataContext';

function App() {
  return (
    <UserDataProvider>
      <ProductsProvider>
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="catalogue" element={<Catalogue />} />
            <Route path="about" element={<About />} />
            <Route path="contacts" element={<Contacts />} />
          </Routes>
          <ScrollUpFloatingButton/>
        </BrowserRouter>
      </ProductsProvider>
    </UserDataProvider>
  );
}

export default App;
