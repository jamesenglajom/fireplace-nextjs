"use client";
import React, { createContext, useState, useContext, useEffect } from "react";
import AddedToCartDialog from "@/app/components/atom/AddedToCartDialog"

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartStorage, setCartStorage] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [loadingCartItems, setLoadingCartItems] = useState(true);
  const [addedToCart, setAddedToCart] = useState(null);

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
  const addToCart = async (items, triggerAddedToCartModal) => {
    // getCart everytime we add or remove items
    try{
      const savedItems = await cartStorage.getCart();
      setCartItems((prev) => {
        const updatedItems = [...savedItems, ...items];
        cartStorage.saveCart(updatedItems);
        setCartItemsCount(updatedItems.length);
        return [...updatedItems];
      });
      // triggerAddedToCart
      if(triggerAddedToCartModal){
        setAddedToCart(items);
      }
    }catch(error){
      // triggerErrorNotAddedToCart
    }
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

  const handleCloseAddedToCart = () =>{
    setAddedToCart(null);
  }

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
      <AddedToCartDialog data={addedToCart} onClose={handleCloseAddedToCart}/>
    </CartContext.Provider>
  );
};
