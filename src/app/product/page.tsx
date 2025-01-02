import ProductSection from "../components/pages/product/section/product";
import TuiNavbar from "../components/template/tui_navbar";
export default function Product() {
  return (
    <>
      <TuiNavbar />
      <div>
        <ProductSection product={[]} />
      </div>
    </>
  );
}
