import RelatedProductCard from "../product/card/RelatedProduct";
import ProductsFilter from "../product/Filters";
const ProductsSection = () => {
    return (
        <div className="w-full">
            <div className="container mx-auto">
                <div className="w-full flex justify-between items-center border-b py-[20px]">
                    <div className="text-[32px]"><span className="font-bold">All Fireplace</span> (678)</div>
                    <div className="flex items-center gap-[10px]">
                        <div className="font-bold text-[18px]">
                            SORT PRODUCTS BY
                        </div>
                        <select name="" id="">
                            <option value="">TEST</option>
                        </select>
                    </div>
                </div>
                <div className="flex">
                    {/* side filter widht 190px */}
                    <div className="product-section__filter-wrap border-r">
                        <div className="px-[10px] py-[50px]">
                            <ProductsFilter />
                        </div>
                    </div>
                    {/* products display */}
                    <div className="product-section__products-wrap">
                        <div className="grid grid-cols-3 gap-4 px-[30px] py-[50px]">
                            {
                                [1, 1, 1, 1, 1, 1, 1, 1, 1].map((v, i) =>
                                    <div key={`product-display-${i}`}>
                                        <RelatedProductCard />
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductsSection;