"use client";
import { Rating } from "@smastrom/react-rating";
import ItemPrice from "@/app/components/atom/openBoxItemPrice";
import Carousel from "@/app/components/atom/Carousel";
const products = [
  {
    img: "/images/home/open-box/open-boxes-image-1.webp",
    name: "Open Box Blaze Premium - LTE 32-Inch 4-Burner Built-In Grill",
    brand: "Blaze Outdoor Products",
    sale_price: 1849,
    original_price: 2874.99,
    free_shipping: true,
    ratings: 5,
    reviews: 2,
  },
  {
    img: "/images/home/open-box/open-boxes-image-2.webp",
    name: "Blaze Infrared Sear Burner BLZ-IR (New)",
    brand: "Blaze Outdoor Products",
    sale_price: 99.99,
    original_price: 109.99,
    free_shipping: true,
    ratings: 0,
    reviews: 0,
  },
  {
    img: "/images/home/open-box/open-boxes-image-3.webp",
    name: "Blaze Double Side Burner Model BLZ-SB2LTE-OB (Open Box)",
    brand: "Blaze Outdoor Products",
    sale_price: 699.99,
    original_price: 999.99,
    free_shipping: true,
    ratings: 0,
    reviews: 0,
  },
  {
    img: "/images/home/open-box/open-boxes-image-4.webp",
    name: "Frame Only BLZ-AD32 Open Box (New)",
    brand: "Blaze Outdoor Products",
    sale_price: 69.99,
    original_price: 69.99,
    free_shipping: false,
    ratings: 0,
    reviews: 0,
  },
  {
    img: "/images/home/open-box/open-boxes-image-5.webp",
    name: "Blaze IR Burner BLZ-IR Open Box",
    brand: "Blaze Outdoor Products",
    sale_price: 79.99,
    original_price: 109.99,
    free_shipping: true,
    ratings: 0,
    reviews: 0,
  },
];
const carousel_breakpoints = [
  { minWidth: 0, value: 1 },
  { minWidth: 768, value: 2 },
  { minWidth: 1024, value: 3 },
  { minWidth: 1280, value: 4 },
  { minWidth: 1536, value: 5 },
];

export default function HomePageShopOpenBox() {
  return (
    <div className="w-full mt-10">
      <div className="container mx-auto p-[10px] md:p-[0px]">
        <div className="text-xl md:text-4xl underline italic font-semibold font-bell">
          Shop Open Box Blaze Products
        </div>
        <div className="flex flex-col md:flex-row gap-[10px] mt-5">
          <Carousel breakpoints={carousel_breakpoints}>
            {products.map((i, idx) => (
              <div
                key={`open-box-product-${idx}`}
                className="aspect-1 border w-full bg-[#f8f8f8]">
                <div className="relative">
                  <div className="text-white bg-red-700 absolute left-0 rounded-sm px-[15px] py-[5px]">
                    {"Open Box"}
                  </div>
                  <div
                    className={`${
                      i.sale_price < i.original_price ? "visible" : "invisible"
                    } text-white bg-red-700 absolute left-[10px] bottom-[3px] rounded-sm px-[15px] py-[5px]`}>
                    {"SALE"}
                  </div>
                  <div className="aspect-1 flex justify-center">
                    <img src={i.img} alt={i.name} />
                  </div>
                </div>
                <div className="flex items-center justify-center py-[10px]">
                  <div className="rounded-full border-[2px] border-stone-300 px-[15px] py-[3px] text-red-700 font-bold cursor-pointer">
                    Quickview
                  </div>
                </div>
                <div className="flex flex-col gap-[5px] p-[10px]">
                  <div className="h-[45px]">
                    <div className="line-clamp-2">{i.name}</div>
                  </div>
                  <div
                    className={`text-red-700 text-sm font-bold ${
                      i.free_shipping ? "visible" : "invisible"
                    }`}>
                    Free Shipping
                  </div>
                  <div className="text-stone-700 underline text-sm">
                    {i.brand}
                  </div>
                  <div className="text-sm">
                    <ItemPrice
                      sale_price={i.sale_price}
                      original_price={i.original_price}
                    />
                  </div>
                  <div
                    className={`flex items-center gap-[3px] ${
                      i.ratings !== 0 ? "visible" : "invisible"
                    }`}>
                    <Rating
                      readOnly
                      value={i.ratings}
                      fractions={2}
                      style={{ maxWidth: 80 }}></Rating>
                    <div className={``}>{i.reviews} Reviews</div>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
        <div className="mt-5 text-center">
          <button className="px-[20px] py-[7px] bg-red-600 text-white font-bold rounded-xl cursor-pointer">
            Shop All Open Box Blaze Products
          </button>
        </div>
      </div>
    </div>
  );
}
