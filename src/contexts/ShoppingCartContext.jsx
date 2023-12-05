import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const ShoppingCartProvider = ({ children }) => {
  // Retrieve data from localStorage on component mount
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // Update localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const contextValue = {
    cart,
    setCart,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};