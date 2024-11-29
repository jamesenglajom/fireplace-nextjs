"use client"
import {useState} from "react"

const ProductMetaTabs = () => {
    const [tab, setTab] = useState("Product Descriptions"); 
    const tabs = [
        {
            name: "Product Descriptions",
            content: `<div class="container mx-auto p-6 bg-gray-50">
  <!-- Product Header -->
  <div class="flex flex-col md:flex-row items-center gap-8">
    <!-- Product Image -->
    <div class="w-full md:w-1/2">
      <img
        src="https://via.placeholder.com/600x400?text=Fireplace+Product"
        alt="Fireplace Product Image"
        class="rounded-lg shadow-md"
      />
    </div>

    <!-- Product Info -->
    <div class="w-full md:w-1/2">
      <h1 class="text-3xl font-bold text-gray-800 mb-4">Modern Electric Fireplace</h1>
      <p class="text-gray-600 text-lg mb-6">
        Add warmth and elegance to your home with this sleek, energy-efficient electric fireplace. 
        Perfect for living rooms, bedrooms, and offices.
      </p>

      <!-- Product Price -->
      <div class="flex items-center gap-4 mb-6">
        <span class="text-2xl font-semibold text-green-600">$299.99</span>
        <span class="text-gray-500 line-through">$399.99</span>
      </div>

      <!-- Add to Cart Button -->
      <button
        class="bg-green-600 hover:bg-green-700 text-white text-lg font-medium py-3 px-6 rounded shadow-md"
      >
        Add to Cart
      </button>
    </div>
  </div>

  <!-- Product Details Section -->
  <div class="mt-10">
    <h2 class="text-2xl font-semibold text-gray-800 mb-4">Product Details</h2>
    <p class="text-gray-700 leading-7">
      This electric fireplace features a realistic flame effect with multiple color options and adjustable brightness. It
      includes a remote control for ease of use and has a built-in safety shut-off. Designed to be wall-mounted or used as
      a freestanding unit.
    </p>
  </div>

  <!-- Video Section -->
  <div class="mt-10">
    <h2 class="text-2xl font-semibold text-gray-800 mb-4">Product Video</h2>
    <video
      controls
      class="w-full rounded-lg shadow-md"
    >
      <source
        src="https://via.placeholder.com/600x400.mp4"
        type="video/mp4"
      />
      Your browser does not support the video tag.
    </video>
  </div>

  <!-- Reviews Section -->
  <div class="mt-10">
    <h2 class="text-2xl font-semibold text-gray-800 mb-4">Customer Reviews</h2>
    <div class="space-y-6">
      <!-- Single Review -->
      <div class="border rounded-lg p-4 shadow-md bg-white">
        <h3 class="text-lg font-semibold text-gray-800">Jane Doe</h3>
        <p class="text-gray-600 text-sm">⭐⭐⭐⭐⭐</p>
        <p class="text-gray-700 mt-2">
          Absolutely love this fireplace! The flame effects are so realistic, and it heats up my living room perfectly.
        </p>
      </div>
      <!-- Single Review -->
      <div class="border rounded-lg p-4 shadow-md bg-white">
        <h3 class="text-lg font-semibold text-gray-800">John Smith</h3>
        <p class="text-gray-600 text-sm">⭐⭐⭐⭐</p>
        <p class="text-gray-700 mt-2">
          Great product! Easy to install and looks amazing. My only complaint is the remote range is a bit short.
        </p>
      </div>
    </div>
  </div>
</div>
`
        },
        {
            name: "Specification",
            content: "<div style='font-weight:bold'>Specification</div>"
        },
        {
            name: "Guides & Installations",
            content: "<div style='font-weight:bold'>Guides & Installations</div>"
        },
    ];

    const handleTabChange = (tab) => {
        setTab(prev=> tab);
    }

    return (
        <div>
            <div className="flex">
                {
                    tabs.map((v,i)=>
                    <button onClick={()=> handleTabChange(v.name)} key={`meta-tab-${i}`} className={`px-[15px] py-[7px] rounded-tl-lg rounded-tr-lg ${tab === v.name ? 'bg-pallete-orange text-white font-bold':'bg-stone-100 text-stone-500'}`}>
                        {v.name}
                    </button>
                    )
                }
            </div>
            <div className="border p-[20px]">
                {/* tab contents */}
                <div dangerouslySetInnerHTML={{__html: tabs.filter(i=> i.name === tab)[0]?.content}}></div>
            </div>
        </div>
    )
}

export default ProductMetaTabs;