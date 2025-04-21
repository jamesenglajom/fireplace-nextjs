"use client";
import React, {useEffect} from "react";
import ReactDOM from "react-dom";
import Client from "@searchkit/instantsearch-client";
import Searchkit, {MultiMatchQuery, TermFilter} from "@searchkit/sdk";
import { CustomFilter } from './customFilter.js';
// import Searchkit from "searchkit";
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






const config = {
    host: "https://solanafireplaces.com/es",
    index: "bigcommerce_products",
    connectionOptions: {
      apiKey: "eHgtQWI1VUI0Nm1Xbl9IdGNfRG46bFZqUjQtMzJRN3kzdllmVjVDemNHdw=="
    },
    query: new MultiMatchQuery({
      fields: ["name"],
      highlightFields: ["name"]
    }),
    hits: {
      fields:[
        "id",
        "name",
        // "type",
        // "sku",
        // "description",
        // "weight",
        // "width",
        // "depth",
        // "height",
        // "price",
        // "cost_price",
        // "retail_price",
        // "sale_price",
        // "map_price",
        // "tax_class_id",
        // "product_tax_code",
        // "calculated_price",
        // "categories",
        // "option_set_id",
        // "option_set_display",
        // "inventory_level",
        // "inventory_warning_level",
        // "inventory_tracking",
        // "reviews_rating_sum",
        // "reviews_count",
        // "total_sold",
        // "fixed_cost_shipping_price",
        // "is_free_shipping",
        // "is_visible",
        // "is_featured",
        // "related_products",
        // "warranty",
        // "bin_picking_number",
        // "layout_file",
        // "upc",
        // "mpn",
        // "gtin",
        // "date_last_imported",
        // "search_keywords",
        // "availability",
        // "availability_description",
        // "gift_wrapping_options_type",
        // "gift_wrapping_options_list",
        // "sort_order",
        // "condition",
        // "is_condition_shown",
        // "order_quantity_minimum",
        // "order_quantity_maximum",
        // "page_title",
        // "meta_keywords",
        // "meta_description",
        // "date_created",
        // "date_modified",
        // "view_count",
        // "preorder_release_date",
        // "preorder_message",
        // "is_preorder_only",
        // "is_price_hidden",
        // "price_hidden_label",
        // "custom_url",
        // "base_variant_id",
        // "open_graph_type",
        // "open_graph_title",
        // "open_graph_description",
        // "open_graph_use_meta_description",
        // "open_graph_use_product_name",
        // "open_graph_use_image",
        // "variants",
        // "images",
        // "custom_fields",
        // "options",
        // "modifiers",
        // "brand",
        // "metafields"
      ]
    }, 
    filters: [
      new CustomFilter()
    ]
}




const Panel = ({ header, children }) => (
  <div className="panel py-3">
    <h5>{header}</h5>
    {children}
  </div>
);


const HitView = ({ hit }) => (
  <div>
    <h3>{hit.name}</h3>
    <p>{JSON.stringify(hit.categories)}</p>
  </div>
);

const SearchFilter = () => {
  useEffect(()=>{
    const init = async()=>{
      const request = Searchkit(config)
      const response = await request
        .setFilters([
          { identifier: 'CustomFilter', value: 34 },
        ])
        // .setSortBy("released")
        .execute({
          hits: {
            size: 10,
            from: 0
          }
        })
  
      console.log("response", JSON.stringify(response, null, 2)); 
    }
  
    init();
  },[]);  
  return <div className="mb-5">
      {/* <InstantSearch indexName="bigcommerce_products" searchClient={searchClient}>
        <Configure hitsPerPage={15} />
        <div className="flex gap-[20px]">
          <div className="pfd-filter-section">
            <DynamicWidgets facets={["*"]}>
              <Panel header="BRAND">
                <HierarchicalMenu attributes={["brand.name"]}/>
              </Panel>
  
              <Panel header="CATEGORY">
                <HierarchicalMenu attributes={["categories.name"]}/>
              </Panel>
  
              <Panel header="PRICE">
                <RangeInput attribute="price" />
              </Panel>
            </DynamicWidgets>
          </div>
          <div className="pfd-product-section flex flex-wrap">
            <Hits hitComponent={ProductCard} />
            <div>
            <Pagination />
            </div>
          </div>
        </div>
      </InstantSearch> */}
    </div>
  
};

export default SearchFilter;
