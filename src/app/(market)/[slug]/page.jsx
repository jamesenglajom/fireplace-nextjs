'use client'
import TuiHero from "@/app/components/template/tui_hero";
import ProductsSection from "@/app/components/section/Products";
import { getPageData } from "@/app/lib/helpers";
// import { flatCategories } from "@/app/lib/category-helpers";
import { notFound } from "next/navigation";
import MobileLoader from "@/app/components/molecule/MobileLoader";
import { keys, redisGet } from "@/app/lib/redis";
import * as React from 'react'
import {useState, useEffect} from "react";

const defaultMenuKey = keys.default_menu.value;
export default function GenericCategoryPage({ params }) {
  const {slug} = React.use(params);
  const [pageData, setPageData] = useState(null);
  
  const getMenu = async() => {
    return await redisGet(defaultMenuKey);
  }

  useEffect(()=>{
    getMenu().then(data=> {
      console.log("getMENU", data);
      const flatCategories = [
        ...data.map(({ menu, links = [], ...rest }) => ({
          ...rest,
          url: menu.href,
          children: links.flat(), // Ensures `links` exists
        })),
        ...data.flatMap(({ links = [] }) => links), // Defaults to `[]` if `links` is undefined
        ...data.flatMap(({ links = [] }) =>
          links.flatMap(({ children = [] }) => children) // Ensures `children` exists
        ),
      ];
      setPageData(getPageData(slug, flatCategories))
    })
  },[slug]);

  if (pageData === undefined) {
    notFound();
  }else{
    return (
      <div className="min-h-screen">
        <MobileLoader />
        <TuiHero data={pageData} />
        <ProductsSection
          category={slug}
        />
      </div>
    );
  }
}
