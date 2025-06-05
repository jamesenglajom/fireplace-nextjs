"use client";
import { useState, useEffect, useMemo } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Rating } from "@smastrom/react-rating";
import { ICRoundPhone } from "@/app/components/icons/lib";
import { useSolanaCategories } from "@/app/context/category";
import FicDropDown from "@/app/components/atom/FicDropDown";
import Link from "next/link";
import { useQuickView } from "@/app/context/quickview";
import { formatPrice } from "@/app/lib/helpers";

import {
  InstantSearch,
  useInstantSearch,
  SearchBox,
  Hits,
  Highlight,
  RefinementList,
  Pagination,
  Stats,
  Snippet,
  CurrentRefinements,
  HierarchicalMenu,
  Configure,
  DynamicWidgets,
  RangeInput,
  useQueryRules,
  SortBy,
} from "react-instantsearch";
import Client from "@searchkit/instantsearch-client";

// const es_index = "bigcommerce_products_3";
const es_index = "solana_products";

const searchClient = Client({
  url: `/api/es/searchkit/`,
});

const Panel = ({ header, children }) => (
  <div className="panel">
    <h5 className="my-3 uppercase font-semibold">{header}</h5>
    {children}
  </div>
);

const QueryRulesBanner = () => {
  const { items } = useQueryRules({});
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="query-rules">
      {items.map((item) => (
        <div key={item.objectID} className="query-rules__item">
          <a href={item.url}>
            <b className="query-rules__item-title">{item.title}</b>
            <span className="query-rules__item-description">{item.body}</span>
          </a>
        </div>
      ))}
    </div>
  );
};

const JsonViewer = ({ hit }) => {
  return (
    <pre
      style={{
        background: "#f5f5f5",
        padding: "1rem",
        borderRadius: "8px",
        overflowX: "auto",
      }}
    >
      {JSON.stringify(hit, null, 2)}
    </pre>
  );
};

const ProductCardPriceDisplay = ({ price_details }) => {
  if (!price_details) {
    return;
  }
  if (
    price_details?.price > 0 &&
    price_details?.compare_at_price > price_details?.price
  ) {
    return (
      <div className="text-sm flex flex-wrap gap-[5px]">
        <div className="flex gap-[5px]">
          <div className="font-semibold">
            ${formatPrice(price_details.price)}
          </div>
          <div className="line-through text-stone-400">
            ${formatPrice(price_details.compare_at_price)}
          </div>
        </div>
        <div className="text-green-600  font-semibold">
          Save $
          {formatPrice(price_details.compare_at_price - price_details.price)}
        </div>
      </div>
    );
  } else {
    return (
      <div className="text-sm font-semibold">
        ${formatPrice(price_details.price)}
      </div>
    );
  }
};

const SPProductCard = ({ hit, category }) => {
  const { viewItem } = useQuickView();
  const { price_hidden_categories } = useSolanaCategories();

  const handleQuickViewClick = (e, item) => {
    e.stopPropagation();
    e.preventDefault();
    viewItem(item, category);
  };

  return (
    <Link
      prefetch={false}
      href={`/${category}/product/${hit.handle}`}
      // onClick={handleProductItemClick}
      className="flex w-full h-full bg-white overflow-hidden rounded-md border duration-500  hover:shadow-xl pb-[8px] hover:border-stone-700 group"
    >
      <div className="w-full">
        <div
          className={`w-full flex items-center justify-center h-[230px] overflow-hidden relative bg-white`}
        >
          {hit?.images &&
            Array.isArray(hit?.images) &&
            hit?.images?.length > 0 &&
            hit.images[0]?.src && (
              <img
                src={hit.images[0].src}
                alt={hit.images[0].alt}
                className={`object-contain h-full opacity-100`}
              />
            )}

          {hit?.variants &&
            Array.isArray(hit.variants) &&
            hit.variants.length > 0 &&
            hit.variants?.[0]?.price < hit.variants?.[0]?.compare_at_price && (
              <div className="absolute bottom-[60px] left-0 rounded-r-full bg-theme-500 text-white text-[12px] font-bold py-[7px] px-[15px]">
                ONSALE
              </div>
            )}
          <div
            onClick={(e) => handleQuickViewClick(e, hit)}
            className="absolute bottom-0 left-0 bg-theme-500 text-white text-[12px] py-[5px] md:py-[7px] md:px-[15px] flex items-center w-full justify-center gap-[5px] invisible group-hover:visible"
          >
            <div className="flex justify-center">
              <div className="font-semibold text-[0.775rem] inline-block text-center">
                <Icon
                  icon="mi:shopping-cart-add"
                  className="text-lg font-thin inline-block mr-[5px]"
                />
                {/* CUSTOMIZE TO PURCHASE */}
                QUICK VIEW
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col px-[15px] pt-[5px] border-t">
          <div
            className="text-sm line-clamp-2 font-semibold text-stone-700"
            title={hit.title}
          >
            {hit.title}
          </div>
          <div className={`flex items-center gap-[5px]`}>
            <Rating
              readOnly
              value={hit.ratings.rating_count}
              fractions={2}
              style={{ maxWidth: 100 }}
            ></Rating>
            <div className={`text-[0.75rem]`}>
              ({hit.ratings.rating_count}){/* (id:{product.id}) */}
            </div>
          </div>
          <div className="mt-3">{hit.brand}</div>
          <div className="mt-3">
            {price_hidden_categories.some((name) =>
              hit?.product_category.some(
                ({ category_name }) => category_name === name
              )
            ) ? (
              <div className="font-medium text-[14px] text-stone-700">
                Contact us for pricing.
              </div>
            ) : (
              <ProductCardPriceDisplay price_details={hit?.variants?.[0]} />
            )}
          </div>
          <FicDropDown>
            <div className="text-xs my-[5px] text-blue-500 flex items-center cursor-default gap-[7px] flex-wrap">
              {price_hidden_categories.some((name) =>
                hit?.product_category.some(
                  ({ category_name }) => category_name === name
                )
              ) ? (
                <>Call for Price </>
              ) : (
                <>Found It Cheaper? </>
              )}
              <div className="hover:underline flex items-center gap-[3px] cursor-pointer">
                <ICRoundPhone width={16} height={16} />{" "}
                <div>(888) 575-9720</div>
              </div>
            </div>
          </FicDropDown>
        </div>
      </div>
    </Link>
  );
};

