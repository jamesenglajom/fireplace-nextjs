import { Icon } from "@iconify/react/dist/iconify.js";
import { Rating } from '@smastrom/react-rating';

const ProductToCart = () => {
    const tags = ["Category1", "Category2"];

    return <div className="flex flex-col gap-[15px] w-full">
        <div className="flex gap-[10px]">
            {
                tags.map((v, i) =>
                    <div key={`category-tag-${i}`} className="py-[5px] px-[25px] bg-stone-300 text-stone-600 font-semibold rounded-full">
                        {v}
                    </div>
                )
            }
        </div>
        <div className="">
            <div className="py-[10px] px-[20px] text-white bg-pallete-orange inline rounded-r-full text-[1.5em] font-semibold">
                ON SALE
            </div>
        </div>
        <div className="">
            <div className="font-bold text-4xl">
                Empire Boulevard Linear Direct Vent Gas Fireplace - 60"
            </div>
            <div className="font-light text-stone-400">
                ITEM #77777777
            </div>
        </div>
        <div className="">
            <div className="text-[22px] font-bold">Ships Within 1 to 2 Business Days</div>
        </div>
        <div className="">
            <div className="flex items-center gap-[20px]">
                <div className="text-[2.625em] font-extrabold text-pallete-green">
                    $6,659.00
                </div>
                <div className="product-add-to-cart-quantity-input">
                    <button>
                        <Icon icon="icons8:minus" className="text-[32px] text-pallete-gray" />
                    </button>
                    <input type="number" value="1" />
                    <button>
                        <Icon icon="icons8:plus" className="text-[32px] text-pallete-gray" />
                    </button>
                </div>
            </div>
            <div className="flex items-center gap-[10px] mt-[10px]">
                <div className="font-bold text-white">
                    <button className="flex items-cencer gap-[5px] bg-pallete-green rounded-full py-[9px] px-[35px]">
                        <div >
                            <Icon icon="ph:shopping-cart-simple-bold" className="text-[30px]" />
                        </div>
                        <div className="font-bold uppercase text-[1.5em]">add to cart</div>
                    </button>
                </div>
                <div>
                    <button className="flex justify-center items-center w-[54px] h-[54px] bg-stone-400 rounded-full">
                        <Icon icon="teenyicons:heart-outline" className="text-white text-[30px]" />
                    </button>
                </div>
            </div>
        </div>
        <div className="mt-[30px] flex flex-col gap-[10px]">
            <div className="flex items-center">
                <Rating value={5} style={{maxWidth:100}}></Rating>
                <div>(5)</div>
            </div>
            <div className="flex items-center gap-[25px]">
                <div className="flex items-center font-bold gap-[8px]">
                    <div>
                        <Icon icon="lucide:circle-check-big" className="text-pallete-green" />
                    </div>
                    <div className="text-[20px]">
                        <span className="text-pallete-green">FREE</span> Shipping
                    </div>
                </div>
                <div className="flex items-center font-bold gap-[8px]">
                    <div>
                        <Icon icon="lucide:circle-check-big" className="text-pallete-green" />
                    </div>
                    <div className="text-[20px]">
                        Quick Ship Available
                    </div>
                </div>
                <div className="py-[6.5px] px-[25px] flex gap-[5px] items-center rounded-full bg-pallete-lightgray">
                    <div>
                        <Icon icon="material-symbols:info-outline" className="text-pallete-dark text-[25px]" />
                    </div>
                    <div className="text-[18px] text-pallete-dark font-semibold">Learn More</div>
                </div>
            </div>
        </div>
    </div>
}

export default ProductToCart;