'use client'
import HeroCarousel from './components/widget/HeroCarousel';
import ProductShopNowList from './components/product/list/ShopNow';
import ProductsSection from './components/section/Products';
import TuiHero from "./components/template/tui_hero"
import { useState, useEffect } from "react";

export default function Home() {
  const slides = [
    {
      position: "justify-left px-[50px]",
      background:"/images/carousel/c4c63680-0b5b-4011-8ec8-8de26c0455ed.webp",
      headline: {
        text: "Headline One",
        twClass: "text-2xl sm:text-5xl"
      },
      subheadline: {
        text:"Subheadline: Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi quasi id voluptate aperiam quae ex, soluta quod perspiciatis fuga magnam.",
        twClass:"text-[14px] sm:text-[18px] max-w-[500px]"
      },
      cta: {
        href: "/",
        label: "Shop for a Fireplace",
        twClass:"text-[14px] sm:text-[18px] text-white bg-pallete-orange px-[30px] py-[10px] rounded-full",
        position: "flex w-full"
      }
    },
    
    {
      position: "justify-center px-[50px]",
      background:"/images/carousel/2.jpg",
      headline: {
        text: "Headline Two",
        twClass: "text-2xl sm:text-5xl text-center"
      },
      subheadline: {
        text:"Subheadline: Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi quasi id voluptate aperiam quae ex, soluta quod perspiciatis fuga magnam.",
        twClass:"text-[14px] sm:text-[18px] max-w-[500px] text-center"
      },
      cta: {
        href: "/",
        label: "Shop for a Fireplace",
        twClass:"text-[14px] sm:text-[18px]  text-white bg-pallete-orange px-[30px] py-[10px] rounded-full",
        position: "flex justify-center w-full"
      }
    },
    
    {
      position: "justify-end px-[50px]",
      background:"/images/carousel/3.jpg",
      headline: {
        text: "Headline Three",
        twClass: "text-2xl sm:text-5xl font-bold text-white text-right"
      },
      subheadline: {
        text:"Subheadline: Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi quasi id voluptate aperiam quae ex, soluta quod perspiciatis fuga magnam.",
        twClass:"text-[14px] sm:text-[18px]  max-w-[500px] text-right"
      },
      cta: {
        href: "/",
        label: "Shop for a Fireplace",
        twClass:"text-[14px] sm:text-[18px]  text-white bg-pallete-orange px-[30px] py-[10px] rounded-full",
        position: "flex justify-end w-full"
      }
    }
  ]

  return (
    <div>
      {/* <HeroCarousel slides={slides}/> */}
      <TuiHero/>
      {/* <ProductShopNowList /> */}
      <ProductsSection />
    </div>
  );
}

