"use client";
import React, { useState } from "react";
import { MingcuteDownLine, MingcuteUpLine } from "@/app/components/icons/lib";
function MenuUpdaterBuilderItem({ item, itemList, onChange }) {
  const [expanded, setExpanded] = useState(false);
  const handleRemoveItem = () => {
    if(confirm("This action will delete item and it's children data. Are you sure you want to remove?")){
        onChange({action: "remove", target: item.menu_id})
    }
  }

  return (
    <div>
      <div className="w-full text-left p-2 border-t flex items-center justify-between">
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
          <div>
            <button onClick={handleRemoveItem} className="text-xs text-white bg-red-500 px-2 py-1">Remove menu item</button>
          </div>
          <div>
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
                <input
                  type="text"
                  className="block w-full p-2 text-gray-900 border border-gray-300 bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-900 dark:text-white">
                  Order
                </label>
                <input
                  type="text"
                  className="block w-full p-2 text-gray-900 border border-gray-300 bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
            </div>
          </div>
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
                  type="text"
                  className="block w-full p-2 text-gray-900 border border-gray-300 bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>

              <div className="w-full">
                <label className="block text-sm font-medium text-gray-900 dark:text-white">
                  ALT
                </label>
                <input
                  type="text"
                  className="block w-full p-2 text-gray-900 border border-gray-300 bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
            </div>
            <div className="my-2 text-[10px] uppercase">Text</div>
            <div>
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-900 dark:text-white">
                  Sub-Title
                </label>
                <textarea className="block w-full p-2 text-gray-900 border border-gray-300 bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
              </div>
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-900 dark:text-white">
                  Title
                </label>
                <textarea className="block w-full p-2 text-gray-900 border border-gray-300 bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
              </div>
            </div>
            <div className="my-2 text-[10px] uppercase">Contact</div>
            <div>
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-900 dark:text-white">
                  Number
                </label>
                <input
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
