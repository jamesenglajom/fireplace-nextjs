'use client'

import { Icon } from "@iconify/react/dist/iconify.js";
import { Rating } from '@smastrom/react-rating';
import { useState, useEffect } from "react";
import bccat_json from "../../data/bc_categories_20241213.json"
import { getCategoryNameById } from "@/app/lib/helpers";
const ProductToCart = ({ product, loading }) => {
    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (e) => {
        const { value } = e.target;
        setQuantity(prev => {
            if (value === "") {
                return 0;
            } else {
                return parseInt(value);
            }
        });
    }

    const handleQuantityButtons = (direction) => {
        setQuantity(prev => {
            let newQuantity = typeof prev === 'number' ? prev : 0;
            if (direction === 'inc') {
                newQuantity = newQuantity + 1;
            } else if (direction === 'dec') {
                if (newQuantity > 0) {
                    newQuantity = newQuantity - 1;
                }
            }
            return newQuantity
        });
    }

    const [productData, setProductData] = useState(product);
    useEffect(() => {
        setProductData(product);
    }, [product])

    const capitalizeFirstLetter = (string) => {
        if (!string) return ""; // Handle empty or undefined strings
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const handleHeartToggle = (e) => {
        setProductData(prev => ({ ...prev, like: !prev.like }))
    }

    if (loading) {
        return (
            <div className="flex flex-col gap-[15px] w-full">
                <div className="flex gap-[10px]">
                    <div className="py-[5px] px-[25px] bg-stone-200 text-stone-600 h-[34px] w-[170px] font-semibold rounded-full"></div>
                    <div className="py-[5px] px-[25px] bg-stone-200 text-stone-600 h-[34px] w-[155px] font-semibold rounded-full"></div>
                </div>
                <div className="">
                    <div className="font-bold text-4xl flex flex-col gap-[2px]">
                        <div className="h-[50px] w-full bg-stone-200"></div>
                        <div className="h-[50px] w-[85%] bg-stone-200"></div>
                        <div className="h-[50px] w-[60%] bg-stone-200"></div>
                        <div className="h-[24px] w-[50%] bg-stone-200"></div>
                    </div>
                </div>
                <div className="mt-[100px]">
                    <div className="font-bold text-4xl flex gap-[20px]">
                        <div className="h-[54px] w-[270px] bg-stone-200 rounded-full"></div>
                        <div className="h-[54px] w-[54px] bg-stone-200 rounded-full"></div>
                    </div>
                </div>
            </div>
        )
    }

    return <div className="flex flex-col gap-[15px] w-full">
        <div className="flex gap-[10px] flex-wrap">
            {
                product && product.categories.map((v, i) =>
                    <div key={`category-tag-${i}`} className="py-[5px] px-[25px] bg-stone-300 text-stone-600 font-semibold rounded-full">
                        {getCategoryNameById(v, bccat_json)}
                    </div>
                )
            }
        </div>
        <div className="">
            {
                productData?.sales_tag === "ON SALE" &&
                <div className="py-[10px] px-[20px] text-white bg-pallete-orange inline rounded-r-full text-[1.5em] font-semibold">
                    ON SALE
                </div>
            }
        </div>
        <div className="">
            <div className="font-bold text-4xl">
                {
                    productData?.name
                }
            </div>
            <div className="font-light text-stone-400">
                {
                    productData?.sku
                }
            </div>
        </div>
        <div className="">
            <div className="text-[22px] font-bold">Ships Within 1 to 2 Business Days</div>
        </div>
        <div className="">
            <div className="flex items-center gap-[20px]">
                <div className="text-[2.625em] font-extrabold text-pallete-green">
                    ${
                        productData?.price
                    }
                </div>
                <div className="product-add-to-cart-quantity-input">
                    <button onClick={() => handleQuantityButtons('dec')}>
                        <Icon icon="icons8:minus" className="text-[32px] text-pallete-gray" />
                    </button>
                    <input type="number" value={quantity} onChange={handleQuantityChange} />
                    <button onClick={() => handleQuantityButtons('inc')}>
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
                    <button onClick={handleHeartToggle} className={`flex justify-center items-center w-[54px] h-[54px] rounded-full ${productData?.like ? 'bg-pallete-orange' : 'bg-stone-400'}`}>
                        <Icon icon="teenyicons:heart-outline" className="text-white text-[30px]" />
                    </button>
                </div>
            </div>
        </div>
        <div className="mt-[30px] flex flex-col gap-[10px]">
            <div className="flex items-center">
                <Rating value={productData?.ratings} style={{ maxWidth: 100 }}></Rating>
                <div>({productData?.likes})</div>
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