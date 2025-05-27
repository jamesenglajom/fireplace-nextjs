// pages/api/es/searchkit.js
import API from "@searchkit/api";

const apiClient = API(
  {
    connection: {
      host: "https://solanafireplaces.com/es",
      apiKey: "eHgtQWI1VUI0Nm1Xbl9IdGNfRG46bFZqUjQtMzJRN3kzdllmVjVDemNHdw==",
    },
    search_settings: {
      highlight_attributes: ["name"],
      snippet_attributes: ["description:200"],
      search_attributes: [
        { field: "name", weight: 3 },
        { field: "brand", weight: 2 },
        "description",
      ],
      // bigcommere result_attr
      // result_attributes: [
      //   "id",
      //   "name",
      //   "type",
      //   "sku",
      //   "description",
      //   "weight",
      //   "width",
      //   "depth",
      //   "height",
      //   "price",
      //   "cost_price",
      //   "retail_price",
      //   "sale_price",
      //   "map_price",
      //   "tax_class_id",
      //   "product_tax_code",
      //   "calculated_price",
      //   "categories",
      //   "option_set_id",
      //   "option_set_display",
      //   "inventory_level",
      //   "inventory_warning_level",
      //   "inventory_tracking",
      //   "reviews_rating_sum",
      //   "reviews_count",
      //   "total_sold",
      //   "fixed_cost_shipping_price",
      //   "is_free_shipping",
      //   "is_visible",
      //   "is_featured",
      //   "related_products",
      //   "warranty",
      //   "bin_picking_number",
      //   "layout_file",
      //   "upc",
      //   "mpn",
      //   "gtin",
      //   "date_last_imported",
      //   "search_keywords",
      //   "availability",
      //   "availability_description",
      //   "gift_wrapping_options_type",
      //   "gift_wrapping_options_list",
      //   "sort_order",
      //   "condition",
      //   "is_condition_shown",
      //   "order_quantity_minimum",
      //   "order_quantity_maximum",
      //   "page_title",
      //   "meta_keywords",
      //   "meta_description",
      //   "date_created",
      //   "date_modified",
      //   "view_count",
      //   "preorder_release_date",
      //   "preorder_message",
      //   "is_preorder_only",
      //   "is_price_hidden",
      //   "price_hidden_label",
      //   "custom_url",
      //   "base_variant_id",
      //   "open_graph_type",
      //   "open_graph_title",
      //   "open_graph_description",
      //   "open_graph_use_meta_description",
      //   "open_graph_use_product_name",
      //   "open_graph_use_image",
      //   "variants",
      //   "images",
      // ],
      // shopify result_attr
      result_attributes: [
        "handle",
        "title",
        "body_html",
        "brand",
        "product_category",
        "product_type",
        "tags",
        "published",
        "options",
        "variants",
        "images",
        "seo",
        "google_shopping",
        "custom_metafields",
        "ratings",
        "features",
        "recommendations",
        "region_pricing",
        "accentuate_data",
        "status",
        "uploaded_at",
        "created_at",
        "updated_at",
      ],
      facet_attributes: [
        {
          attribute: "product_category",
          field: "product_category.category_name.keyword",
          type: "string",
        },
        { attribute: "brand", field: "brand.keyword", type: "string" },
        // { attribute: 'categories', field: 'name.keyword', type: 'string', nestedPath:"categories" },
        { attribute: "price", field: "variants.price", type: "numeric" },
      ],
      filter_attributes:[
        {
          attribute: "page_category",
          field: "product_category.category_name.keyword",
          type: "string",
        },
      ],
      sorting: {
        popular: {
          field: '_score',
          order: 'desc'
        },
        newest: {
          field: 'created_at',
          order: 'desc'
        },
        _price_desc: {
          field: 'variants.price',
          order: 'desc'
        },
        _price_asc: {
          field: 'variants.price',
          order: 'asc'
        }
      }
    },
  }
  // { debug: true }
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  try {
    console.log("searchkit body", req.body);
    const check_filter = req.body?.[0]?.params?.filter;
    let page_category = null;
    if (check_filter) {
      page_category = check_filter.split(":")[1];
    }

    const data = req.body;
    let results = null;

    if (page_category) {
      results = await apiClient.handleRequest(data, {
        getBaseFilters: () => [
          {
            term: {
              "product_category.category_name.keyword": page_category,
            },
          },
        ],
      });
    } else {
      results = await apiClient.handleRequest(data);
    }

    res.status(200).json(results);
  } catch (err) {
    console.error("Searchkit Error:", err);
    res.status(500).json({ error: "Searchkit failed", details: err.message });
  }
}
