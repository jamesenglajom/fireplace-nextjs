"use client";

import { useState, useEffect } from "react";
// import Link from "next/link";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  // MinusIcon,
  // PlusIcon,
  // Squares2X2Icon,
} from "@heroicons/react/20/solid";
import ProductCard from "../atom/ProductCard";
import ProductCardLoader from "../atom/ProductCardLoader";
import QuickView from "@/app/components/atom/ProductQuickView"
import { getPageData } from "@/app/lib/helpers";
import { flatCategories } from "@/app/lib/category-helpers";

import FilterSelectItem from "@/app/components/atom/FilterSelectItem";
import FilterDrawer from "@/app/components/molecule/FilterDrawer";

import FilterSelectItemV2 from "@/app/components/atom/FilterSelectItemv2";
import FilterDropdownSelect from "@/app/components/atom/FilterDropdownSelect";

import { useSearchParams } from "next/navigation";

import FilterChipsWrapper from "@/app/components/section/FilterChipsWrapper";

const sortOptions = [
  {
    name: "Most Popular",
    sort: "total_sold",
    direction: "desc",
    current: true,
  },
  // { name: 'Best Rating', sort: 'rating', direction:'desc', current: false },
  { name: "Newest", sort: "id", direction: "desc", current: false }, // using id as replacement for date_created for sorting
  {
    name: "Price: Low to High",
    sort: "price",
    direction: "asc",
    current: false,
  },
  {
    name: "Price: High to Low",
    sort: "price",
    direction: "desc",
    current: false,
  },
];

const loaderArray = [1, 2, 3, 4, 5, 6, 7, 8];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const BASE_URL = process.env.NEXT_PUBLIC_SITE_BASE_URL;

