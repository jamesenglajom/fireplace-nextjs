import { useState, useEffect } from "react";
import ProductCard from "@/app/components/atom/ProductCard";
import ProductCardLoader from "@/app/components/atom/ProductCardLoader";

export default function YouMayAlsoLike({ displayItems }) {
  const [products, setProducts] = useState([]);

  const makeArray = (n) => {
    return Array.from({ length: n }, (_, i) => i);
  };

  useEffect(() => {
    const fetchRandomProducts = async () => {
      try {
        const seed = Date.now();
        const query = {
          size: 4,
          query: {
            function_score: {
              query: {
                match_all: {},
              },
              random_score: {
                seed: seed,
                field: "title.keyword"
              },
            },
          },
        };

        const res = await fetch("/api/es/shopify/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(query),
        });

        const data = await res.json();

        if (data?.error) {
          setProducts([]);
          throw new Error(`[SHOPIFY SEARCH] Failed`);
        }

        setProducts(data?.hits?.hits?.map(({ _source }) => _source));
      } catch (err) {
        console.error(err);
      }
    };

    fetchRandomProducts();
  }, []);

  return (
    <div className="xl:mt-8">
      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
        You May Also Like
      </h3>
      <div className={`mt-6 gap-4 sm:mt-8 flex flex-wrap`}>
        {products.length === 0
          ? makeArray(displayItems ?? 3).map((item, idx) => (
              <div
                key={`product-card-${idx}`}
                className={`space-y-6 overflow-hidden ${
                  displayItems === 4 &&
                  "w-[calc(50%-10px)] md:w-[calc(33%-10px)] lg:w-[calc(25%-12px)]"
                } ${
                  (displayItems === undefined || displayItems === 3) &&
                  "w-[calc(50%-10px)] lg:w-[calc(33%-10px)]"
                }`}
              >
                <ProductCardLoader />
              </div>
            ))
          : products.map((item, idx) => (
              <div
                key={`product-card-wrapper-${idx}`}
                className={`space-y-6 overflow-hidden ${
                  displayItems === 4 &&
                  "w-[calc(50%-10px)] md:w-[calc(33%-10px)] lg:w-[calc(25%-12px)]"
                } ${
                  (displayItems === undefined || displayItems === 3) &&
                  "w-[calc(50%-10px)] lg:w-[calc(33%-10px)]"
                }`}
              >
                <ProductCard key={`product-card-${idx}`} hit={item} />
              </div>
            ))}
      </div>
    </div>
  );
}