const InnerUI = ({ category, page_details, onDataLoaded }) => {
  const { status } = useInstantSearch();
  const [loadHint, setLoadHint] = useState("");
  const [firstLoad, setFirstLoad] = useState(true);
  useEffect(() => {
    setLoadHint((prev) => {
      let result = prev;
      if (prev === "" && status === "loading") {
        result = "loading";
      }
      if (prev === "loading" && status === "idle") {
        result = "loading-idle";
      }
      console.log("loadinghint: ", result);
      return result;
    });
  }, [status]);

  useEffect(() => {
    const result = ["loading"].includes(loadHint);
    setFirstLoad((prev) => {
      return result;
    });
    onDataLoaded(result);
  }, [loadHint]);
  // const firstLoad = useMemo(() => {
  //   return ["loading"].includes(loadHint);
  // }, [loadHint]);

  if (!firstLoad) {
    return (
      <div className="container">
        <div className="flex items-center justify-between mb-5">
          <h1 className="uppercase text-lg font-bold">{page_details?.name}</h1>
          <SortBy
            items={[
              { label: "Most Popular", value: "popular" },
              { label: "Newest", value: "newest" },
              { label: "Price: Low to High", value: "_price_asc" },
              { label: "Price: High to Low", value: "_price_desc" },
            ]}
          />
        </div>
        <div className="search-panel flex pb-[50px]">
          <div className="search-panel__filters  pfd-filter-section">
            {/* <FilterWrapper page_details={page_details} /> */}
            {
              page_details && page_details?.nav_type === "category" && 
              <DynamicWidgets facets={["*"]}>
                <div className="my-5 facet_brand">
                  <Panel header="brand">
                    <RefinementList attribute="brand" searchable />
                  </Panel>
                </div>
                <div className="my-5">
                  <Panel header="price">
                    <RangeInput attribute="price" />
                  </Panel>
                </div>
              </DynamicWidgets>
            }

             {
              page_details && page_details?.nav_type === "brand" && 
              <DynamicWidgets facets={["*"]}>
                <div className="my-5">
                  <Panel header="Categories">
                    <RefinementList attribute="product_category" searchable />
                  </Panel>
                </div>
                <div className="my-5">
                  <Panel header="price">
                    <RangeInput attribute="price" />
                  </Panel>
                </div>
              </DynamicWidgets>
            }

            {
              page_details && page_details?.nav_type === "custom_page" && 
              <DynamicWidgets facets={["*"]}>
                <div className="my-5">
                  <Panel header="Categories">
                    <RefinementList attribute="product_category" searchable />
                  </Panel>
                </div>
                <div className="my-5 facet_brand">
                  <Panel header="brand">
                    <RefinementList attribute="brand" searchable />
                  </Panel>
                </div>
                <div className="my-5">
                  <Panel header="price">
                    <RangeInput attribute="price" />
                  </Panel>
                </div>
              </DynamicWidgets>
            }
            </div>
          <div className="search-panel__results pfd-product-section">
            <CurrentRefinements />
            <QueryRulesBanner />

            <Hits
              hitComponent={(props) => (
                <SPProductCard {...props} category={category} />
              )}
            />
            <Pagination />
          </div>
        </div>
      </div>
    );
  }
};

