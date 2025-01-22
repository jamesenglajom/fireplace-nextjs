import Image from "next/image";

export default function HomePageShopAllClearance() {
  return (
    <div className="w-full mt-5">
      <div className="container mx-auto p-[10px] md:p-[0px]">
        <div className="w-full flex flex-col md:flex-row gap-[20px]">
          <div className="w-full flex flex-col gap-[10px]">
            <div className="w-full aspect-2">
              <div className="w-full h-full flex items-center justify-center overflow-hidden rounded-lg relative">
                {/* <div className="font-extrabold text-stone-700 text-3xl">
                  CONTENT 1
                </div> */}
                {
                  // <img
                  //   src="/images/home/elevate-your-fireplace.webp"
                  //   alt=""
                  //   className="object-contain"
                  // />

                  <Image
                    src={"/images/home/elevate-your-fireplace.webp"}
                    alt={`Modern-Fireplace-Designs-Img`}
                    className="object-contain"
                    fill
                  />
                }
              </div>
            </div>
            <div className="text-center text-xl md:text-3xl font-semibold font-bell">
              Modern Fireplace Designs
            </div>
            <div className="text-center  font-bell">
              A modern fireplace can elevate your home, providing both warmth
              and a stylish focal point for family gatherings or quiet evenings.
              We offer a wide selection of fireplaces including wood-burning,
              gas, and electric.
            </div>
            <div className="text-center">
              <button className="border px-[20px] py-[8px] rounded-xl font-bell">
                Shop All Fireplaces
              </button>
            </div>
          </div>
          <div className="w-full flex flex-col gap-[10px]">
            <div className="w-full aspect-2">
              <div className="w-full h-full flex items-center justify-center overflow-hidden rounded-md relative">
                {/* <div className="font-extrabold text-stone-700 text-3xl">
                  CONTENT 2
                </div> */}

                {
                  // <img
                  //   src="/images/home/clearance.webp"
                  //   alt=""
                  //   className="object-contain"
                  // />

                  <Image
                    src={"/images/home/clearance.webp"}
                    alt={`Outdoor-Kitchen-Deals-Img`}
                    className="object-contain"
                    fill
                  />
                }
              </div>
            </div>
            <div className="text-center text-xl md:text-3xl font-semibold font-bell">
              Outdoor Kitchen Deals
            </div>
            <div className="text-center  font-bell">
              Create your dream backyard kitchen with top-of-the-line grills,
              BBQ islands, and all the essential accessories, all while taking
              advantage of great deals and savings.
            </div>
            <div className="text-center">
              <button className="border px-[20px] py-[8px] rounded-xl  font-bell">
                Shop All Outdoor Kitchen Deals
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
