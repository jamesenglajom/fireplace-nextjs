'use client'
import ProductSection from "@/app/components/pages/product/section/product";
import React, {useState,useEffect} from "react";
import useFetchProduct from "@/app/hooks/useFetchProduct";
export default function Product({params}) {
  const {id} = React.use(params);
  const {product, loading, error} = useFetchProduct({id, include:"images"});
  const handleSortChange = (sort) =>{
    console.log("page sort", sort)

  }
  return (
    <div>
      <ProductSection product={product} loading={loading}/>
    </div>
  );
}
