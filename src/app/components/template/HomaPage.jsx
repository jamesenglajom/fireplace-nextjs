"use client";
import dynamic from "next/dynamic";
import MobileLoader from "@/app/components/molecule/MobileLoader";
// home page section import in order
import TuiHero from "@/app/components/template/tui_hero";
// import FeatureCategoriesSection from "@/app/components/section/HomePageFeatureCategories";
const FeatureCategoriesSection = dynamic(
  () => import("@/app/components/section/HomePageFeatureCategories"),
  {
    ssr: false,
  }
);
// import ShopAllClearanceSection from "@/app/components/section/HomePageShopAllClearance";
const ShopAllClearanceSection = dynamic(
  () => import("@/app/components/section/HomePageShopAllClearance"),
  {
    ssr: false,
  }
);
import AboutProductSection from "@/app/components/section/HomePageAboutProduct";
// import ReviewsSection from "@/app/components/section/HomePageReviews";
const ReviewsSection = dynamic(
  () => import("@/app/components/section/HomePageReviews"),
  {
    ssr: false,
  }
);
import ShopCategorySection from "@/app/components/section/HomePageShopCategory";
import GuidesAndInspirationSection from "@/app/components/section/HomePageGuidesAndInspiration";
// import ShopOpenBoxSection from "@/app/components/section/HomePageShopOpenBox";
const ShopOpenBoxSection = dynamic(
  () => import("@/app/components/section/HomePageShopOpenBox"),
  {
    ssr: false,
  }
);
import PartsAndAccessoriesSection from "@/app/components/section/HomePagePartsAndAccessories";
import FrequentlyAskedSection from "@/app/components/section/HomePageFrequentlyAsked";
import NewsLetterSection from "@/app/components/section/NewsLetter";

export default function HomePageWrapper({ data }) {
  return (
    <div>
      <MobileLoader />
      <TuiHero data={data} />
      <FeatureCategoriesSection />
      {/* <ShopAllClearanceSection /> */}
      <AboutProductSection />
      <ReviewsSection />
      <ShopCategorySection />
      <GuidesAndInspirationSection />
      <ShopOpenBoxSection />
      <PartsAndAccessoriesSection />
      <FrequentlyAskedSection />
      <NewsLetterSection />
    </div>
  );
}
