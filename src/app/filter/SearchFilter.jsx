"use client";

import ProductCard from "@/app/components/atom/ProductCardV2";
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
} from "react-instantsearch";
import Client from "@searchkit/instantsearch-client";

const searchClient = Client({
  url: "/api/es/searchkit",
});

const Panel = ({ header, children }) => (
  <div className="panel">
    <h5 className="my-3">{header}</h5>
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

export default function Web() {
  return (
    <div className="">
      <InstantSearch
        indexName="bigcommerce_products_3"
        searchClient={searchClient}
        routing
      >
        <Configure hitsPerPage={15} filters="category_page:148"/>
        <div className="container">
          <div className="search-panel flex">
            <div className="search-panel__filters  pfd-filter-section">
              <DynamicWidgets facets={["*"]}>
                {/* <div className="my-5">
                  <Panel header="Categories">
                    <HierarchicalMenu attributes={["categories"]} />
                  </Panel>
                </div> */}
                <div className="my-5">
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
            </div>
            <div className="search-panel__results pfd-product-section">
              <div className="searchbox">
                <SearchBox />
              </div>

              <Stats />
              <CurrentRefinements />
              <QueryRulesBanner />

              <Hits hitComponent={ProductCard} />
              <Pagination />
            </div>
          </div>
        </div>
      </InstantSearch>
    </div>
  );
}
