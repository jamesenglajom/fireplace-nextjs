"use client";
import { useState, useEffect } from "react";
import { CustomFilter } from "@/app/filter/customFilter";
import Searchkit, {
  MultiMatchQuery,
  RefinementSelectFacet,
  RangeFacet,
  DateRangeFacet,
  TermFilter,
} from "@searchkit/sdk";
import { withSearchkit, withSearchkitRouting } from "@searchkit/client";
import { useSearchkit, FilterLink } from "@searchkit/client";

const config = {
  host: "https://solanafireplaces.com/es", // elasticsearch instance url
  index: "bigcommerce_products_7", // search indices name
  connectionOptions: {
    apiKey: "eHgtQWI1VUI0Nm1Xbl9IdGNfRG46bFZqUjQtMzJRN3kzdllmVjVDemNHdw==",
  },
  hits: {
    fields: [
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
    ],
  },
  query: new MultiMatchQuery({
    fields: ["name"],
    highlightFields: ["name"],
  }),
  facets: [
    new RefinementSelectFacet({
      identifier: "brand",
      field: "brand.name.keyword",
      label: "Brand",
      multipleSelect: true,
    }),
    new RangeFacet({
      identifier: "price",
      field: "price",
      label: "price",
      range: {
        min: 0,
        max: 20000,
        interval: 1000,
      },
    }),
  ],
  filters: [new CustomFilter()],
};

const request = Searchkit(config);

const FacetWrapper = ({ facets }) => {
  const api = useSearchkit();
  console.log("FacetWrapper", facets);
  return (
    <div>
      {facets &&
        Array.isArray(facets) &&
        facets.map((facet, index) => (
          <div key={`facet-item-${index}`}>
            <div>{facet.label}</div>
            <div className="flex flex-col gap-1">
              {facet.entries &&
                facet.entries.map((entry, entry_idx) => (
                  <button
                    onClick={()=>{
                      api.toggleFilter({identifier: facet.identifier, value: entry.label});
                      api.search();
                    }}
                    key={`facet-${facet.identifier}-${entry_idx}`}
                    filter={{
                      identifier: facet.identifier,
                      value: entry.label,
                    }}
                  >
                    {entry.label} - ({entry.count})
                  </button>
                ))}
            </div>
          </div>
        ))}
    </div>
  );
};

function Web() {
  const [skData, setSkData] = useState({});
  const [skFacets, setSkFacets] = useState([]);

  useEffect(() => {
    const triggerSkQuery = async () => {
      const response = await request
        .setFilters([{ identifier: "CustomFilter", value: "148" }])
        // .setSortBy("released")
        .execute({
          facets: true,
          hits: {
            size: 10,
            from: 0,
          },
        });
      console.log("response", response);
      if (response) {
        setSkData(response);
        setSkFacets(response.facets);
        return response;
      }
      return false;
    };

    triggerSkQuery();
  }, []);
  // const variables = useSearchkitVariables();
  // const {results, loading} = useSearchkitSDK(config, variables);
  // return <div>results {results?.summary?.total}</div>;
  return (
    <div>
      <FacetWrapper facets={skFacets} />
    </div>
  );
}

export default withSearchkit(withSearchkitRouting(Web));
