import { notFound } from 'next/navigation';
import ProductsSection from '../components/section/Products';
import TuiHero from "../components/template/tui_hero"
import cat_json from "../data/category.json"
export default async function CategoryPage({ params }) {
    const slug = (await params)?.slug;
    if(cat_json.filter(i=> i.menu.visible === true && i.menu.href === slug).length === 0){
        return notFound();
    }
    return (
        <div>
            <TuiHero />
            <ProductsSection category={slug} />
        </div>
    );
}

