"use client";
import MobileLoader from "@/app/components/molecule/MobileLoader";
// home page section import in order
import TuiHero from "@/app/components/template/tui_hero";
import FeatureCategoriesSection from "@/app/components/section/HomePageFeatureCategories";
import ShopAllClearanceSection from "@/app/components/section/HomePageShopAllClearance";
import AboutProductSection from "@/app/components/section/HomePageAboutProduct";
import ReviewsSection from "@/app/components/section/HomePageReviews";
import ShopCategorySection from "@/app/components/section/HomePageShopCategory";
import GuidesAndInspirationSection from "@/app/components/section/HomePageGuidesAndInspiration";
import ShopOpenBoxSection from "@/app/components/section/HomePageShopOpenBox";
import PartsAndAccessoriesSection from "@/app/components/section/HomePagePartsAndAccessories";
import FrequentlyAskedSection from "@/app/components/section/HomePageFrequentlyAsked";
import NewsLetterSection from "@/app/components/section/NewsLetter";

export default function HomePageWrapper({ data }) {
  return (
    <div>
      <MobileLoader />
      <TuiHero data={data} />
      {/* <FeatureCategoriesSection /> */}
      <ShopAllClearanceSection />
      <AboutProductSection />
      {/* <ReviewsSection /> */}
      <ShopCategorySection />
      <GuidesAndInspirationSection />
      {/* <ShopOpenBoxSection /> */}
      <PartsAndAccessoriesSection />
      <FrequentlyAskedSection />
      <NewsLetterSection />
    </div>
  );
}
