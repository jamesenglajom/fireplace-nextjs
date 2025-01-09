export function createSlug(string, separator = "-") {
  return string
    .toString() // Ensure the input is a string
    .normalize("NFD") // Normalize the string (handles accents/diacritics)
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritical marks
    .toLowerCase() // Convert to lowercase
    .trim() // Remove leading and trailing spaces
    .replace(/[^a-z0-9]+/g, separator) // Replace non-alphanumeric characters with the separator
    .replace(new RegExp(`\\${separator}+`, "g"), separator); // Collapse multiple separators into one
}

export function getFirstPathSegment(pathname) {
  // Remove leading slash, split by "/", and return the first segment
  return pathname.replace(/^\/+/, "").split("/")[0] || "";
}

export function getCategoryIds(category_slug, categories, bc_categories) {
  // console.log("slug", category_slug);
  // console.log("flat", categories);
  const category_keywords = categories.find(
    (i) => i.url === (category_slug === "all-products" ? "" : category_slug)
  )?.key_words;
  if (Array.isArray(category_keywords)) {
    const ids =
      category_keywords.length > 0
        ? bc_categories
            .filter((i) =>
              category_keywords.some((keyword) =>
                i?.url?.path.includes(keyword)
              )
            )
            .map((i) => i.category_id)
        : [];
    return ids;
  } else {
    console.log(
      "lib/helpers.js fn(getCategoryIds):ERROR -> Make sure that key_words property and value are provided in app/data/category.json"
    );
    return [];
  }
}

export function getCategoryNameById(id, bc_categories) {
  return bc_categories.find(({ category_id }) => category_id === id)?.name;
}

export function formatPrice(price) {
  return new Intl.NumberFormat("en-US", {
    style: "decimal", // Use 'currency' for currency formatting
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}

export function getPageData(pathname, categories) {
  // console.log("lib/helper.js fn(getPageData):params->pathname", pathname);
  // console.log("lib/helper.js fn(getPageData):params->categories", categories);
  return categories.find(({ url }) => url === pathname);
}

export function findParentByUrl(categories, url) {
  // Helper function to recursively search children up to the 3rd level
  function search(children, parent, level = 1) {
    if (level > 3) return null; // Stop searching beyond the 3rd level

    for (const child of children) {
      if (child.url === url) {
        return parent; // Return the parent if a match is found
      }
      if (child.children && child.children.length > 0) {
        const result = search(child.children, child, level + 1);
        if (result) {
          return result; // If a match is found deeper, return it
        }
      }
    }

    return null; // No match found
  }

  // Start searching from the top-level categories
  for (const category of categories) {
    const result = search(category.children || [], category, 1);
    if (result) {
      const result2 = categories.find(({ url }) => url === result.url);
      console.log("result", result.url);
      console.log("condition", result2);
      if (result2) {
        return result2;
      } else {
        return findParentByUrl(categories, result?.url);
      }
    }
  }

  return null; // Return null if no match is found
}
