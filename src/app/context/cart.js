"use client";
import React, { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartStorage, setCartStorage] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [loadingCartItems, setLoadingCartItems] = useState(true);

  useEffect(() => {
    // Dynamically import the cartStorage module only on the client-side
    if (typeof window !== "undefined") {
      import("@/app/lib/cartStorage")
        .then((module) => {
          setCartStorage(module);
        })
        .catch((error) => {
          console.error("Error loading cartStorage module:", error);
        });
    }
  }, []);

  useEffect(() => {
    // Load the initial cart count from localforage on mount
    const loadCart = async () => {
      const cartItems = await cartStorage.getCart();
      setCartItems(cartItems);
      setCartItemsCount(cartItems.length);
      setLoadingCartItems(false);
    };
    if (cartStorage) {
      loadCart();
    }
  }, [cartStorage]);

  // Function to add to cart and update cart count
  // item param must be an array
  const addToCart = async (items) => {
    // getCart everytime we add or remove items
    const savedItems = await cartStorage.getCart();
    setCartItems((prev) => {
      const updatedItems = [...savedItems, ...items];
      cartStorage.saveCart(updatedItems);
      setCartItemsCount(updatedItems.length);
      return [...updatedItems];
    });
  };

  const removeCartItem = async (item) => {
    // getCart everytime we add or remove items
    const items = await cartStorage.getCart();
    setCartItems((prev) => {
      const updatedItems = items.filter((i) => i.id !== item.id);
      cartStorage.saveCart(updatedItems);
      setCartItemsCount(updatedItems.length);
      return [...updatedItems];
    });
  };

  const updateCart = (items) => {
    cartStorage.saveCart([...items]);
    setCartItemsCount(items.length);
    setCartItems([...items]);
  };

  const clearCartItems = async () => {
    setCartItems((prev) => {
      const updatedItems = [];
      cartStorage.saveCart(updatedItems);
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
        updateCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
