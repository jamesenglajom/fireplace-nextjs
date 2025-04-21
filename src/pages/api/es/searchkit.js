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
      //   search_attributes: [
      //     { field: 'name', weight: 3 },
      //     { field: 'categories', weight: 2 },
      //     { field: 'brand', weight: 2 },
      //     'description'
      //   ],
      result_attributes: ["name", "description"],
      facet_attributes: [
        { attribute: "brand", field: "brand.name.keyword", type: "string" },
        { attribute: "price", field: "price", type: "numeric" },
      ],
      filter_attributes: [
        {
          attribute: "category_page",
          field: "categories.id",
          type: "numeric",
          nested: "categories"
        },
      ],
    },
  },
  { debug: true }
);

export default async function handler(req, res) {
  const data = req.body; // because req.json() doesn’t exist here

  try {
    const results = await apiClient.handleRequest(data);
    res.status(200).json(results);
  } catch (err) {
    console.error("Searchkit error:", err);
    res.status(500).json({ error: "Searchkit failed", details: err });
  }
}
