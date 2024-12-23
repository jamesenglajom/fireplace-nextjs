'use client'

import { useState, useEffect } from "react";
import useFetchProducts from "../../hooks/useFetchProducts";
import TuiFilterSort from "../template/tui_filter_sort";
import { getCategoryIds } from "@/app/lib/helpers";
import cat_json from '../../data/category.json'
import bccat_json from '../../data/bc_categories_20241213.json'

const ProductsSection = ({category}) => {
    const onloadParams = {
        include:"images",
        page:1,
        'categories:in': getCategoryIds(category, cat_json, bccat_json).join(",")
    };
    const [productsParams, setProductsParams] = useState(onloadParams); 
    const {
        products,
        loading:products_loading,
        error:products_error,
        refetch: productsRefetch
     } = useFetchProducts(productsParams);

     useEffect(()=>{
        // console.log("products loading: ",products_loading);
     },[products_loading]);

     const handleFilterChange = (val) => {
        // console.log("fchange",val);
        const uniqueCatIds = [...new Set(val.flatMap(item => item.cat_ids))];
        // console.log("uniqueCatIds",uniqueCatIds);
        setProductsParams(prev=>{
            let newParams = {
                ...prev,
                page:1 // reset to page 1 everytime the filter has changes
            }

            if(val.length>0){
                newParams["categories:in"] = uniqueCatIds.join(",");
            }else{
                delete newParams["categories:in"];
            }
            return newParams;
        });
     }

     useEffect(()=>{
        productsRefetch(productsParams);
     },[productsParams]);

    return (
        <div className="w-full">
            <div className="container mx-auto">
                {
                    products && 
                    <TuiFilterSort
                    category={category}
                    products={products}
                    loading={products_loading}
                    onFilterChange={handleFilterChange} />
                }
            </div>
        </div>
    )
}

export default ProductsSection;