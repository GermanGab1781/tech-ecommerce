import React, { createContext, useState, useEffect } from 'react';
import Swal from 'sweetalert2';

export const CartContext = createContext();

export const ShoppingCartProvider = ({ children }) => {
  // Retrieve data from localStorage on component mount
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });
  const [total, setTotal] = useState(() => {
    const storedTotal = localStorage.getItem('total');
    return storedTotal ? JSON.parse(storedTotal) : 0;
  });
  const [quantity, setQuantity] = useState(() => {
    const storedQuantity = localStorage.getItem('quantity');
    return storedQuantity ? JSON.parse(storedQuantity) : 0;
  });

  const addToCart = (info) => {
    const updatedCart = [...cart];
    const foundItem = updatedCart.find(item => item.data.id === info.id);
    if (foundItem) {
      foundItem.quantity += 1; // Increment quantity by 1 if the ID exists
      setQuantity(quantity + 1)
      Swal.fire({ title: info.info.name, text: 'Added one more to Cart', icon: 'success' })
    } else {
      updatedCart.push({ data: { id: info.id, name: info.info.name, image: info.images[0].Url, price: info.info.price }, quantity: 1 }); // Add new item with quantity 1
      setQuantity(quantity + 1)
      Swal.fire({ title: info.info.name, text: 'Added to Cart', icon: 'success' })
    }
    setCart(updatedCart);
  }

  const removeFromCart = (id) => {
    let updatedCart = [...cart];
    const foundItem = updatedCart.find(item => item.data.id === id);
    console.log(foundItem)
    console.log(id)
    if (foundItem && foundItem.quantity > 1) {
      foundItem.quantity = foundItem.quantity - 1; // Decrement quantity by 1 if quantity > 1
      setQuantity(quantity - 1)
    } else {
      updatedCart = updatedCart.filter(item => item.data.id !== id)
      setQuantity(quantity - 1)
    }
    setCart(updatedCart);
  }

  // Update localStorage whenever cart changes
  useEffect(() => {
    /* Update total price */
    let totalPrice = 0
    cart.forEach(element => {
      totalPrice += element.quantity * element.data.price
    });
    setTotal(totalPrice)
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('total', JSON.stringify(total));
    localStorage.setItem('quantity', JSON.stringify(quantity));

  }, [cart, total, quantity]);

  const contextValue = {
    cart,
    total,
    quantity,
    addToCart,
    removeFromCart,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};