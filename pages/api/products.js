import {
  onsale_category_ids,
  filter_price_range,
} from "../../src/app/lib/helpers";

export default async function handler(req, res) {
  const params = new URLSearchParams(req.query);
  const CategoriesIn = params.get("categories:in")
    ? params
        .get("categories:in")
        .split(",")
        .map((i) => parseInt(i))
    : [];
  const API_URL = `${
    process.env.NEXT_PUBLIC_BC_STORE_API
  }/catalog/products?${params.toString()}`;
  const API_TOKEN = process.env.NEXT_PUBLIC_BC_ACCESS_TOKEN; // Replace with your BigCommerce API token

  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "X-Auth-Token": API_TOKEN,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching products: ${response.statusText}`);
    }
    const data = await response.json();

    // Filters query
    // add onsale category ids on categories:in property
    const FOR_API_URL = new URL(API_URL);
    const FOR_CatIn = [...CategoriesIn, ...onsale_category_ids];
    FOR_API_URL.searchParams.set("categories:in", FOR_CatIn);
    const fitlter_onsale_response = await fetch(FOR_API_URL.toString(), {
      method: "GET",
      headers: {
        "X-Auth-Token": API_TOKEN,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const for_data = await fitlter_onsale_response.json();
    // data["onsale"] = for_data.meta.pagination.total;
    const onsale_count = for_data.meta.pagination.total + "(WRONG COUNT)";
    const counts = await Promise.all(
      filter_price_range.map(async ({ min, max }) => {
        const price_range_url = new URL(API_URL);
        // delete original request price range params
        price_range_url.searchParams.delete("price:min");
        price_range_url.searchParams.delete("price:min");
        // set query price range
        price_range_url.searchParams.set("price:min", min);
        price_range_url.searchParams.set("price:max", max);
        price_range_url.searchParams.delete("page");
        price_range_url.searchParams.delete("limit");
        const price_range_response = await fetch(price_range_url, {
          method: "GET",
          headers: {
            "X-Auth-Token": API_TOKEN,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        const data = await price_range_response.json();
        if (data.meta.pagination.total > 0) {
          const product_count = data.meta.pagination.total || 0;
          return {
            label: `${
              max === 0
                ? `Request a Qoute (${product_count})`
                : `$${min} - ${
                    max >= 100000 ? "UP" : `$${max}`
                  } (${product_count})`
            }`,
            prop: `price:${min}-${max}`,
            count: product_count,
            is_checked: false,
          };
        }
      })
    );
    data["meta"]["filters"] = {
      onsale: {
        label: "On Sale",
        prop: "onsale",
        count: 0,
        is_checked: false,
      },
      quick_ship: {
        label: "Quick Ship",
        prop: "quick_ship",
        count: 0,
        is_checked: false,
      },
      brand: {
        label: "Brands",
        prop: "brand",
        count: 0,
        is_checked: false,
        multi: true,
        options: [
          {
            label: "[BrandName1]([ProductCount])",
            prop: "brand:[BrandName1]",
            count: 0,
            is_checked: false,
          },
          {
            label: "[BrandName2]([ProductCount])",
            prop: "brand:[BrandName2]",
            count: 0,
            is_checked: false,
          },
          {
            label: "[BrandName3]([ProductCount])",
            prop: "brand:[BrandName3]",
            count: 0,
            is_checked: false,
          },
          {
            label: "[BrandName4]([ProductCount])",
            prop: "brand:[BrandName4]",
            count: 0,
            is_checked: false,
          },
        ],
      },
      price: {
        label: "Price",
        prop: "price",
        count: 0,
        is_checked: false,
        multi: false,
        options: counts.filter((i) => i != null),
      },
      fuel_type: {
        label: "Fuel Type",
        prop: "fuel_type",
        count: 0,
        is_checked: false,
        multi: true,
        options: [
          {
            label: "Natural Gas([ProductCount])",
            prop: "fuel_type:natural_gas",
            count: 0,
            is_checked: false,
          },
          {
            label: "Propane([ProductCount])",
            prop: "fuel_type:propane",
            count: 0,
            is_checked: false,
          },
        ],
      },
      venting_type: {
        label: "Venting Type",
        prop: "venting_type",
        count: 0,
        is_checked: false,
        multi: true,
        options: [
          {
            label: "Vented ([ProductCount])",
            prop: "product_type:vented",
            count: 0,
            is_checked: false,
          },
          {
            label: "Ventless ([ProductCount])",
            prop: "product_type:ventless",
            count: 0,
            is_checked: false,
          },
        ],
      },
      product_type: {
        label: "Product Type",
        prop: "product_type",
        count: 0,
        is_checked: false,
        multi: true,
        options: [
          {
            label: "[ProductTypeName]([ProductCount])",
            prop: "product_type:[ProductTypeName]",
            count: 0,
            is_checked: false,
          },
        ],
      },
      made_in_usa: {
        label: "Made in USA",
        prop: "made_in_usa",
        count: 0,
        is_checked: false,
      },
      new_arrivals: {
        label: "New Arrivals",
        prop: "new_arrivals",
        count: 0,
        is_checked: false,
        multi: true,
        options: [],
      },
    };
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
}
