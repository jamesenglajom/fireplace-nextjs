"use client";
import React, { useState } from "react";
import CardWrap from "@/app/components/admin/CardWrap";
import { bc_categories } from "@/app/lib/category-helpers";
import MenuItem from "@/app/components/admin/MenuUpdaterBuilderItem"

const menu_list = [
  { id: "solana_menu_2024_12_10_menu", name: "2024-12-10 Menu" },
  { id: "solana_menu_2024_11_10_menu", name: "2024-11-10 Menu" },
  { id: "solana_menu_2024_10_10_menu", name: "2024-10-10 Menu" },
  { id: "solana_menu_2024_09_10_menu", name: "2024-09-10 Menu" },
];

const origin_menu = bc_categories
  .sort((a, b) => a.name.localeCompare(b.name))
  .map((i) => ({ ...i, selected: false }));
  console.log("origin_menu", origin_menu);
const selected_menu = "solana_menu_2024_12_10_menu";
const initial_menu = {
  name: "Home",
  meta_title: "",
  meta_description: "",
  path: "/",
  url: "/",
  banner: {
    image: {
      url: "",
      alt: "",
    },
    text: {
      title: "",
      sub: "",
    },
  },
  menu: {
    href: "",
    visible: true,
  },
  key_words: [],
  contact: "",
  searchable: false,
  children: "",
  readOnly: true,
};
function MenuUpdater() {
  const [menu, setMenu] = useState([]);
  const [originMenu, setOriginMenu] = useState(origin_menu);
  const [originMenuSearch, setOriginMenuSearch] = useState("");

  const handleInputChange = (element, event) => {
    const { value } = event.target;
    console.log(element, value);
    if (element === "originMenuSearch") {
      setOriginMenuSearch(value);
      // filter origin menu
      setOriginMenu(
        origin_menu.filter(
          (i) =>
            i.name.toLowerCase().includes(value) || i?.url?.path.includes(value)
        )
      );
    }
  };

  const handleOriginMenuCheckbox = (e) => {
    const {value, checked } = e.target
    setOriginMenu(prev=>{
        return prev.map(i=> ({...i, selected: parseInt(value) === parseInt(i.category_id) ? checked:i.selected}));
    });
    console.log("checkboxChanged!", `${value}:${checked}`)
  };

  const highlightText = (text, query) => {
    if (!query) return text;
      // Escape special characters in query
     const safeQuery = query.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
    const regex = new RegExp(`(${safeQuery})`, "gi");
    return text.split(regex).map((part, index) =>
      part.toLowerCase() === safeQuery.toLowerCase() ? (
        <span key={index} className="bg-yellow-300 text-black px-1">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const generateId = () => {
    return Math.random().toString(36).substring(2, 11);
  }

  const handleAddPage = () => {
    console.log("handleAddPageTrigger", originMenu.filter(i=> i.selected));
    const selected = originMenu.filter(i=> i.selected);
    // need to format object from here
    const mapped = selected.map(i=> ({...i, menu_id:generateId() })) // insert menu_id as unique identifier for each menu items added
    console.log("selected",mapped)
    console.log("selected -------------------------------------")
    setMenu(prev=>([...prev, ...mapped]))
  }


  const removeMenuItem = (menu, menu_id) => {
    return menu
      .map(parent => {
        // Recursively filter children
        if (parent.children && parent.children.length) {
          parent.children = removeMenuItem(parent.children, menu_id);
        }
        // Remove if parent itself is the target
        return parent.menu_id !== menu_id ? parent : null;
      })
      .filter(Boolean); // Remove null values (deleted parents)
  }


  const handleMenuItemChanges = (e) => {
    const {action, target } = e;
    if(action === "remove"){
        // removeItem
        setMenu(prev=> removeMenuItem(prev, target));
    }
  }
  return (
    <section>
      <CardWrap>
        <div className="p-3">
          <div className="font-bold text-lg">Menu Builder</div>
          <div className="text-sm mb-2">
            Select a menu to edit or{" "}
            <span className="cursor-pointer text-blue-600 hover:text-blue-700">
              create a new menu
            </span>
            . <b>Don't forget to save changes.</b>
          </div>
          <div>
            <select
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              {menu_list.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <hr className="border-t border-gray-300 my-4"></hr>
          <div className="flex gap-[20px] overflow-hidden">
            <div className="border rounded w-[250px] h-[calc(100vh-100px)]">
              <div className="w-full border bg-stone-300 text-xs p-2 flex items-center justify-between">
                <div className="font-semibold">Pages</div>
                <button onClick={handleAddPage} className="text-blue-600 hover:text-blue-700 underline cursor-pointer">
                  Add
                </button>
              </div>
              <div className="p-1">
                <input
                  type="text"
                  id="small-input"
                  className="block w-full p-2 text-gray-900 border border-gray-300 bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={originMenuSearch}
                  onChange={(e) => handleInputChange("originMenuSearch", e)}
                />
              </div>
              <div className="overflow-y-auto h-[calc(100%-74px)]">
                {originMenu.map((item, index) => (
                    <label
                    key={`${item.category_id}-${index}`}
                    htmlFor={`origin-menu-${item.category_id}`}
                    >
                    <div
                        className=" p-2 border-t cursor-pointer"
                    >
                        <div className="flex items-center gap-[8px]">
                        <input
                            id={`origin-menu-${item.category_id}`}
                            type="checkbox"
                            value={item.category_id}
                            checked={item.selected}
                            onChange={handleOriginMenuCheckbox}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <div className="w-[calc(100%-30px)]">
                            <div className="font-semibold text-xs">{highlightText(item.name, originMenuSearch)}</div>
                            <div className="text-[10px]">{highlightText(item?.url?.path, originMenuSearch)}</div>
                        </div>
                        </div>
                    </div>
                </label>
                ))}
              </div>
              <div></div>
            </div>
            <div className="border rounded w-[calc(100%-270px)]">
              <div className="w-full border bg-stone-300 text-xs p-2 font-semibold">
                Menu
              </div>
              <div className="p-1">
                <input
                  type="text"
                  id="small-input"
                  placeholder="Menu Name"
                  className="block w-full p-2 text-gray-900 border border-gray-300 bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>

              <div className="p-1">
                <div>
                  {menu.map((item, index) => (
                    // <div
                    //   key={`${item.id}-${index}`}
                    //   className=" p-2 border-t cursor-pointer"
                    // >
                    //   <div className="font-semibold text-xs">{item.name}</div>
                    //   <div className="text-[10px]">{item?.url?.path}</div>
                    // </div>
                    <MenuItem 
                    key={`${item.id}-${index}`}
                    item={item}
                    onChange={handleMenuItemChanges}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardWrap>
    </section>
  );
}

export default MenuUpdater;
