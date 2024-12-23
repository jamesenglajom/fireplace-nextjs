"use client"
import {useState} from "react"
type Product = {
  id: number;
  name: string;
  description: string;
  description_html: string;
  price: string;
  url:string;
  like:Boolean,
  likes: number;
  ratings:number;
  sku:string;
  sales_tag:string;
  category:[];
};
const ProductMetaTabs = ({product}:{product:Product}) => {
    const [tab, setTab] = useState("Product Descriptions"); 
    const tabs = [
        {
            name: "Product Descriptions",
            content: product?.description       
        },
        {
            name: "Specification",
            content: "<div style='font-weight:bold'>Specification</div>"
        },
        {
            name: "Guides & Installations",
            content: "<div style='font-weight:bold'>Guides & Installations</div>"
        },
    ];

    const handleTabChange = (tab) => {
        setTab(prev=> tab);
    }

    return (
        <div>
            <div className="flex">
                {
                    tabs.map((v,i)=>
                    <button onClick={()=> handleTabChange(v.name)} key={`meta-tab-${i}`} className={`px-[15px] py-[7px] rounded-tl-lg rounded-tr-lg ${tab === v.name ? 'bg-pallete-orange text-white font-bold':'bg-stone-100 text-stone-500'}`}>
                        {v.name}
                    </button>
                    )
                }
            </div>
            <div className="border p-[20px]">
                {/* tab contents */}
                <div dangerouslySetInnerHTML={{__html: tabs.filter(i=> i.name === tab)[0]?.content}}></div>
            </div>
        </div>
    )
}

export default ProductMetaTabs;