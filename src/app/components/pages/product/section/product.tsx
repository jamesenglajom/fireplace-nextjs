
import ProductMetaTabs from "@/app/components/product/meta/Tabs";
import MediaGallery from "@/app/components/widget/MediaGallery";
import ProductToCart from "@/app/components/widget/ProductToCart";
import RelatedProducts from "@/app/components/widget/RelatedProducts";
const ProductSection = () => {
  const mediaItems = [
    { type: "image", src: "https://m.media-amazon.com/images/I/713yemIsaPL._AC_SX679_.jpg" },
    { type: "image", src: "https://m.media-amazon.com/images/I/713yemIsaPL._AC_SX679_.jpg" },
    { type: "image", src: "https://m.media-amazon.com/images/I/713yemIsaPL._AC_SX679_.jpg" },
    { type: "image", src: "https://m.media-amazon.com/images/I/713yemIsaPL._AC_SX679_.jpg" },
    { type: "image", src: "https://m.media-amazon.com/images/I/713yemIsaPL._AC_SX679_.jpg" },
    { type: "image", src: "https://m.media-amazon.com/images/I/713yemIsaPL._AC_SX679_.jpg" },
    { type: "image", src: "https://m.media-amazon.com/images/I/713yemIsaPL._AC_SX679_.jpg" },
    { type: "video", src: "https://www.w3schools.com/html/mov_bbb.mp4" },
  ];
  return <>
    <div className="p-4">
        <div className="container mx-auto flex gap-[10px] py-[60px]">
          <div className="flex-1">
            <MediaGallery mediaItems={mediaItems}/>
          </div>
          <div className="flex-1">
            <ProductToCart />
          </div>
        </div>
      </div>
    <div className="p-4">
      <div className="container mx-auto">
        <ProductMetaTabs />
      </div>
    </div>
    <div className="p-4">
      <div className="container mx-auto">
        <RelatedProducts />
      </div>
    </div>
    </>
}

export default ProductSection;  