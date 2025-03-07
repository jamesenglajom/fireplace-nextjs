"use client"
import { useState, useEffect } from "react";
import NextImage from "next/image";
const default_logo = "/Logo.webp";
const redisKey = "admin_solana_market_logo";

function LogoUpdater({logo}) {
  const [currentLogo,setCurrentLogo] = useState(logo);
  const [logoInput, setLogoInput] = useState("");
  const [inputError, setInputError] = useState("");

  const isValidImageUrl = (url) => {
    return /\.(jpeg|jpg|gif|png|webp|svg)$/i.test(url);
  }

  const imageExists = (url, callback) => {
    const img = new Image();
    img.src = url;
  
    img.onload = () => callback(true);  // Image loaded successfully
    img.onerror = () => callback(false); // Error loading image
  }

  const handleInputChange = (e) => {
    const {value} = e.target;
    console.log(value)
    setLogoInput(value)

    if (!isValidImageUrl(value)) {
      console.log("❌ Invalid image URL format");
      setInputError("❌ Invalid image URL format")
    } else {
      imageExists(value, (exists) => {
        if (exists) {
          console.log("✅ Image is valid and exists!");
          setInputError("")
        } else {
          console.log("❌ Image does not exist or is broken");
          setInputError("❌ Image does not exist or is broken")
        }
      });
    }
  }

  const getCurrentLogo = () => {
    fetch(`/api/redis?key=${redisKey}`)
    .then((res) => res.json())
    .then((data) => setCurrentLogo(data))
    .catch((err) => console.error("Error fetching Redis data:", err));
  }

  const clear = () => {
    getCurrentLogo();
    setLogoInput("");
  }

  const handleSaveLogo = async() => {
    const response = await fetch("/api/redis", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key:redisKey, value:logoInput }),
    });

    const result = await response.json();
    if (result.success) {
      alert("Saved to Redis!");
      clear();
    } else {
      alert("Failed to save: " + result.error);
    }
  }

  const handleUseDefaultLogo = async() => {
    const response = await fetch("/api/redis", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key:redisKey }),
    });

    const result = await response.json();
    if (result.success) {
      clear();
      alert(result.message);
    } else {
      alert("Failed to save: " + result.error);
    }
  }

  return (
    <div className="p-3">
      <div className="font-bold text-lg">Logo</div>
      <div className="text-sm">
        Update Logo Here or{" "}
        <span onClick={handleUseDefaultLogo} className="underline cursor-pointer text-blue-700 hover:text-blue-800">
          Click here
        </span>{" "}
        to use default image.
      </div>
      <div className="flex mt-5 gap-[20px]">
        <div className="flex flex-col items-center font-semibold ">
          <div className="p-3 border rounded bg-stone-300">
            <div className="relative w-[200px] aspect-1">
              <NextImage src={default_logo} alt="" fill objectFit="contain" />
            </div>
          </div>
          Default Logo
        </div>
        <div className="flex flex-col items-center font-semibold ">
          <div className="p-3 border rounded bg-stone-300">
            <div className="relative w-[200px] aspect-1">
              <NextImage src={currentLogo??default_logo} alt="" fill objectFit="contain" />
            </div>
          </div>
          Current Logo
        </div>
        {
          inputError === "" && logoInput !== "" && (
            <div className="flex flex-col items-center font-semibold ">
              <div className="p-3 border rounded bg-stone-300">
                <div className="relative w-[200px] aspect-1">
                  <NextImage src={logoInput} alt="" fill objectFit="contain" />
                </div>
              </div>
              New Logo
            </div>)
        }
      </div>
      
      <div className="text-xs mt-4">
      For the best display quality, we recommend using a logo with dimensions of <span className="font-semibold">200x98 pixels (or a 2:1 aspect ratio)</span>. Ensure the image is clear and not stretched for optimal results.
      </div>
      <div className="mt-6">
        <label
          htmlFor="default-input"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Image URL:
        </label>
        <input
          type="text"
          id="default-input"
          value={logoInput}
          onChange={handleInputChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <span className={`text-red-600 text-sm ${inputError ==="" ? 'opacity-0': 'opacity-100'}`}>{inputError}</span>
      </div>
      <div className="mt-2">
      <button
          disabled={!(inputError === "" && logoInput !== "")}
          onClick={handleSaveLogo}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default LogoUpdater;
