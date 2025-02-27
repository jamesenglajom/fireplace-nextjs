'use client'
import TuiHero from "@/app/components/template/tui_hero";
import ProductsSection from "@/app/components/section/Products";
import { getPageData } from "@/app/lib/helpers";
import { flatCategories } from "@/app/lib/category-helpers";
import { notFound } from "next/navigation";
import MobileLoader from "@/app/components/molecule/MobileLoader";

import * as React from 'react'
import {useState, useEffect} from "react";

export default function GenericCategoryPage({ params }) {
  const {slug} = React.use(params);
  const [pageData, setPageData] = useState(null);
  useEffect(()=>{
    setPageData(getPageData(slug, flatCategories))
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
