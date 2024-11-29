import HeroCarousel from './components/widget/HeroCarousel';
import ProductShopNowList from './components/product/list/ShopNow';
import ProductsSection from './components/section/Products';
export default function Home() {
  return (
    <div>
      <HeroCarousel />
      <ProductShopNowList />
      <ProductsSection />
    </div>
  );
}
