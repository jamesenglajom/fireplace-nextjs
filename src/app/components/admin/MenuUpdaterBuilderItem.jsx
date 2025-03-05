"use client";
import React, { useState, useEffect } from "react";
import { MingcuteDownLine, MingcuteUpLine } from "@/app/components/icons/lib";
function MenuUpdaterBuilderItem({ item, itemList, onChange }) {
  const [expanded, setExpanded] = useState(false);
  const [localItem, setLocalItem] = useState(null);
  const [parentList, setParentList] = useState([]);
  const [parent, setParent] = useState(0);
  const [order, setOrder] = useState(0);
  const [orderOptions, setOrderOptions] = useState([]);

  const handleRemoveItem = () => {
    if (
      confirm(
        "This action will delete item and it's children data. Are you sure you want to remove?"
      )
    ) {
      onChange({ action: "remove", target: item.menu_id });
    }
  };

  const handleParentChange = (e) => {
    const { value } = e.target;
    console.log("parentIdOnParentChange", value);
    setParent(value);
    onChange({
      action: "parentChange",
      target: { parent_id: value, item: item },
    });
  };

  const handleOrderChange = (e) => {
    const { value } = e.target;
    console.log("handeOrderChange", value);
    setOrder(value);
    onChange({
      action: "orderChange",
      target: { order: value, item: item },
    });
  };

  const generateOrderOptions = (N) => {
    return Array.from({ length: N }, (_, i) => ({
      value: i + 1,
      label: `${i + 1} of ${N}`,
    }));
  };

  const handleInputChange = (trigger, event) => {
    const { value } = event.target;
    let newLocalItem = { ...localItem };
    switch (trigger) {
      case "image_src":
        newLocalItem.banner.img.src = value;
        break;
      case "image_alt":
        newLocalItem.banner.img.alt = value;
        break;
      case "banner_title":
        newLocalItem.banner.title = value;
        break;
      case "banner_tag_line":
        newLocalItem.banner.tag_line = value;
        break;
      case "page_contact":
        newLocalItem.page_contact_number = value;
        break;
      default:
        console.warn("Unknown trigger:", trigger);
    }

    onChange({
      action: "updateItem",
      target: { menu_id: newLocalItem.menu_id, item: newLocalItem },
    });
  };

  // useEffects --------------------------------------------------------------------------
  useEffect(() => {
    const flattenMenu = (menu) => {
      let result = [];

      const flatten = (items) => {
        for (const item of items) {
          result.push({ ...item }); // Store root & children
          if (item.children && item.children.length) {
            flatten(item.children); // Recursively flatten children
          }
        }
      };

      flatten(menu);
      return result;
    };
    if (itemList.length > 0) {
      const flatMenu = flattenMenu(itemList);
      setParentList([
        { menu_id: "", name: "No Parent" },
        ...flatMenu.filter((i) => i.menu_id !== item.menu_id),
      ]);
      // setOrderOptions
      const siblings = flatMenu.filter((i) => i.parent_id === item.parent_id);
      setOrderOptions(generateOrderOptions(siblings.length));
    }
  }, [itemList]);

  useEffect(() => {
    if (item) {
      setLocalItem(item);
      setParent(item?.parent_id);
      setOrder(item?.order);
    }
  }, [item]);

  return (
    <div>
      <div className="w-full text-left p-2 border-l border-b flex items-center justify-between">
        <div>
          <div className="font-semibold text-xs">{item.name}</div>
          <div className="text-[10px]">{item?.url?.path}</div>
        </div>
        <button onClick={() => setExpanded((prev) => !prev)}>
          {expanded ? <MingcuteUpLine /> : <MingcuteDownLine />}
        </button>
      </div>
      {expanded && (
        <div className="p-3 bg-stone-100 flex flex-col gap-[20px]">
          {/* <div>
            <button
              onClick={handleRemoveItem}
              className="text-xs text-white bg-red-500 px-2 py-1"
            >
              Remove menu item
            </button>
          </div> */}
          {/* <div>
            <div className="uppercase text-[10px] font-bold">Navigation</div>
            <hr className="border-t border-gray-300 my-1"></hr>
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white">
                URL
              </label>
              <input
                type="text"
                className="block w-full p-2 text-gray-900 border border-gray-300 bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white">
                Label
              </label>
              <input
                type="text"
                className="block w-full p-2 text-gray-900 border border-gray-300 bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="flex gap-[10px]">
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-900 dark:text-white">
                  Parent
                </label>
                <select
                  value={parent}
                  onChange={handleParentChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  {parentList.map((i) => (
                    <option key={i.menu_id} value={i.menu_id}>
                      {i.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-900 dark:text-white">
                  Order
                </label>
                <select
                  value={order}
                  onChange={handleOrderChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  {orderOptions.map((i) => (
                    <option key={`order-option-${item.menu_id}-${i.value}`} value={i.value}>
                      {i.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div> */}
          <div>
            <div className="uppercase text-[10px] font-bold">Content</div>
            <hr className="border-t border-gray-300 my-1"></hr>

            <div className="my-2 text-[10px] uppercase">Image</div>
            <div className="flex gap-[10px]">
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-900 dark:text-white">
                  URL
                </label>
                <input
                  value={localItem.banner.img.src ?? ""}
                  onChange={(e) => handleInputChange("image_src", e)}
                  type="text"
                  className="block w-full p-2 text-gray-900 border border-gray-300 bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>

              <div className="w-full">
                <label className="block text-sm font-medium text-gray-900 dark:text-white">
                  ALT
                </label>
                <input
                  value={localItem.banner.img.alt ?? ""}
                  onChange={(e) => handleInputChange("image_alt", e)}
                  type="text"
                  className="block w-full p-2 text-gray-900 border border-gray-300 bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
            </div>
            <div className="my-2 text-[10px] uppercase">Text</div>
            <div>
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-900 dark:text-white">
                  Title
                </label>
                <textarea
                  value={localItem?.banner?.title ?? ""}
                  onChange={(e) => handleInputChange("banner_title", e)}
                  className="block w-full p-2 text-gray-900 border border-gray-300 bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-900 dark:text-white">
                  Sub-Title
                </label>
                <textarea
                  value={localItem?.banner?.tag_line ?? ""}
                  onChange={(e) => handleInputChange("banner_tag_line", e)}
                  className="block w-full p-2 text-gray-900 border border-gray-300 bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
            </div>
            <div className="my-2 text-[10px] uppercase">Contact</div>
            <div>
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-900 dark:text-white">
                  Number
                </label>
                <input
                  value={localItem?.page_contact_number ?? ""}
                  onChange={(e) => handleInputChange("page_contact", e)}
                  type="text"
                  className="block w-full p-2 text-gray-900 border border-gray-300 bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MenuUpdaterBuilderItem;
