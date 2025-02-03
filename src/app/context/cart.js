'use client';
import React, { createContext, useState, useContext, useEffect } from 'react';
import localforage from 'localforage';
import { getCart, saveCart} from '@/app/lib/cartStorage';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartItemsCount, setCartItemsCount] = useState(0);

  // Load the initial cart count from localforage on mount
  useEffect(() => {
    const loadCart = async () => {
      const cartItems = await getCart();
      setCartItems(cartItems);
      setCartItemsCount(cartItems.length);
    };
    loadCart();
  }, []);

  // Function to add to cart and update cart count
  const addToCart = async (item) => {
    setCartItems(prev=> {
        const updatedItems = [...prev,item];
        saveCart(updatedItems)
        setCartItemsCount(updatedItems.length)
        return [...updatedItems];
    })
  };

  const removeCartItem = async(item) => {
    setCartItems(prev=> {
        const updatedItems = prev.filter(i=> i.id !== item.id);
        saveCart(updatedItems)
        setCartItemsCount(updatedItems.length)
        return [...updatedItems];
    })
  }

  const clearCartItems = async() => {
    setCartItems(prev=> {
        const updatedItems = [];
        saveCart(updatedItems)
        setCartItemsCount(updatedItems.length)
        return [...updatedItems];
    })
  }

  return (
    <CartContext.Provider value={{ cartItems, cartItemsCount, addToCart, removeCartItem,  clearCartItems }}>
      {children}
    </CartContext.Provider>
  );
};