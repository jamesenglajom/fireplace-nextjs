"use client";
import { createContext, useContext, useMemo } from "react";
import { hasCommonValue } from "@/app/lib/helpers";

const CategoriesContext = createContext([]);

export function CategoriesProvider({ categories, children }) {
  /**
   * Recursively flattens a nested category tree into a single-level array.
   *
   * @param {Array} categories - An array of category objects. Each category may contain a `children` array with nested categories.
   * @param {Array} [flatArray=[]] - (Optional) The accumulator array used to collect flattened categories during recursion.
   *
   * @returns {Array} - A flat array containing all categories from the nested structure.
   */
  const flattenCategories = (categories, flatArray = []) => {
    categories.forEach((category) => {
      flatArray.push(category);
      if (category.children && category.children.length > 0) {
        flattenCategories(category.children, flatArray);
      }
    });

    return flatArray;
  };

  /**
   * Determines whether the price of a product should be visible based on its category and brand.
   *
   * @param {Array} product_category - An array of objects representing the product's categories.
   *        Each object is expected to have a `category_name` property.
   * @param {string} product_brand - The brand of the product.
   *
   * @returns {boolean} - Returns `true` if the product belongs to a category or has a brand
   *        that matches any in the globally defined `flatCategories` list with `price_visibility` set to "show";
   *        otherwise, returns `false`.
   */
  const isPriceVisible = (product_category, product_brand) => {
    if (!product_category || !product_brand) {
      return false;
    }

    let visible = false;

    const visible_price_categories = flatCategories
      .filter(({ name }) => !["Home", "Search"].includes(name))
      .filter(({ price_visibility }) => price_visibility === "show");

    const product_category_array = product_category
      .map(({ category_name }) => category_name)
      .filter(Boolean);

    const flat_categories_array = visible_price_categories
      .map(({ key }) => key)
      .filter(Boolean);

    if (hasCommonValue(flat_categories_array, product_category_array)) {
      visible = true;
    }

    if (flat_categories_array.includes(product_brand)) {
      visible = true;
    }

    // hide and show price by custom_page
    const page_pathname = window.location.pathname.replace(/\//g, "");
    const visible_price_categories_urls = flatCategories
      .filter(({ name }) => !["Home", "Search"].includes(name))
      .filter(({ price_visibility }) => price_visibility === "show")
      .map(({url})=> url)
      .filter(Boolean);

    if(visible_price_categories_urls.includes(page_pathname)){
      visible = true;
    }
    
    return visible;
  };

  /**
   * Retrieves a list of valid category names for a given product, excluding "Home" and "Search".
   *
   * @param {Array} product_category - An array of product category objects, each containing a `category_name` property.
   *
   * @returns {Array} - An array of category names from `solana_categories` that match the product's categories
   *                    based on `origin_name`, excluding "Home" and "Search".
   */
  const getProductCategories = (product_category) => {
    if (!product_category) {
      return [];
    }

    const category_scope = solana_categories.filter(
      ({ name }) => !["Home", "Search"].includes(name)
    );

    return category_scope
      .filter((menuItem) =>
        product_category.some(
          (category) => category.category_name === menuItem.origin_name
        )
      )
      .map((menuItem) => menuItem.name);
  };

  const solana_categories = useMemo(() => {
    return categories.map((item) => ({ ...item }));
  }, [categories]);

  const flatCategories = useMemo(() => {
    const _flatCategories = flattenCategories(categories);
    return _flatCategories;
  }, [categories]);

  return (
    <CategoriesContext.Provider
      value={{
        categories,
        solana_categories,
        flatCategories,
        isPriceVisible,
        getProductCategories,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
}

export function useSolanaCategories() {
  return useContext(CategoriesContext);
}
