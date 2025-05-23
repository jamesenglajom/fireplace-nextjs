"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useFilter } from "@/app/context/filter";
const BASE_URL = process.env.NEXT_PUBLIC_SITE_BASE_URL;
export default function FilterSelectItem({
  data,
  labelStyle,
  multiSelect,
  onChange,
}) {
  const { addFilter, removeFilter } = useFilter();

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [item, setItem] = useState({
    prop: "",
    label: "",
    count: 0,
    is_checked: false,
  });
  useEffect(() => {
    // console.log("itemUpdate")
    setItem(data);
  }, [data]);
  const handleChange = (e) => {
    const { checked } = e.target;
    const filter_group = item.prop;
    // console.log("checked", checked);
    // console.log("filter_group", filter_group);
    // console.log("item", item);
    // console.log();
    if (checked) {
      addFilter(filter_group, !multiSelect);
    } else {
      removeFilter(filter_group);
    }
    onChange(e);
  };

  return (
    item && (
      <div className="flex  px-[10px]">
        <div className="flex h-5 w-5 shrink-0 items-center mr-5">
          <div className="group grid size-4 grid-cols-1  relative">
            <input
              checked={item.is_checked}
              value={item.prop}
              onChange={handleChange}
              id={item.prop}
              name={item.prop}
              type="checkbox"
              className="market col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
            />
            <div
              className={`absolute top-[3px] left-[3px] ${
                item.is_checked ? "visible" : "invisible"
              }`}
            >
              <svg
                fill="none"
                viewBox="0 0 14 14"
                className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
              >
                <path
                  d="M3 8L6 11L11 3.5"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="opacity-0 group-has-[:checked]:opacity-100"
                />
                <path
                  d="M3 7H11"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="opacity-0 group-has-[:indeterminate]:opacity-100"
                />
              </svg>
            </div>
          </div>
        </div>
        <div>
          <label
            htmlFor={item.prop}
            className={labelStyle ?? "text-sm text-stone-700 font-medium"}
          >
            {item.label}
            {` ${item.count ? `(${item.count})` : ""}`}
            {` `}
            {["on sale", "quick ship"].includes(item.label.toLowerCase()) ? (
              <span className="text-[10px]">Soon</span>
            ) : (
              <></>
            )}
          </label>
        </div>
      </div>
    )
  );
}
