'use client'
import { Icon } from "@iconify/react/dist/iconify.js";
import { Rating } from "@smastrom/react-rating";
import Link from "next/link";
import {useState,useEffect} from "react";
  
const ProductCard = ({ product }) => {
    const [thumbnail, setThumbnail] = useState(null);
    useEffect(()=>{
        if(product){
            setThumbnail(prev=> {
                if(product.images.length > 0){
                    // setImage
                    return product.images.filter(i=> i.is_thumbnail)[0].url_thumbnail;
                }else{
                    // setDefaultImage
                }
            })
        }
    },[product]);
    const handleHeartButtonClick = () => {
    }

    return <Link href={`/product/${product.id}`} className="flex w-full"><div className="overflow-hidden rounded-md border w-full duration-500 hover:scale-105 hover:shadow-xl">
    <div className="w-full flex items-center justify-center h-[230px] overflow-hidden bg-white relative">
        <img src={thumbnail} alt="" className="object-contain h-full" />
        <div className="absolute top-[10px] right-[10px]">
            <button className={`flex justify-center items-center w-[36px] h-[36px] rounded-full ${product.like? 'bg-pallete-orange':'bg-stone-400'}`} onClick={handleHeartButtonClick}>
                <Icon icon="teenyicons:heart-outline" className="text-white text-[20px]" />
            </button>
        </div>
        {
            product.sales_tag === "ON SALE" && <div className="absolute bottom-[60px] left-0 rounded-r-full bg-pallete-orange text-white text-[12px] font-bold py-[7px] px-[15px]">ONSALE</div>
        }
        <div className="absolute bottom-0 left-0 bg-pallete-green text-white text-[12px] font-semibold py-[7px] px-[15px] flex items-center w-full justify-center gap-[5px]">
            <div>
                <Icon icon="mi:shopping-cart-add" className="text-lg" />
            </div>
            <div>CUSTOMIZE TO PURCHASE</div>
        </div>
    </div>
    <div className="flex flex-col gap-[15px] p-[20px]">
        <div>Starting at <span className="text-pallete-green font-bold text-[20px]">${parseFloat(product.price).toFixed(2)}</span></div>
        <div className="flex h-[80px]  my-[15px]">
            <div className="font-bold text-[18px]">
                {product.name}
            </div>
        </div>
        <div className="flex flex-col gap-[5px]">
            <div className="flex items-center gap-[5px]">
                <div>
                    <Rating value={product.ratings} style={{ maxWidth: 80 }}></Rating>
                </div>
                <div className="text-[12px]">
                    ({product.reviews_count})
                    (id:{product.id})
                </div>
            </div>
            <div className="text-pallete-gray text-[12px]">SKU: {product.sku}</div>
        </div>
        <div className="flex items-center justify-between   ">
            <div className="flex items-center font-bold gap-[3px]">
                <div>
                    <Icon icon="lucide:circle-check-big" className={`${product.is_free_shipping ? 'text-pallete-green':'text-pallete-gray'}`} />
                    
                </div>
                <div className={`text-[14px] relative ${product.is_free_shipping ? 'text-black':'text-pallete-gray line-through'}`}>
                    <span className={`${product.is_free_shipping ? 'text-pallete-green':'text-pallete-gray'}`}>FREE</span> Shipping
                </div>
            </div>
            <div className="flex items-center font-bold gap-[3px]">
                <div>
                    <Icon icon="lucide:circle-check-big" className="text-pallete-green" />
                </div>
                <div className="text-[14px]">
                    Quick Ship Available
                </div>
            </div>
        </div>
    </div>
</div>
</Link>
}

export default ProductCard;