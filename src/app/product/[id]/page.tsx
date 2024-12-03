'use client'
import ProductSection from "@/app/components/pages/product/section/product";
import React, {useState,useEffect} from "react";
export default function Product({params}:Promise<{params: {id:string}}>) {
  const {id} = React.use(params);
  const [product,setProduct] = useState(null);
  useEffect(() => {
    fetch('/data/products.json') // URL relative to the public folder
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setProduct(data.filter(i=> parseInt(i.id) === parseInt(id))[0]);
      })
      .catch((error) => console.error('Error loading products:', error));
  }, []);

  
  return (
    <div>
      <ProductSection product={product}/>
    </div>
  );
}
