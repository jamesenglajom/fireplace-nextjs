import ProductShopNowCard from "../card/ShopNow";
const ProductShopNowList = () => {
    const shopNowItems = [0, 1, 2, 3, 4]
    return (
        <div className="w-full">
            <div className="container mx-auto py-[20px]">
                {/* <div className="font-bold text-[1.5em]">Shop Now List</div> */}
                <div className="w-full flex gap-[20px] items-center overflow-y-auto py-[20px]">
                    {/* related product cards display */}
                    {
                        shopNowItems.map(i =>
                            <div key={`related-products-${i}`}>
                                <ProductShopNowCard />
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}


export default ProductShopNowList;