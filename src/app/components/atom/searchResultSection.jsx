"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
const BASE_URL = process.env.NEXT_PUBLIC_SITE_BASE_URL;

import { useSearch } from "@/app/context/search";

function SearchResultSection({ section, onOptionSelect }) {
  const router = useRouter();
  const { setSearch } = useSearch();
  const [sectionData, setSectionData] = useState([]);
  const [expanded, setExpanded] = useState(false);

  const handleSetSearch = (query) => {
    setSearch(query);
  };

  useEffect(() => {
    console.log("sectionComponennt:", section);
    if (section) {
      setSectionData(
        expanded ? section.data.slice(0, 10) : section.data.slice(0, 3)
      );
    }
  }, [section, expanded]);

  const handleOptionClick = (e) => {
    e.preventDefault();
    const { href } = e.target;
    onOptionSelect();
    router.push(href);
  };

  if (sectionData.length > 0) {
    return (
      <div>
        <div className="bg-stone-200 font-bold text-sm py-1 px-3">
          {section.label}
        </div>
        <div>
          {section.prop === "recent" &&
            sectionData.map((recent, index) => (
              <div
                key={`recent-search-${index}`}
                className="group hover:bg-stone-50 px-2 py-[5px]"
                onClick={() => handleSetSearch(recent)}
              >
                <div className="text-[14px] group-hover:text-orange-600">
                  {recent}
                </div>
              </div>
            ))}

          {section.prop === "product" &&
            sectionData.map((product, index) => (
              <Link
                prefetch={false}
                onClick={handleOptionClick}
                key={`product-result-${product.custom_url.url}`}
                href={`${BASE_URL}/product${product.custom_url.url}`}
              >
                <div className="flex items-center group hover:bg-stone-50 px-2 py-[5px]">
                  <div className="w-[75px] h-[75px] overflow-hidden bg-white mr-[10px] flex items-center rounded relative">
                    {product?.images &&
                      product.images.find(
                        ({ is_thumbnail }) => is_thumbnail
                      ) && (
                        <Image
                          src={
                            product.images.find(
                              ({ is_thumbnail }) => is_thumbnail
                            )?.url_thumbnail
                          }
                          alt={`product:${product.name}`}
                          className="object-contain w-full"
                          fill
                        />
                      )}
                  </div>
                  <div className="w-full">
                    <div className="text-[14px] group-hover:text-orange-600">
                      {product.name}
                    </div>
                    <div className="text-[10px] text-gray-500 font-normal">
                      {section.label}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          {section.prop === "category" &&
            sectionData.map((category, index) => (
              <Link
                prefetch={false}
                onClick={handleOptionClick}
                key={`cat-result-${category.url}`}
                href={`${BASE_URL}/${category.url}`}
              >
                <div className="group hover:bg-stone-200 px-2 py-[5px]">
                  <div className="text-[14px] group-hover:text-orange-600">
                    {category.name}
                  </div>
                  <div className="text-[10px] text-gray-500 font-normal">
                    {section.label}
                  </div>
                </div>
              </Link>
            ))}
          {section.prop === "brand" &&
            sectionData.map((brand, index) => (
              <Link
                prefetch={false}
                onClick={handleOptionClick}
                key={`brand-result-${brand.url}`}
                href={`${BASE_URL}/${brand.url}`}
              >
                <div className="w-full group hover:bg-stone-200 px-2 py-[5px]">
                  <div className="text-[14px] group-hover:text-orange-600">
                    {brand.name}
                  </div>
                  <div className="text-[10px] text-gray-500 font-normal">
                    {section.label}
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    );
  }
}

export default SearchResultSection;
