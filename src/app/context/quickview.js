"use client";
import React, { createContext, useState, useContext, useEffect } from "react";
import QuickView from "@/app/components/atom/ProductQuickView"
const QuickViewContext = createContext();
export const useQuickView = () => {
  return useContext(QuickViewContext);
};

export const QuickViewProvider = ({ children }) => {
  const [item, setItem] = useState(null);
  const [productLink, setProductLink] = useState(null);
  const handleOnClose = () => {
    setItem(null);
  }
  const viewItem = (product, subpath) => {
    setItem(product);
    setProductLink(`/${subpath}/product/${product?.handle}`);
  }
  return (
    <QuickViewContext.Provider
      value={{viewItem}}
    >
      {children}
      <QuickView data={item} product_link={productLink} onClose={handleOnClose}/>
    </QuickViewContext.Provider>
  );
};
