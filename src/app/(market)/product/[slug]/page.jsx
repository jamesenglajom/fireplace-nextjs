"use client";
import ProductSection from "@/app/components/pages/product/section/product";
import React, { useState, useEffect } from "react";
// import useFetchProducts from "@/app/hooks/useFetchProducts";
import useESFetchProduct from "@/app/hooks/useESFetchProduct";
import useESFetchProductShopify from "@/app/hooks/useESFetchProductShopify";
import { notFound } from "next/navigation";
import ProductPlaceholder from "@/app/components/atom/SingleProductPlaceholder";

const shopify_structure = true;
import MediaGallery from "@/app/components/widget/MediaGalleryV2";
import ProductToCart from "@/app/components/widget/ProductToCartV2";
import ProductMetaTabs from "@/app/components/product/meta/Tabs";


export default function Product({ params }) {
  const { slug } = React.use(params);
  const [product, setProduct] = useState(null);
  const {
    product: fetchedProduct,
    loading,
    error,
  } = shopify_structure
    ? useESFetchProductShopify({
        handle: slug,
      })
    : useESFetchProduct({
        product_url: slug,
      });

  useEffect(() => {
    if (error) {
      notFound();
    }

    if (!loading && fetchedProduct === null) {
      notFound();
    }

    if (fetchedProduct && fetchedProduct.length > 0) {
      setProduct(fetchedProduct[0]);
    }
  }, [loading, fetchedProduct, error]);

  if (!product && loading) {
    return <ProductPlaceholder />;
  }

  const CategoryChips = ({categories}) => {
    return (
      <div className="flex gap-[5px] flex-wrap">
        {categories &&
          categories.length > 0 &&
          categories.map((v, i) => (
            <div
              key={`category-tag-${v.id}`}
              className="text-[9px] py-[4px] px-[8px] bg-theme-200 text-theme-700 font-semibold rounded-full"
            >
              {v.category_name}
            </div>
          ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      {shopify_structure ? (
        <div className="min-h-screen">
          {/* {product && <JsonViewer product={product} loading={loading} />} */}
          <div className="p-2 bg-theme-300">
            <div className="container max-w-7xl px-[0px] sm:px-[20px] mx-auto flex flex-col gap-[10px]">
              <div className="uppercase font-bold">
                {/* <BackButton /> */}
                {/* <BreadCrumbs product={product} /> */}
                Component BreadCrumbs Need Update
              </div>
            </div>
          </div>
          <div className="p-4">
            <div className="container max-w-7xl px-[0px] sm:px-[20px] mx-auto flex flex-col lg:flex-row gap-[0px] lg:gap-[40px] py-[20px]">
              <div className="w-full relative">
                <MediaGallery mediaItems={product?.images} />
              </div>
              <div className="w-full">
                <ProductToCart product={product} loading={loading} />
                <div className="py-[30px] flex flex-col gap-[15px]">
                  {/* product options */}
                  {/* commented code because property metafield was changed */}
                  {/* {productOptions && productOptions.length > 0 && (
                <div className="flex flex-col gap-[15px]">
                  <div className="font-bold text-sm lg:text-lg">Options</div>
                  <div className="border">
                    {productOptions.map((item, idx) => (
                      <div
                        key={`product-option-${idx}`}
                        className="flex flex-col gap-[10px]"
                      >
                        <div className="font-medium text-xs lg:text-sm px-4 py-1 bg-stone-300 text-black">
                          {item.option}
                        </div>
                        <div className="flex items-center gap-[10px] p-1 pb-3">
                          {item?.values &&
                            item.values.map((item2, idx2) => (
                              <Link
                                key={`product-option-${idx}-value-${idx2}`}
                                href={`${BASE_URL}/product/${item2.sku.link}`}
                              >
                                <ProductOption option={item2} />
                              </Link>
                            ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )} */}
                  {/* Category */}
                  <div>
                    <div className="font-bold text-sm lg:text-lg mb-[15px]">
                      Category
                    </div>
                    <CategoryChips categories={product?.product_category} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4">
            <div className="container max-w-7xl px-[0px] sm:px-[20px] mx-auto">
              <ProductMetaTabs product={product} />
            </div>
          </div>
        </div>
      ) : (
        <ProductSection product={product} loading={loading} />
      )}
    </div>
  );
}
