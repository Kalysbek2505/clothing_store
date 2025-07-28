// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { WishlistProvider } from './context/WishlistContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import Wishlist from './pages/Wishlist';
import Contacts from './pages/Contacts';
import About from './pages/About';

export default function App() {
  return (
    <BrowserRouter>
      <WishlistProvider>
        {/* однократный site-wrap на всё SPA */}
        <div className="site-wrap">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/product/:slug" element={<ProductDetail />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/contact" element={<Contacts />} />
            <Route path="/about" element={<About />} />
          </Routes>
          <Footer />
        </div>
      </WishlistProvider>
    </BrowserRouter>
  );
}
