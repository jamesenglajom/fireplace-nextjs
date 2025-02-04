"use client";
import React, { createContext, useState, useContext, useEffect } from "react";
import localforage from "localforage";
import { getCart, saveCart } from "@/app/lib/cartStorage";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [loadingCartItems, setLoadingCartItems] = useState(true);

  // Load the initial cart count from localforage on mount
  const loadCart = async () => {
    const cartItems = await getCart();
    setCartItems(cartItems);
    setCartItemsCount(cartItems.length);
    setLoadingCartItems(false);
  };

  useEffect(() => {
    loadCart();
  }, []);

  // Function to add to cart and update cart count
  // item param must be an array
  const addToCart = async (items) => {
    // getCart everytime we add or remove items
    const savedItems = await getCart();
    setCartItems((prev) => {
      const updatedItems = [...savedItems, ...items];
      saveCart(updatedItems);
      setCartItemsCount(updatedItems.length);
      return [...updatedItems];
    });
  };

  const removeCartItem = async (item) => {
    // getCart everytime we add or remove items
    const items = await getCart();
    setCartItems((prev) => {
      const updatedItems = items.filter((i) => i.id !== item.id);
      saveCart(updatedItems);
      setCartItemsCount(updatedItems.length);
      return [...updatedItems];
    });
  };

  const updateCart = (items) => {
    saveCart([...items]);
    setCartItemsCount(items.length);
    setCartItems([...items]);
  }

  const clearCartItems = async () => {
    setCartItems((prev) => {
      const updatedItems = [];
      saveCart(updatedItems);
      setCartItemsCount(updatedItems.length);
      return [...updatedItems];
    });
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartItemsCount,
        loadingCartItems,
        addToCart,
        removeCartItem,
        clearCartItems,
        updateCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
