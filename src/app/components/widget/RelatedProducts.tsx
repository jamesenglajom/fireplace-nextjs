
import RelatedProductCard from "../product/card/RelatedProduct";
const RelatedProducts = () => {
    const related_products = [1,2,3,4,5,6,7];
    return <div className="flex flex-col gap-[50px]">
        <div className="font-bold text-[1.5em]">Related Products</div>
        <div className="w-full flex gap-[20px] items-center overflow-y-auto pb-[20px]">
        {/* related product cards display */}
            {
                related_products.map(i=> 
                    <div key={`related-products-${i}`} style={{minWidth:'340px !important'}}>
                        <RelatedProductCard></RelatedProductCard>
                    </div>
                )
            }
        </div>
    </div>
}

export default RelatedProducts;