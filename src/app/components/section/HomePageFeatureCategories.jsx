"use client";
import Carousel from "@/app/components/atom/Carousel";
import Image from "next/image";

const items = [
  { label: "Fireplace", img: "/images/home/categories/Fireplace.webp" },
  { label: "Fire Pits", img: "/images/home/categories/firepits.webp" },
  { label: "BBQ Grills", img: "/images/home/categories/bbq_grills.webp" },
  {
    label: "Outdoor Kitchen & Islands",
    img: "/images/home/categories/outdoor_kitchen.webp",
  },
  { label: "Chimney", img: "/images/home/categories/chimney.webp" },
  { label: "Gas Logs", img: "/images/home/categories/gas_logs.webp" },
  { label: "Clearance", img: "/images/home/categories/clearance.webp" },
];

const items_per_break_point = [
  { minWidth: 0, value: 1 },
  { minWidth: 640, value: 2 },
  { minWidth: 768, value: 4 },
  { minWidth: 1024, value: 6 },
  { minWidth: 1280, value: 7 },
];

export default function HomePageFeatureCategories() {
  return (
    <div className="w-full mt-1">
      <div className="container mx-auto overflow-hidden">
        <Carousel breakpoints={items_per_break_point}>
          {items.map((v, idx) => (
            <div
              key={`feature-category-item-${idx}`}
              className={`min-w-[140px] w-[140px] flex flex-col gap-[8px] group relative`}>
              <div
                className={`relative bg-red-400 h-[130px] flex items-center justify-center group-hover:border group-hover:bg-stone-100 rounded-md overflow-hidden transition-all duration-500`}>
                {/* <div>image Here</div> */}
                {
                  // <img
                  //   src={v.img}
                  //   alt=""
                  //   className="object-contain h-[150px]"
                  // />
                  <Image
                    src={v.img}
                    alt={`${v.label}-image`}
                    className="w-full h-full object-contain"
                    width={500}
                    height={500}
                    // loading="eager"
                    // priority={false}
                  />
                }
              </div>
              <div
                className={`flex items-center justify-center w-full h-[60px] overflow-hidden`}>
                <div className="break-words text-center">{v.label}</div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}