// desktop skeleton loader
const SkeletonLoader = () => {
  return (
    <div className="container">
      <div className="flex items-center justify-between mb-5">
        <div className="h-[28px] w-[150px] rounded bg-gradient-to-r from-neutral-200 via-neutral-300 to-neutral-200 bg-[length:200%_100%] animate-pulse"></div>
        <div className="h-[28px] w-[200px] rounded  bg-gradient-to-r from-neutral-200 via-neutral-300 to-neutral-200 bg-[length:200%_100%] animate-pulse"></div>
      </div>
      <div className="search-panel flex pb-[50px]">
        <div className="search-panel__filters  pfd-filter-section pr-[10px]">
          <div className="my-5">
            <div className="my-3 h-[23px] w-[130px] rounded bg-gradient-to-r from-neutral-200 via-neutral-300 to-neutral-200 bg-[length:200%_100%] animate-pulse"></div>
            <div className="h-[35px] w-full rounded bg-gradient-to-r from-neutral-200 via-neutral-300 to-neutral-200 bg-[length:200%_100%] animate-pulse"></div>
            <div className="mt-[3px]">
              <ul className="flex flex-col gap-[2px]">
                {Array.from({ length: 6 }).map((_, index) => (
                  <li
                    key={`checkbox-loader-list-${index}`}
                    className="border-b border-neutral-200 w-full h-[25px] flex items-center"
                  >
                    <div className="w-[16px] h-[16px] bg-neutral-200"></div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="my-3 h-[23px] w-[130px] bg-neutral-200 rounded  bg-gradient-to-r from-neutral-200 via-neutral-300 to-neutral-200 bg-[length:200%_100%] animate-pulse"></div>
            <div className="flex justify-between">
              <div className="h-[23px] w-[75px] bg-neutral-200 rounded bg-gradient-to-r from-neutral-200 via-neutral-300 to-neutral-200 bg-[length:200%_100%] animate-pulse"></div>
              <div className="h-[23px] w-[75px] bg-neutral-200 rounded bg-gradient-to-r from-neutral-200 via-neutral-300 to-neutral-200 bg-[length:200%_100%] animate-pulse"></div>
              <div className="h-[23px] w-[30px] bg-neutral-200 rounded bg-gradient-to-r from-neutral-200 via-neutral-300 to-neutral-200 bg-[length:200%_100%] animate-pulse"></div>
            </div>
          </div>
        </div>
        <div className="search-panel__results pfd-product-section">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: 15 }).map((_, index) => (
              <div
                key={`product-loader-card-${index}`}
                className="bg-neutral-100 w-full h-[400px] rounded"
              />
            ))}
          </div>
          <div className="flex gap-[20px] mt-[20px]">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={`pagination-loader-btn-${index}`}
                className="bg-neutral-200 w-[40px] h-[30px] rounded bg-gradient-to-r from-neutral-200 via-neutral-300 to-neutral-200 bg-[length:200%_100%] animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

function ProductsSection({ category }) {
  const { flatCategories } = useSolanaCategories();
  const [pageDetails, setPageDetails] = useState(null);
  const [firstLoad, setFirstLoad] = useState(true);
  const [filterString, setFilterString] = useState("");

  useEffect(() => {
    if (category) {
      console.log("flatCategories", flatCategories);
      const details = flatCategories.find(({ url }) => url === category);
      console.log("details", details);
      if (details) {
        setPageDetails(details);
        setFilterString(prev=>{
          let result="";
          if(details?.nav_type==="category"){
            setFilterString(`page_category:${details?.origin_name}`);
          }else if(details?.nav_type==="brand"){
            setFilterString(`page_brand:${details?.origin_name}`);
          }else if(details?.nav_type==="custom_page"){
            setFilterString(`custom_page:${details?.origin_name}`);
          }
        });
      } else {
        setPageDetails(null);
        setFilterString("");
      }
    }
  }, [category, flatCategories]);

  return (
    <>
      <div className={`container mx-auto ${firstLoad ? "":"hidden"}`}>
        <div className="mt-5">
          <SkeletonLoader />
        </div>
      </div>
      <div className="container mx-auto">
        <div className="mt-5">
          <InstantSearch
            indexName={es_index}
            searchClient={searchClient}
            future={{ preserveSharedStateOnUnmount: false }}
          >
            {filterString ? (
              <Configure
                hitsPerPage={15}
                filter={filterString}
              />
            ) : (
              <Configure hitsPerPage={15} />
            )}
            <InnerUI
              category={category}
              page_details={pageDetails}
              onDataLoaded={setFirstLoad}
            />
          </InstantSearch>
        </div>
      </div>
    </>
  );
}

export default ProductsSection;
