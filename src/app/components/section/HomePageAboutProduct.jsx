import Image from "next/image";
import { ICRoundPhone } from "../icons/lib";
export default function HomePageAboutProduct() {
  const img = "/images/banner/fireplace-banner.webp";
  return (
    <div className="w-full mt-5">
      <div className="container mx-auto bg-[#F6F6F6]">
        <div className="w-full flex flex-col md:flex-row">
          <div className="w-full md:w-[60%] p-[40px] flex flex-col gap-[30px]">
            <div className="text-xl md:text-3xl font-semibold font-bell">
              {/* About Blaze Grill Products */}
              About Solana Fireplaces
            </div>
            <div className="relative w-full flex items-center justify-center md:hidden">
              {
                // <img
                //   src="/images/home/about-blaze.webp"
                //   alt=""
                //   className="w-full"
                // />
                <Image
                  // src="/images/home/about-blaze.webp"
                  src={img}
                  alt="About-Blaze-Image"
                  width={1000}
                  height={0}
                />
              }
            </div>
            <div className="text-sm md:text-base">
              <p className="text-left">
                At Solana Fireplaces, we believe that the heart of a home
                extends beyond its walls. We specialize in creating exceptional
                outdoor living experiences through our expertly curated
                selection of high-quality fireplaces, fire pits, and related
                accessories. We are committed to providing you with products and
                the knowledge and support you need to transform your outdoor
                space into a warm, inviting haven.
              </p>
              <p className="text-left mt-[20px]">
                Beyond fireplaces, Solana also caters to outdoor living
                enthusiasts by offering a wide range of outdoor kitchen
                products. Our selection includes top-of-the-line grills, BBQ
                islands, and accessories to create the ultimate outdoor cooking
                and entertainment area. With Solana Fireplaces, you can rely on
                our expertise and dedication to quality, knowing that you are
                choosing a partner committed to enhancing your home and
                lifestyle with the best in both indoor and outdoor heating and
                cooking solutions.
              </p>
            </div>
            <div className="flex justify-center md:justify-start">
              <button className="bg-red-600 text-white py-[7px] px-[25px] rounded-md flex items-center gap-[10px]">
                <ICRoundPhone />

                <div>Call Now</div>
                <div>888-667-4986</div>
              </button>
            </div>
          </div>
          <div className="hidden md:block w-full md:w-[40%] p-[40px]">
            <div className="relative w-full flex items-center justify-center">
              {
                // <img
                //   src="/images/home/about-blaze.webp"
                //   alt=""
                //   className="w-full"
                // />
                <Image
                  // src="/images/home/about-blaze.webp"
                  src={img}
                  alt="About-Blaze-Image"
                  width={1000}
                  height={0}
                />
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
