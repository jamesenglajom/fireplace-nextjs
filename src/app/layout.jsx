import { Inter, Bellefair, Montserrat } from "next/font/google";
import "./globals.css";
import FixedHeader from "./components/template/fixed_header";
import TuiNavBar from "./components/template/tui_navbar";
import FreeShippingBanner from "@/app/components/molecule/FreeShippingBanner";
import Footer from "@/app/components/section/Footer";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], // Specify weights as needed
});
const bell = Bellefair({
  subsets: ["latin"],
  weight: ["400"], // Specify weights as needed
});

const MontserratFont = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Solana Fireplaces | Stylish Indoor & Outdoor Heating",
  description:
    "Transform your home with Solana Fireplaces! Add warmth and style with our wood, gas, and electric designs. Shop now and create your perfect space!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${MontserratFont.className} antialiased`}>
        <FreeShippingBanner />
        <div className="hidden md:block bg-pallete-orange py-[8px] px-[30px] text-white">
          <div className="container mx-auto  flex items-center justify-between">
            <div className="flex justify-between w-[80%]">
              <div className="font-extralight">Promotions</div>
              <div className="font-extralight">Learning Center</div>
              <div className="font-extralight">Professional Program</div>
              <div className="font-extralight">Order Status</div>
              <div className="font-extralight">
                Why Buy From The Expert In Fire?
              </div>
            </div>
            <div className="w-[20%] text-right">SignIn | SignUp</div>
          </div>
        </div>
        <TuiNavBar />
        <FixedHeader></FixedHeader>
        {children}
        <Footer />
      </body>
    </html>
  );
}