export default function TuiFilterSort({
  category,
  products,
  pagination,
  filters: productFilters,
  loading,
  noResult,
  onSortChange,
  onPageChange,
  onFilterChange,
}) {
  const searchParams = useSearchParams();
  const [quickview, setQuickview] = useState(null);
  const [sort, setSort] = useState(sortOptions);
  const [displayProducts, setDisplayProducts] = useState([]);
  const [filters, setFilters] = useState({});
  // HANDLE PARAMS FILTER
  useEffect(() => {
    if (Object.keys(productFilters).length > 0) {
      setFilters(productFilters);
    }
  }, [productFilters, searchParams]);

  const activeCategoryName = (category) => {
    if (category === "all-products") {
      return "All Products";
    } else {
      return getPageData(category, flatCategories)?.name;
    }
  };
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    if (products && products.length > 0) {
      if (pagination.current_page !== 1) {
        setDisplayProducts((prev) => [
          ...prev,
          ...products.map((i) => ({ ...i, isSelected: false })),
        ]);
      } else {
        setDisplayProducts(products.map((i) => ({ ...i, isSelected: false })));
      }
    }
  }, [products, pagination]);

  const handleSort = (option) => {
    onSortChange(option);
    setSort((prev) =>
      prev.map((i) => {
        return { ...i, current: i.name === option.name };
      })
    );
  };

  const handleShowMorePagination = (page) => {
    onPageChange(page);
  };

  const handleProductItemClick = (id) => {
    // alert(`Product ID (${id}) is Clicked`);
    setDisplayProducts((prev) => {
      return prev.map((i) => ({ ...i, isSelected: i.id === id }));
    });
  };

  const handleFilterChange = (e) => {
    const { value, checked } = e.target;
    // console.log(`${value}: ${checked} (checked)`);
    const tmp = value.split(":");
    let filterValue = null;
    if (tmp.length > 1) {
      setFilters((prev) => {
        const property = tmp[0];
        prev[property]["options"] = prev[property]["options"].map((i) => {
          const checkValue = prev[property].multi
            ? i.prop == value
              ? checked
              : i.is_checked
            : i.prop == value
            ? checked
            : false;
          return {
            ...i,
            is_checked: checkValue,
          };
        });
        // console.log("prevValue", prev);
        filterValue = prev;
        return prev;
      });
    } else {
      setFilters((prev) => {
        prev[value]["is_checked"] = checked;
        filterValue = prev;
        return prev;
      });
    }

    onFilterChange(filterValue);
    return filterValue;
  };

  const handleFilterChipClose = (e) => {
    const tmp = {
      target: {
        value: e.prop,
        is_checked: false,
      },
    };
    handleFilterChange(tmp);
  };

  const handleQuickview = (value) => {
    console.log("quickviewitem", value)
    setQuickview(value)
  }

  const handleCloseQuickview = () => {
    console.log("closedQV");
    setQuickview(null)
  }
  return (
    <div className="bg-white">
      { products && <QuickView data={quickview} onClose={handleCloseQuickview}/>}
      <div className="relative">
        {/* Mobile filter dialog */}
        <Dialog
          open={mobileFiltersOpen}
          onClose={setMobileFiltersOpen}
          className="relative z-40 lg:hidden">
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 z-40 flex">
            <DialogPanel
              transition
              className="relative ml-auto flex size-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full">
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="-mr-2 flex size-10 items-center justify-center rounded-md bg-white p-2 text-gray-400">
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="size-6" />
                </button>
              </div>

              {/* Filters */}
              <h3 className="sr-only">Categories</h3>

              {/* Filters */}
              <div className="relative">
                <h3 className="sr-only">Categories</h3>
                {/* {filters?.onsale && (
                  <div className="border-t py-5">
                    <FilterSelectItem
                      data={filters.onsale}
                      labelStyle="font-semibold uppercase text-stone-600"
                      onChange={handleFilterChange}
                    />
                  </div>
                )}
                {filters?.quick_ship && (
                  <div className="border-t py-5">
                    <FilterSelectItem
                      data={filters.quick_ship}
                      labelStyle="font-semibold uppercase text-stone-600"
                      onChange={handleFilterChange}
                    />
                  </div>
                )}
                {filters?.brand && (
                  <div className="border-t py-5">
                    <FilterDrawer
                      data={filters.brand}
                      multiSelect={true}
                      onFilterItemChange={handleFilterChange}
                    />
                  </div>
                )} */}
                {filters?.price && (
                  <div className="border-t py-5">
                    <FilterDrawer
                      data={filters.price}
                      multiSelect={false}
                      onFilterItemChange={handleFilterChange}
                    />
                  </div>
                )}
                {/* {filters?.fuel_type && (
                  <div className="border-t py-5">
                    <FilterDrawer
                      data={filters.fuel_type}
                      onFilterItemChange={handleFilterChange}
                    />
                  </div>
                )} */}
              </div>
            </DialogPanel>
          </div>
        </Dialog>

        <main className="px-2 sm:px-4 relative bg-white">
          <div className="border-b border-gray-200 pb-2 pt-6 sticky top-[40px] bg-white z-[5]">
            <div className="flex items-baseline justify-between ">
              <h1 className="text-sm md:text-4xl font-bold tracking-tight text-gray-900">
                {`${activeCategoryName(category)}`}{" "}
                <span className="font-normal text-sm md:text-2xl">{`${
                  pagination &&
                  pagination.total !== 0 &&
                  pagination.total !== undefined
                    ? `(${pagination?.total})`
                    : ""
                }`}</span>
              </h1>

              <div className="flex items-center">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                      {`${sort.find(({ current }) => current === true).name}`}
                      <ChevronDownIcon
                        aria-hidden="true"
                        className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                      />
                    </MenuButton>
                  </div>

                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in">
                    <div className="py-1">
                      {sort.map((option) => (
                        <MenuItem key={option.name}>
                          <div
                            className={classNames(
                              option.current
                                ? "font-medium text-gray-900"
                                : "text-gray-500",
                              "block px-4 py-2 text-sm data-[focus]:bg-gray-100 data-[focus]:outline-none cursor-default"
                            )}
                            onClick={() => handleSort(option)}>
                            {option.name}
                          </div>
                        </MenuItem>
                      ))}
                    </div>
                  </MenuItems>
                </Menu>

                {/* <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                                <span className="sr-only">View grid</span>
                                <Squares2X2Icon aria-hidden="true" className="size-5" />
                            </button> */}
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(true)}
                  className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden">
                  <span className="sr-only">Filters</span>
                  <FunnelIcon aria-hidden="true" className="size-5" />
                </button>
              </div>
            </div>
            <div className="hidden lg:flex items-center justify-between mt-3">
              <div className="flex items-center gap-[4px]">
                {/* FILTER HERE */}
                {/* {filters?.onsale && (
                  <FilterSelectItemV2
                    data={filters.onsale}
                    onChange={handleFilterChange}
                  />
                )}
                {filters?.quick_ship && (
                  <FilterSelectItemV2
                    data={filters.quick_ship}
                    onChange={handleFilterChange}
                  />
                )}
                {filters?.free_shipping && (
                  <FilterSelectItemV2
                    data={filters.free_shipping}
                    onChange={handleFilterChange}
                  />
                )}
                {filters?.brand && (
                  <FilterDropdownSelect
                    data={filters.brand}
                    multiSelect={false}
                    onFilterItemChange={handleFilterChange}
                  />
                )} */}
                {filters?.price && (
                  <FilterDropdownSelect
                    data={filters.price}
                    multiSelect={false}
                    onFilterItemChange={handleFilterChange}
                  />
                )}
              </div>
            </div>
          </div>

          {
            <FilterChipsWrapper
              filters={filters}
              onChipClose={handleFilterChipClose}
            />
          }

          <section aria-labelledby="products-heading" className="pb-24 sm:pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>
            <div className="grid grid-cols-1 gap-x-8 gap-y-5 md:gap-y-10 lg:grid-cols-4">
              {/* Product grid */}
              <div className="lg:col-span-4 overflow-hidden p-[0px] md:p-5">
                {loading ? (
                  <div className="grid sm:gap-3 lg:grid-cols-4 lg:gap-5 grid-cols-2 gap-2">
                    {loaderArray.map((v, i) => (
                      <div key={`product-loader-${i}`}>
                        <ProductCardLoader />
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    {noResult ? (
                      <div className="flex justify-center">
                        <div className="text-stone-500 text-3xl py-10 font-bold">
                          Nothing to display
                        </div>
                      </div>
                    ) : (
                      <div className="grid sm:gap-3 lg:grid-cols-4 lg:gap-6 grid-cols-2 gap-2">
                        {displayProducts.map((v, i) => (
                          <div
                            key={`product-display-${i}-${v.id}`}
                            onClick={() => handleProductItemClick(v.id)}>
                            <ProductCard product={v} onQuickView={handleQuickview}/>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
                {pagination && pagination.total_pages !== 0 && (
                  <div className="w-full flex justify-between items-center mt-10 flex-col">
                    <div className="text-center order-2">
                      Showing{" "}
                      {pagination.current_page === 1
                        ? "1"
                        : `1 to ${
                            pagination?.current_page
                              ? pagination?.current_page
                              : "0"
                          }`}{" "}
                      of {pagination.total_pages} Pages ({pagination.total}{" "}
                      total items)
                    </div>
                    <button
                      disabled={
                        pagination.current_page === pagination.total_pages
                      }
                      onClick={() =>
                        handleShowMorePagination(pagination.current_page + 1)
                      }
                      className={`order-1 bg-pallete-orange text-white px-[25px] py-[7px] rounded-md`}>
                      Show More
                    </button>
                  </div>
                )}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
