import "@/app/globals.css";
import {redis, keys, redisGet} from "@/app/lib/redis";
import { Montserrat } from "next/font/google";
// import localFont from "next/font/local";
import FixedHeader from "@/app/components/template/fixed_header";
import TuiNavBar from "@/app/components/template/tui_navbar";
import FreeShippingBanner from "@/app/components/molecule/FreeShippingBanner";
import Footer from "@/app/components/section/Footer";
import { CartProvider } from "@/app/context/cart";
import { QuickViewProvider } from "@/app/context/quickview";
import { SearchProvider } from "@/app/context/search";
import { FilterProvider } from "@/app/context/filter";
const MontserratFont = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-montserrat", // Optional for Tailwind usage
});
// const Bell = localFont({
//   src: "./fonts/bell-mt-italic.ttf",
//   weight: "100 900",
//   variable: "--font-bell",
//   display: "swap",
// });
export const metadata = {
  title: "Solana Fireplaces | Stylish Indoor & Outdoor Heating",
  description:
    "Transform your home with Solana Fireplaces! Add warmth and style with our wood, gas, and electric designs. Shop now and create your perfect space!",
};
export default async function MarketLayout({ children }) {
  const redisLogoKey = "admin_solana_market_logo";
  // const redisLogo = await redis.get(redisLogoKey);
  const menuKey = keys.active_menu.value;
  const mgetKeys = [menuKey, redisLogoKey];
  const [active_menu, redisLogo] = await redis.mget(mgetKeys);
  const menu = await redis.get(active_menu);
  console.log("active_menu", active_menu);
  console.log("menuuuuuuuuuuuuuuuuuuuuuussssss", menu)
  return (
    <html lang="en">
      <body className={`antialiased ${MontserratFont.className}`}>
        <FreeShippingBanner />
        <div className="hidden lg:block bg-pallete-orange py-[8px] px-[30px] text-white">
          <div className="container mx-auto  flex items-center justify-between">
            <div className="flex justify-between w-full">
              <div className="font-light text-xs">Promotions</div>
              <div className="font-light text-xs">Learning Center</div>
              <div className="font-light text-xs">Professional Program</div>
              <div className="font-light text-xs">Order Status</div>
              <div className="font-light text-xs">
                Why Buy From The Expert In Fire?
              </div>
            </div>
          </div>
        </div>
        <CartProvider>
          <FilterProvider>
          <SearchProvider>
            <TuiNavBar logo={redisLogo} menu={menu}/>
            <FixedHeader />
          <QuickViewProvider>
            {children}
          </QuickViewProvider>
          </SearchProvider>
          </FilterProvider>
        </CartProvider>
        <Footer />
      </body>
    </html>
  );
}
