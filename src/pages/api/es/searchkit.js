// pages/api/es/searchkit.js
import API from "@searchkit/api";

const apiClient = API(
  {
    connection: {
      host: "https://solanafireplaces.com/es",
      apiKey: "eHgtQWI1VUI0Nm1Xbl9IdGNfRG46bFZqUjQtMzJRN3kzdllmVjVDemNHdw==",
    },
    search_settings: {
      highlight_attributes: ["title"],
      snippet_attributes: ["description:200"],
      search_attributes: [
        { field: "title", weight: 3 },
        { field: "brand", weight: 2 },
        "description",
      ],
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
      filter_attributes: [
        {
          attribute: "page_category",
          field: "product_category.category_name.keyword",
          type: "string",
        },
      ],
      sorting: {
        popular: {
          field: "_score",
          order: "desc",
        },
        newest: {
          field: "created_at",
          order: "desc",
        },
        _price_desc: {
          field: "variants.price",
          order: "desc",
        },
        _price_asc: {
          field: "variants.price",
          order: "asc",
        },
      },
    },
  },
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

    let filter_key = null;
    let filter_value = null;
    let filter_option = null;
    if (check_filter) {
      filter_key = check_filter.split(":")[0];
      filter_value = check_filter.split(":")[1];
    }

    if (filter_key === "page_category") {
      filter_option = {
        getBaseFilters: () => [
          {
            term: {
              "product_category.category_name.keyword": filter_value,
            },
          },
        ],
      };
    }

    if (filter_key === "page_brand") {
      filter_option = {
        getBaseFilters: () => [
          {
            term: {
              "brand.keyword": filter_value,
            },
          },
        ],
      };
    }

    if (filter_key === "custom_page" && filter_value === "New Arrivals") {
      filter_option = {
        getBaseFilters: () => [
          {
            range: {
              created_at: {
                gte: "now-30d/d", // You can customize this value as needed
              },
            },
          },
        ],
      };
    }

    if (filter_key === "custom_page" && filter_value === "On Sale") {
      filter_option = {
        getBaseFilters: () => [
          {
            exists: {
              field: "variants.compare_at_price",
            },
          },
          {
            range: {
              "variants.compare_at_price": {
                gt: 0,
              },
            },
          },
          {
            script: {
              script: {
                source:
                  "doc['variants.compare_at_price'].size() > 0 && doc['variants.price'].size() > 0 && doc['variants.compare_at_price'].value > doc['variants.price'].value",
                lang: "painless",
              },
            },
          },
        ],
      };
    }

    const data = req.body;
    let results = null;

    if (filter_option) {
      results = await apiClient.handleRequest(data, filter_option);
    } else {
      results = await apiClient.handleRequest(data);
    }

    res.status(200).json(results);
  } catch (err) {
    console.error("Searchkit Error:", err);
    res.status(500).json({ error: "Searchkit failed", details: err.message });
  }
}
