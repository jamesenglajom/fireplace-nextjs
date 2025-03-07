"use client";
import { useState, useEffect } from "react";
import CardWrap from "@/app/components/admin/CardWrap";
import { MSLCheck } from "@/app/components/icons/lib";
import { keys, redisGet, redisSet } from "@/app/lib/redis";

const colors = [
  "red",
  "orange",
  "amber",
  "yellow",
  "lime",
  "green",
  "emerald",
  "teal",
  "cyan",
  "sky",
  "blue",
  "indigo",
  "violet",
  "purple",
  "fuchsia",
  "pink",
  "rose",
  "slate",
  "gray",
  "zinc",
  "neutral",
  "stone",
];

const themeKey = keys.theme.value;

const colors_obj = colors.map((i) => ({
  name: i,
  bg500: `bg-${i}-500`,
  bg900: `bg-${i}-900`,
  b500: `border-${i}-500`,
  b900: `border-${i}-900`,
  text500: `text-${i}-500`,
}));

console.log(colors.map(i=>{
  return `<button className="border-4 border-${i}-900">
              <div
                className='h-[50px] w-[50px] aspect-1 border-4 transition-all duration-500 ease-in-out bg-${i}-500 relative border-${i}-500 hover:border-${i}-900'
              >
                <div
                  className='text-white bg-${i}-900 flex items-center justify-center w-[18px] h-[18px] absolute top-[-4px] right-[-4px] transition-all duration-500 ease-in-out'
                >
                  <MSLCheck width={15} height={15} />
                </div>
              </div>
              <div
                className='text-[8px] uppercase font-semibold text-center text-${i}-500'
              >
                ${i}
                </div>
            </button>
          `
}).join(""))

console.log(colors.map(i=> `theme-${i}`))

function ThemeUpdater() {
  const [selected, setSelected] = useState(null);
  const [activeColor, setActiveColor] = useState(null);

  const handleColorChange = (color) => {
    setSelected(color);
  };
  const handleSaveTheme = () => {
    // save color to redis as solana_theme
    redisSet(themeKey, selected)
      .then((response) => {
        console.log(`redisSetResponse:`, response);
        if (response.success) {
          console.log(`redisSetSuccess`);
          setActiveColor(selected);
        } else {
          console.log(`redisSetError`);
        }
      })
      .catch((error) => console.log(`redisSetError:`, error));
  };

  useEffect(() => {
    redisGet(themeKey)
      .then((color) => {
        console.log("redisGetResponse:", color);
        setActiveColor(color);
        setSelected(color);
      })
      .catch((error) => console.log(`redisGetError:`, error));
  }, []);
  return (
    <CardWrap>
      <div className="p-3">
        <div className="font-bold text-lg flex gap-[10px] items-center">
          <div
            className={`rounded-full h-[15px] w-[15px] aspect-1 bg-${activeColor}-500 transition-all duration-700 ease-in-out`}
          ></div>
          <div>Theme</div>
        </div>
        <div className="mb-2 text-sm">Don't forget to save your changes.</div>
        <div className="flex gap-[10px] flex-wrap my-7">
          {colors_obj.map((i) => (
            <button key={i.name} onClick={() => handleColorChange(i.name)}>
              <div
                className={`h-[50px] w-[50px] aspect-1 border-4 transition-all duration-500 ease-in-out ${
                  i.bg500
                } relative ${selected === i.name ? i.b900 : i.b500}`}
              >
                <div
                  className={`text-white ${
                    i.bg900
                  } flex items-center justify-center w-[18px] h-[18px] absolute top-[-4px] right-[-4px] transition-all duration-500 ease-in-out ${
                    selected === i.name ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <MSLCheck width={15} height={15} />
                </div>
              </div>
              <div
                className={`text-[8px] uppercase font-semibold text-center ${i.text500}`}
              >
                {i.name}
                </div>
            </button>
          ))}
        </div>
        <div>
          <button
            onClick={handleSaveTheme}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Save
          </button>
        </div>
      </div>
    </CardWrap>
  );
}

export default ThemeUpdater;
