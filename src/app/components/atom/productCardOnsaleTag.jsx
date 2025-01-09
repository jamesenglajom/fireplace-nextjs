export default function productCardOnsaleTag({ categories }) {
  const sale_categories = [294, 360, 361, 362, 363, 364, 365];
  if (!Array.isArray(categories)) {
    return;
  }

  console.log("saleTagComp(categories)", categories);
  const isSale =
    categories.filter((i) => sale_categories.includes(i)).length > 0;
  console.log("saleTagComp(isSale)", isSale);
  if (isSale) {
    return (
      <div className="absolute bottom-[60px] left-0 rounded-r-full bg-pallete-orange text-white text-[12px] font-bold py-[7px] px-[15px]">
        ONSALE
      </div>
    );
  }
}
