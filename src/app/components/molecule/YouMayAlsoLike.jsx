import { useState, useEffect } from "react";
import { solana_categories } from "@/app/lib/category-helpers";
import useFetchProducts from "@/app/hooks/useFetchProducts";
import ProductCard from "@/app/components/atom/ProductCard";
import ProductCardLoader from "@/app/components/atom/ProductCardLoader";

export default function YouMayAlsoLike() {
  const category_ids = solana_categories
    .map(({ category_id }) => category_id)
    .filter((i) => i !== undefined);
  const getRandomNumber = (N) => Math.floor(Math.random() * N) + 1;
  const pickPage = getRandomNumber(100);
  const { products, loading } = useFetchProducts({
    include: "images",
    limit: 3,
    page: pickPage,
    "categories:in": 167,
    sort: "date_modified",
    direction: "desc",
  });
  useEffect(() => {
    // console.log("fromYouMayAlsoLike:", products);
    // console.log("fromYouMayAlsoLike:solana_categories", solana_categories);
    // console.log("fromYouMayAlsoLike:category_ids", category_ids);
  }, [products]);
  return (
    <div className="hidden xl:mt-8 xl:block">
      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
        You May Also Like
      </h3>
      <div className="mt-6 grid grid-cols-3 gap-4 sm:mt-8">
        {loading
          ? [0, 0, 0, 0].map((item, idx) => (
              <div key={`product-placeholder-${idx}`} className="space-y-6 overflow-hidden">
                <ProductCardLoader />
              </div>
            ))
          : products.map((item, idx) => (
              <div key={`product-card-${idx}`}  className="space-y-6 overflow-hidden">
                <ProductCard product={item}/>
              </div>
            ))}
      </div>
    </div>
  );
}
