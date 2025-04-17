"use client";
import React from "react";
import ReactDOM from "react-dom";
import Client from "@searchkit/instantsearch-client";
import Searchkit from "searchkit";

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

// Create a Searchkit client
// This is the configuration for Searchkit, specifying the fields to attributes used for search, facets, etc.
const sk = new Searchkit({
  connection: {
    host: "https://solanafireplaces.com/es",
    apiKey: "eHgtQWI1VUI0Nm1Xbl9IdGNfRG46bFZqUjQtMzJRN3kzdllmVjVDemNHdw=="
  },
  search_settings: {
    // search_attributes: ["name"],
    result_attributes: [
      "id",
      "name",
      "type",
      "sku",
      "description",
      "weight",
      "width",
      "depth",
      "height",
      "price",
      "cost_price",
      "retail_price",
      "sale_price",
      "map_price",
      "tax_class_id",
      "product_tax_code",
      "calculated_price",
      "categories",
      "option_set_id",
      "option_set_display",
      "inventory_level",
      "inventory_warning_level",
      "inventory_tracking",
      "reviews_rating_sum",
      "reviews_count",
      "total_sold",
      "fixed_cost_shipping_price",
      "is_free_shipping",
      "is_visible",
      "is_featured",
      "related_products",
      "warranty",
      "bin_picking_number",
      "layout_file",
      "upc",
      "mpn",
      "gtin",
      "date_last_imported",
      "search_keywords",
      "availability",
      "availability_description",
      "gift_wrapping_options_type",
      "gift_wrapping_options_list",
      "sort_order",
      "condition",
      "is_condition_shown",
      "order_quantity_minimum",
      "order_quantity_maximum",
      "page_title",
      "meta_keywords",
      "meta_description",
      "date_created",
      "date_modified",
      "view_count",
      "preorder_release_date",
      "preorder_message",
      "is_preorder_only",
      "is_price_hidden",
      "price_hidden_label",
      "custom_url",
      "base_variant_id",
      "open_graph_type",
      "open_graph_title",
      "open_graph_description",
      "open_graph_use_meta_description",
      "open_graph_use_product_name",
      "open_graph_use_image",
      "variants",
      "images",
      "custom_fields",
      "options",
      "modifiers",
      "brand",
      "metafields"
    ], 
    facet_attributes: [
      {
        attribute: "brand.name", 
        field: "brand.name.keyword", 
        type: "string",
      },
      {
        attribute: "categories.name", 
        field: "name.keyword", 
        type: "string",
          nestedPath: 'categories'
      },
      {
        attribute: "price", 
        field: "price",
        type: "numeric",
      },
    ],
    // filters: [
    //   {
    //     identifier: "categories.id", 
    //     field: "categories.id",     
    //     type: "terms",            
    //     value: [43],              
    //     nestedPath: "categories",  
    //   }
    // ]
  }
});

const searchClient = Client(sk);

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

const SearchFilter = () => (
  <div className="mb-5">
    <InstantSearch indexName="bigcommerce_products" searchClient={searchClient}>
      <Configure hitsPerPage={15} />
      {/* wrapper */}
      <div className="flex gap-[20px]">
        {/* filters */}
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
          {/* <SearchBox /> */}
          <Hits hitComponent={ProductCard} />
          <div>
          <Pagination />
          </div>
        </div>
      </div>
    </InstantSearch>
  </div>
);

export default SearchFilter;
