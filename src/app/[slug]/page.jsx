// 'use client'
import TuiHero from "../components/template/tui_hero";
import ProductsSection from "../components/section/Products";
import { getPageData } from "../lib/helpers";
import { flatCategories } from "../lib/category-helpers";
import { notFound } from "next/navigation";
import MobileLoader from "../components/molecule/MobileLoader";
// import { useState,useEffect } from "react";
export default async function GenericCategoryPage({ params }) {
  // const [slug, setSlug] = useState(null);
  const slug = (await params)?.slug;
  // const getSlug = async(params) =>{
  //   const slug = (await params)?.slug;
  //   setSlug(slug)
  // }
  
  // useEffect(()=>{
  //   getSlug(params);
  // },[params])
  const page_data = getPageData(slug, flatCategories);
  if (page_data === undefined) {
    notFound();
  }
  return (
    <div>
      <MobileLoader />
      <TuiHero data={page_data} />
      <ProductsSection
        // category={main_cat_array.includes(slug) ? slug : "all-products"}
        category={slug}
      />
    </div>
  );
}
