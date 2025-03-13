
import CardWrap from "@/app/components/admin/CardWrap";
import Categories from "@/app/components/dev/BigCommerceCategories";
async function DevIndexPage() {
  return (
    <div className="px-2 flex flex-col gap-[20px] container mx-auto pb-5">
      <CardWrap>
        <div className="p-3 font-bold text-lg">Developers Page</div>
      </CardWrap>

      <Categories />
    </div>
  );
}

export default DevIndexPage;
