"use client";
import { createContext, useContext, useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { createSlug } from "@/app/lib/helpers";
import Link from "next/link";

const CompareProducts = createContext([]);
const BASE_URL = process.env.NEXT_PUBLIC_SITE_BASE_URL;

export function CompareProductsProvider({ children }) {
  const productsLimit = 4;
  const compareHandleSeparator = "__";
  const compareProductKey = "compare_products";
  const [products, setProducts] = useState([]);
  const [openWidget, setOpenWidget] = useState(false);
  
  const [lForage, setLForage] = useState(null);
  const [compareProductsChannel, setCompareProductsChannel] = useState(null);


  const addProduct = async(product) => {
    const stored_products = (await getProductFromForage()) || [];
    const new_products = [...stored_products, product];
    await lForage.setItem(compareProductKey, new_products);
    setProducts(new_products);
  };

  const removeProduct = async(product) => {
    const stored_products = (await getProductFromForage()) || [];
    const new_products = stored_products.filter(
        ({ variants }) => variants?.[0]?.sku !== product?.variants?.[0]?.sku
      );
    await lForage.setItem(compareProductKey, new_products);
    setProducts(new_products);
  };

  const removeProducts = async() => {
    await lForage.setItem(compareProductKey,[]);
    setProducts([]);
  };

  const getProductFromForage = async() => {
    try{
      return await lForage.getItem(compareProductKey)
    }catch(error){
      console.log(error)
    }
  }

  

  const compareHandle = useMemo(()=>{
    return products.map(({variants})=> variants?.[0]?.sku).join(compareHandleSeparator);
  },[products])

  useEffect(() => {
    if (products.length === 0) {
      setOpenWidget(false);
    }
  }, [products]);

  useEffect(() => {
      if (typeof window !== "undefined") {
        import("@/app/lib/localForage")
          .then((module) => {
            setLForage(module);
            // set initial recent serach value
            setProducts((prev) => {
              const products = module.getItem(compareProductKey);
              if (products) {
                return Array.isArray(products) ? products : [];
              } else {
                return [];
              }
            });
          })
          .catch((error) => {
            console.error("Error loading localForage module:", error);
          });
      }
    }, []);
  
  return (
    <CompareProducts.Provider
      value={{
        products,
        productsLimit,
        compareHandle,
        compareHandleSeparator,
        addProduct,
        removeProduct,
        removeProducts,
        setOpenWidget,
      }}
    >
      {children}
      <div
        className={`${
          openWidget ? "fixed" : "hidden"
        } top-[60px] left-1/2 -translate-x-1/2 rounded bg-white shadow-lg border z-[999] p-2`}
      >
        <div className="relative">
          <button
            onClick={() => setOpenWidget(false)}
            className="absolute top-[-25px] right-[-25px] p-1 h-[25px] w-[25px] bg-neutral-500 text-white border-2 hover:border-white shadow rounded-full flex items-center justify-center text-xs"
            title="Close"
          >
            X
          </button>
          <div className="flex gap-[15px]">
            {Array.from({ length: productsLimit }).map((_, index) => (
              <div
                key={`compare-product-image-box-${index}`}
                className="relative rounded bg-neutral-50 w-[50px] aspect-square overflow-hidden border-neutral-200 border"
              >
                {products.length > 0 && products?.[index] && (
                  <button onClick={()=> removeProduct(products[index])} className="absolute inset-0">
                    <Image
                      src={
                        products[index]?.images?.find(
                          ({ position }) => position === 1
                        )?.src || "/fallback.jpg"
                      }
                      alt={createSlug(products[index]?.title)}
                      title={products[index]?.title}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </button>
                )}
              </div>
            ))}

            <Link
              prefetch={false}
              href={compareHandle ? `${BASE_URL}/compare/${compareHandle}`:"#"}
              className="rounded bg-theme-600 w-[50px] aspect-1 flex items-center justify-center text-white"
              title="Compare Products"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="35"
                viewBox="0 0 20 20"
              >
                <path
                  fill="currentColor"
                  d="M12.146 3.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L14.293 7H4.5a.5.5 0 0 1 0-1h9.793l-2.147-2.146a.5.5 0 0 1 0-.708m-4.292 7a.5.5 0 0 1 0 .708L5.707 13H15.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 0 1 .708 0"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </CompareProducts.Provider>
  );
}

export function useCompareProducts() {
  return useContext(CompareProducts);
}
