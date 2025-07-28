// src/context/WishlistContext.jsx
import React, { createContext, useContext, useState } from 'react';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('wishlist')) || [];
    } catch {
      return [];
    }
  });

  const addToWishlist = product => {
    setWishlist(prev => {
      const next = [...prev, product];
      localStorage.setItem('wishlist', JSON.stringify(next));
      return next;
    });
  };

  const removeFromWishlist = id => {
    setWishlist(prev => {
      const next = prev.filter(p => p.id !== id);
      localStorage.setItem('wishlist', JSON.stringify(next));
      return next;
    });
  };

  const isInWishlist = id => wishlist.some(p => p.id === id);

  return (
    <WishlistContext.Provider value={{
      wishlist,
      addToWishlist,
      removeFromWishlist,
      isInWishlist
    }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
}
