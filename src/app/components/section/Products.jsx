'use client'
import ProductCard from "../atom/ProductCard";
import ProductsFilter from "../product/Filters";
import { useState, useEffect } from "react";
import useFetchProducts from "../../hooks/useFetchProducts";
import useFetchCategories from "../../hooks/useFetchCategories";
const ProductsSection = () => {
    const [productsParams, setProductsParams] = useState({
        include:"images",
        page:1,
    }); 
    const {
        products,
        loading:products_loading,
        error:products_error,
        refetch: productsRefetch
     } = useFetchProducts(productsParams);

      
    const {
        categories,
        loading:categories_loading,
        error:categories_error,
        refetch: categoriesRefetch
     } = useFetchCategories({
        is_visible:true,
     });

     const handleFilterChange = (val) => {
        setProductsParams(prev=>{
            let newParams = {
                ...prev,
                page:1 // reset to page 1 everytime the filter has changes
            }

            if(val.length>0){
                newParams["categories:in"] = val.join(",");
            }else{
                delete newParams["categories:in"];
            }
            return newParams;
        });
     }

     useEffect(()=>{
        productsRefetch(productsParams)
     },[productsParams]);
    return (
        <div className="w-fullx">
            <div className="container mx-auto">
                <div className="w-full flex justify-between items-center border-b py-[20px] sticky top-[112px] bg-white z-[999]">
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
                        <div className="px-[0px] py-[30px]  sticky top-[201px]">
                            <ProductsFilter categories={categories}  onChange={handleFilterChange}/>
                        </div>
                    </div>
                    {/* products display */}
                    <div className="product-section__products-wrap">
                        <div className="grid grid-cols-3 gap-4 px-[30px] py-[50px]">
                            {
                                products && products.length > 0 && products.map((v, i) =>
                                    <div key={`product-display-${i}`}>
                                        <ProductCard product={v} />
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