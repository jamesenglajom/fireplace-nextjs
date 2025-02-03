"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import { Rating } from "@smastrom/react-rating";
import { useState, useEffect } from "react";
import { bc_categories as bccat_json } from "../../lib/category-helpers";
import { getCategoryNameById } from "@/app/lib/helpers";
import OnsaleTag from "@/app/components/atom/SingleProductOnsaleTag";

import { useCart } from "@/app/context/cart";

const ProductToCart = ({ product, loading }) => {
  const {cartItems, addToCart} = useCart();
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [filteredCategoryIds, setFilteredCategoryIds] = useState([]);

  useEffect(() => {
    if (product?.categories.length > 0) {
      let filterCat = [];
      product.categories.forEach((v, i) => {
        const cat_name = getCategoryNameById(v, bccat_json);
        if (
          cat_name !== undefined &&
          !cat_name.toLowerCase().includes("shop all")
        ) {
          filterCat.push(v);
        }
      });
      setFilteredCategoryIds(filterCat);
    }
  }, [product]);

  const handleQuantityChange = (e) => {
    const { value } = e.target;
    setQuantity((prev) => {
      if (value === "") {
        return 0;
      } else {
        return parseInt(value);
      }
    });
  };

  const handleQuantityButtons = (direction) => {
    setQuantity((prev) => {
      let newQuantity = typeof prev === "number" ? prev : 0;
      if (direction === "inc") {
        newQuantity = newQuantity + 1;
      } else if (direction === "dec") {
        if (newQuantity > 0) {
          newQuantity = newQuantity - 1;
        }
      }
      return newQuantity;
    });
  };

  const [productData, setProductData] = useState(product);
  useEffect(() => {
    setProductData(product);
  }, [product]);

  const capitalizeFirstLetter = (string) => {
    if (!string) return ""; // Handle empty or undefined strings
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleHeartToggle = (e) => {
    setProductData((prev) => ({ ...prev, like: !prev.like }));
  };

  const handleAddToCart = (item) => {
      addToCart(item);
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-[15px] w-full">
        <div className="flex gap-[10px]">
          <div className="py-[5px] px-[25px] bg-stone-200 text-stone-600 h-[34px] w-[170px] font-semibold rounded-full"></div>
          <div className="py-[5px] px-[25px] bg-stone-200 text-stone-600 h-[34px] w-[155px] font-semibold rounded-full"></div>
        </div>
        <div className="">
          <div className="font-bold text-4xl flex flex-col gap-[2px]">
            <div className="h-[50px] w-full bg-stone-200"></div>
            <div className="h-[50px] w-[85%] bg-stone-200"></div>
            <div className="h-[50px] w-[60%] bg-stone-200"></div>
            <div className="h-[24px] w-[50%] bg-stone-200"></div>
          </div>
        </div>
        <div className="mt-[100px]">
          <div className="font-bold text-4xl flex gap-[20px]">
            <div className="h-[54px] w-[270px] bg-stone-200 rounded-full"></div>
            <div className="h-[54px] w-[54px] bg-stone-200 rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-[10px] w-full relative">
        <div className="relative">
          {product && <OnsaleTag categories={product?.categories} />}
        </div>
        <div className="">
          <div className="font-bold text-sm md:text-lg">
            {productData?.name}
          </div>
          <div className="text-stone-400 text-xs md:text-sm">
            {productData?.sku}
          </div>
        </div>
        <div className="">
          <div className="text-sm md:text-base">
            Ships Within 1 to 2 Business Days
          </div>
        </div>
        <div className="font-bold text-white">
          <button
            className="flex items-cencer gap-[5px] bg-pallete-green rounded-full py-[5px] px-[20px]"
            onClick={() => handleAddToCart(productData)}>
            <div>
              <Icon
                icon="ph:shopping-cart-simple-bold"
                className="text-[22px]"
              />
            </div>
            <div className="font-bold uppercase text-sm md:text-base">
              add to cart
            </div>
          </button>
        </div>
        <div className="flex items-center">
          <Rating
            value={productData?.reviews_rating_sum}
            style={{ maxWidth: 100 }}></Rating>
          <div>({productData?.reviews_count})</div>
        </div>
        <div className="flex  flex-col md:flex-row md:items-center gap-[10px] md:gap-[25px]">
          <div className="flex items-center font-bold gap-[8px]">
            <div>
              <Icon
                icon="lucide:circle-check-big"
                className={`${
                  productData?.is_free_shipping
                    ? "text-pallete-green"
                    : "text-stone-400"
                }`}
              />
            </div>
            <div
              className={`text-xs md:text-sm ${
                productData?.is_free_shipping
                  ? ""
                  : "line-through text-stone-400"
              }`}>
              <span
                className={`${
                  productData?.is_free_shipping
                    ? "text-pallete-green"
                    : "text-stone-400"
                }`}>
                FREE
              </span>{" "}
              Shipping
            </div>
          </div>
          <div className="flex items-center font-bold gap-[8px]">
            <div>
              <Icon
                icon="lucide:circle-check-big"
                className="text-pallete-green"
              />
            </div>
            <div className="text-xs md:text-sm">Quick Ship Available</div>
          </div>
          <div className="py-[5px] px-[15px] md:py-[6.5px] md:px-[25px] w-fit gap-[5px] flex items-center rounded-full bg-pallete-lightgray">
            <div>
              <Icon
                icon="material-symbols:info-outline"
                className="text-pallete-dark text-[18px]"
              />
            </div>
            <div className="text-xs md:text-sm text-pallete-dark font-semibold">
              Learn More
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductToCart;
