import HeroCarousel from './components/widget/HeroCarousel';
import ProductShopNowList from './components/product/list/ShopNow';
import ProductsSection from './components/section/Products';
export default function Home() {
  
  const slides = [
    {
      position: "justify-left",
      background:"/images/carousel/c4c63680-0b5b-4011-8ec8-8de26c0455ed.webp",
      headline: {
        text: "Headline One",
        twClass: ""
      },
      subheadline: {
        text:"Subheadline: Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi quasi id voluptate aperiam quae ex, soluta quod perspiciatis fuga magnam.",
        twClass:"text-[18px] max-w-[500px]"
      },
      cta: {
        href: "/",
        label: "Shop for a Fireplace",
        twClass:"text-[18px] text-white bg-pallete-orange px-[30px] py-[10px] rounded-full",
        position: "flex w-full"
      }
    },
    
    {
      position: "justify-center",
      background:"/images/carousel/2.jpg",
      headline: {
        text: "Headline Two",
        twClass: "font-bold text-5xl text-white text-center"
      },
      subheadline: {
        text:"Subheadline: Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi quasi id voluptate aperiam quae ex, soluta quod perspiciatis fuga magnam.",
        twClass:"text-[18px] max-w-[500px] text-center"
      },
      cta: {
        href: "/",
        label: "Shop for a Fireplace",
        twClass:"text-[18px] text-white bg-pallete-orange px-[30px] py-[10px] rounded-full",
        position: "flex justify-center w-full"
      }
    },
    
    {
      position: "justify-end",
      background:"/images/carousel/3.jpg",
      headline: {
        text: "Headline Three",
        twClass: "font-bold text-5xl text-white text-right"
      },
      subheadline: {
        text:"Subheadline: Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi quasi id voluptate aperiam quae ex, soluta quod perspiciatis fuga magnam.",
        twClass:"text-[18px] max-w-[500px] text-right"
      },
      cta: {
        href: "/",
        label: "Shop for a Fireplace",
        twClass:"text-[18px] text-white bg-pallete-orange px-[30px] py-[10px] rounded-qfull",
        position: "flex justify-end w-full"
      }
    }
  ]
  return (
    <div>
      <HeroCarousel slides={slides}/>
      <ProductShopNowList />
      <ProductsSection />
    </div>
  );
}
