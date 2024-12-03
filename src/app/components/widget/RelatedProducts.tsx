'use client'
import RelatedProductCard from "../product/card/RelatedProduct";
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
type Product = {
    id: number;
    name: string;
    description: string;
    description_html: string;
    price: string;
    url: string;
    like: Boolean,
    likes: number;
    ratings: number;
    sku: string;
    sales_tag: string;
    category: [];
};

const RelatedProducts = ({ product }: { product: Products }) => {
    const [products, setProducts] = useState(null);
    useEffect(() => {
        if (product) {
            fetch('/data/products.json') // URL relative to the public folder
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then((data) => setProducts(data.filter(i => parseInt(i.id) !== parseInt(product?.id))))
                .catch((error) => console.error('Error loading products:', error));
        }
    }, [product]);

    return <div className="relative flex flex-col gap-[50px]">

        <div className="font-bold text-[1.5em]">Related Products</div>
        <div className="w-full flex gap-[20px] items-center overflow-y-auto pb-[20px]">
            {/* related product cards display */}
            {
                products && products.map((i, index) =>
                    <div key={`related-products-${index}`} className="w-[340px] min-w-[340px]">
                        <RelatedProductCard product={i}></RelatedProductCard>
                    </div>
                )
            }
        </div>
        {/* left and right controls */}

        {/* Navigation Arrows */}
        <button
            className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full sm:p-3 hover:bg-opacity-75"
        >
            <Icon icon="mingcute:left-fill" width="24" height="24" />
        </button>
        <button
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full sm:p-3 hover:bg-opacity-75"
        >
            <Icon icon="mingcute:right-fill" width="24" height="24" />
        </button>
    </div>
}

export default RelatedProducts;