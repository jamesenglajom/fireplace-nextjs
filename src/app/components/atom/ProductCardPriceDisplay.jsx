"use client";
import { formatPrice } from "@/app/lib/helpers";
import { useState, useEffect } from "react";

function ProductCardPriceDisplay({ product }) {
  if (!product) {
    return;
  }

  useEffect(() => {
    console.log("priceProduct", product);
  });

  if (product?.price > product?.sale_price) {
    return <div className="text-sm flex flex-wrap gap-[5px]">
        <div className="flex gap-[5px]">
            <div className="text-theme-500 font-semibold">${formatPrice(product.sale_price)}</div>
            <div className="line-through text-stone-400">${formatPrice(product.price)}</div>
        </div>
        <div className="text-green-600  font-semibold">Save ${formatPrice(product.price - product.sale_price)}</div>
    </div>
  } else {
    return <div className="text-sm font-semibold">${formatPrice(product.sale_price)}</div>;
  }
}

export default ProductCardPriceDisplay;
