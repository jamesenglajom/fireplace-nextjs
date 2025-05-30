"use client";
import ProductSection from "@/app/components/pages/product/section/product";
import React, { useState, useEffect } from "react";
// import useFetchProducts from "@/app/hooks/useFetchProducts";
import useESFetchProductShopify from "@/app/hooks/useESFetchProductShopify";
import { notFound } from "next/navigation";
import ProductPlaceholder from "@/app/components/atom/SingleProductPlaceholder";
import MediaGallery from "@/app/components/widget/MediaGalleryV2";
export default function ShopifySolanaProduct({ params }) {
  const { slug } = React.use(params);

  const [product, setProduct] = useState(null);
  const {
    product: fetchedProduct,
    loading,
    error,
  } = useESFetchProductShopify({
    handle: slug,
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
  const JsonViewer = ({ product }) => {
    return (
      <pre
        style={{
          background: "#f5f5f5",
          padding: "1rem",
          borderRadius: "8px",
          overflowX: "auto",
        }}
      >
        {JSON.stringify(product, null, 2)}
      </pre>
    );
  };


  return (
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
        </div>
      </div>
    </div>
  );
}
