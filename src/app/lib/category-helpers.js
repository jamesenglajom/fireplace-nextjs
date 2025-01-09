// import cat_json from "../data/category.json";
import cat_json from "../data/categoryv2.json";
// import bccat_json from "../data/bc_categories_20241213.json";
import bccat_json from "../data/bc_categories_20250108.json";

export const solana_categories = cat_json;
export const bc_categories = bccat_json;

export const main_categories = cat_json
  .filter((i) => i.menu.visible)
  .map((i) => ({
    ...i,
    url: i.menu.href,
    children: i.links.flatMap((i) => i),
  }));

export const main_cat_array = main_categories.map((i) => i.menu.href);

export const sub_categories = cat_json
  .flatMap((i) => i.links)
  .flatMap((i) => i);
export const child_categories = sub_categories.flatMap((i) => i.children);

export const flatCategories = [
  ...main_categories,
  ...sub_categories,
  ...child_categories,
];

export const shop_all_categories = bc_categories.filter((i) =>
  i?.url?.path.includes("shop-all")
);

console.log("shop-all-categories", shop_all_categories);
console.log("filterBCCatByKeyword('arrival')", filterBCCatByKeyword("arrival"));
console.log(
  "filterBCCatByKeyword('arrival') filtered",
  filterBCCatByKeyword("arrival")
    .sort((a, b) => a.url.path.localeCompare(b.url.path))
    // .filter((i) => {
    //   const path = i?.url?.path.split("/");
    //   console.log(path);
    //   if (path.length === 4) {
    //     return i;
    //   }
    // })
    .filter((i) => !i?.url?.path.includes("/shop-all"))
    // .sort((a, b) => a.name.localeCompare(b.name))
    .map((i) => ({
      id: i.category_id,
      name: i.name,
      url: i.url.path.split("/").filter(Boolean).pop(),
      key_words: [i.url.path],
      children: [],
    }))
  // .map((i) => i.key_words[0])
);
console.log(
  "filterBCCatByKeyword('bbq') shopall",
  filterBCCatByKeyword("bbq")
    .filter((i) => i?.url?.path.includes("shop-all"))
    .sort((a, b) => a.name.localeCompare(b.name))
);
function filterBCCatById(id) {
  return bc_categories.find(({ category_id }) => category_id === id);
}

function filterBCCatByKeyword(keyword) {
  return bc_categories.filter((i) =>
    i?.url?.path.toLowerCase().includes(keyword.toLowerCase())
  );
  // .map((i) => i.name);
}

console.log(
  "bc_categories PARENTS",
  bc_categories
    .sort((a, b) => a?.url?.path.localeCompare(b?.url?.path))
    .filter((i) => i?.url?.path.split("/").length === 3)
);
