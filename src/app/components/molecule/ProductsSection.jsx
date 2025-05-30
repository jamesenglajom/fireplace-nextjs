"use client";
import { useState, useEffect } from "react";
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
  if (price_details?.price > 0 && price_details?.compare_at_price > price_details?.price) {
    return <div className="text-sm flex flex-wrap gap-[5px]">
        <div className="flex gap-[5px]">
            <div className="text-theme-500 font-semibold">${formatPrice(price_details.price)}</div>
            <div className="line-through text-stone-400">${formatPrice(price_details.compare_at_price)}</div>
        </div>
        <div className="text-green-600  font-semibold">Save ${formatPrice(price_details.compare_at_price - price_details.price)}</div>
    </div>
  } else {
    return <div className="text-sm font-semibold">${formatPrice(price_details.price)}</div>;
  }
}

const SPProductCard = ({ hit }) => {
  const { viewItem } = useQuickView();
  const { price_hidden_categories } = useSolanaCategories();

  const handleQuickViewClick = (e, item) => {
    e.stopPropagation();
    e.preventDefault();
    viewItem(item);
  };

  return (
    <Link
      prefetch={false}
      href={`/product/${hit.handle}`}
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

            
          {
            hit?.variants && Array.isArray(hit.variants) && hit.variants.length > 0 && hit.variants?.[0]?.price < hit.variants?.[0]?.compare_at_price &&   
            <div className="absolute bottom-[60px] left-0 rounded-r-full bg-theme-500 text-white text-[12px] font-bold py-[7px] px-[15px]">
              ONSALE
            </div>
          }
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
                hit?.product_category.some(({category_name}) => category_name === name)
              ) ? (
                <>Call for Price </>
              ) : (
                <>Found It Cheaper? </>
              )}
            <div
              className="hover:underline flex items-center gap-[3px] cursor-pointer"
            >
              <ICRoundPhone width={16} height={16} /> <div>(888) 575-9720</div>
            </div>
          </div>
          </FicDropDown>
        </div>
      </div>
    </Link>
  );
};

function ProductsSection({ category }) {
  const { solana_categories } = useSolanaCategories();
  const [pageDetails, setPageDetails] = useState(null);

  useEffect(() => {
    if (category) {
      const details = solana_categories.find(({ url }) => url === category);
      if (details) {
        setPageDetails(details);
      } else {
        setPageDetails(null);
      }
    }
  }, [category, solana_categories]);

  return (
    <div className="container mx-auto">
      <div className="mt-5">
        <InstantSearch indexName={es_index} searchClient={searchClient} routing>
          {pageDetails ? (
            <Configure
              hitsPerPage={15}
              filter={`page_category:${pageDetails?.origin_name}`}
            />
          ) : (
            <Configure hitsPerPage={15} />
          )}
          <div className="container">
            <div className="flex items-center justify-between mb-5">
              <h1 className="uppercase text-lg font-bold">
                {pageDetails?.name}
              </h1>
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
                {!pageDetails ? (
                  <DynamicWidgets facets={["*"]}>
                    <div className="my-5">
                      <Panel header="Categories">
                        <RefinementList
                          attribute="product_category"
                          searchable
                        />
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
                ) : (
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
                )}
              </div>
              <div className="search-panel__results pfd-product-section">
                {/* <div className="searchbox">
                  <SearchBox />
                </div> */}

                {/* <Stats /> */}
                <CurrentRefinements />
                <QueryRulesBanner />

                <Hits hitComponent={SPProductCard} />
                <Pagination />
              </div>
            </div>
          </div>
        </InstantSearch>
      </div>
    </div>
  );
}

export default ProductsSection;
