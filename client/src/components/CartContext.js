import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [totalBill, setTotalBill] = useState(0);

  useEffect(() => {
    // Load the cart and totalBill from localStorage when the component mounts
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const storedTotalBill = parseFloat(localStorage.getItem('totalBill')) || 0;
    
    setCart(storedCart);
    setTotalBill(storedTotalBill);
  }, []);

  useEffect(() => {
    // Save the cart and totalBill to localStorage whenever they change
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('totalBill', totalBill.toString());
  }, [cart, totalBill]);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(cartItem => cartItem.name === item.name);
      
      if (existingItemIndex !== -1) {
        // If the item already exists in the cart, increase its quantity
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += 1;
        return updatedCart;
      } else {
        // If the item doesn't exist in the cart, add it with quantity 1
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  
    setTotalBill((prevTotal) => prevTotal + item.price);
  };
  

  const removeFromCart = (index) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
    setTotalBill((prevTotal) => prevTotal - cart[index].price);
  };

  const clearCart = () => {
    setCart([]);
    setTotalBill(0);
    localStorage.removeItem('cart');
    localStorage.removeItem('totalBill');
  };  

  return (
    <CartContext.Provider value={{ cart, totalBill, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
