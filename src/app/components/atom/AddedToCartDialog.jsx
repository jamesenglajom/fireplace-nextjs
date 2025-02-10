"use client";
import { useState, useEffect, useMemo } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
const data = [
  {
      "id": 9396,
      "name": "Blaze 38-Inch Round Concrete Propane Fire Bowl in Phantom - BLZ-38-FBOWL-LP",
      "type": "physical",
      "sku": "BLZ-38-FBOWL-LP",
      "description": "<p><strong>Key Features</strong></p> <ul> <li><strong>85,000 BTU Burner</strong></li> <li> <strong>Construction:</strong> Made of glass fiber reinforced concrete (GFRC) with a steel inner frame</li> <li> <strong>Includes:</strong> Leveling feet, lava rock filler, AA battery, cover, lifting strap, and NG hose with quick connect</li> <li> <strong>Certification:</strong> Certified for use with professionally installed natural gas lines</li> <li> <strong>Ignition:</strong> Battery-operated push button ignitor</li> </ul> <p>The Blaze fire bowl in natural gas features an elegant shape with a rustic finish, fitting well in various settings. Whether enhancing your backyard, upgrading outdoor restaurant seating, or creating a welcoming poolside patio, this versatile fire feature adds a warm ambiance. Handcrafted in the USA by skilled artisans, this fire pit includes a reliable push button ignition and a storage cover. Please note, once purchased, the unit cannot be converted to a different type of gas.</p> <p><strong>Specifications</strong></p> <ul> <li> <strong>Fuel Type:</strong> Liquid Propane</li> <li> <strong>BTU:</strong> 85,000 BTUs</li> <li> <strong>Ignition Type:</strong> Continuous Spark</li> <li> <strong>Smokeless:</strong> Yes</li> <li> <strong>Primary Material:</strong> Glass Fiber Reinforced Concrete</li> <li> <strong>Material:</strong> Concrete</li> <li> <strong>Tank Storage:</strong> No</li> <li> <strong>Finish:</strong> Phantom</li> </ul> <p><strong>Dimensions</strong></p> <ul> <li> <strong>Width:</strong> 38\"</li> <li> <strong>Depth:</strong> 38\"</li> <li> <strong>Height:</strong> 14.5\"</li> <li> <strong>Weight:</strong> 277 lbs</li> </ul> <!---->",
      "weight": 0,
      "width": 0,
      "depth": 0,
      "height": 0,
      "price": 3499.99,
      "cost_price": 0,
      "retail_price": 0,
      "sale_price": 3499.99,
      "map_price": 0,
      "tax_class_id": 0,
      "product_tax_code": "",
      "calculated_price": 3499.99,
      "categories": [
          34,
          148,
          329,
          330,
          332,
          339,
          341,
          343,
          344,
          372,
          416
      ],
      "brand_id": 46,
      "option_set_id": null,
      "option_set_display": "right",
      "inventory_level": 5,
      "inventory_warning_level": 0,
      "inventory_tracking": "none",
      "reviews_rating_sum": 0,
      "reviews_count": 0,
      "total_sold": 0,
      "fixed_cost_shipping_price": 0,
      "is_free_shipping": true,
      "is_visible": true,
      "is_featured": false,
      "related_products": [
          -1
      ],
      "warranty": "",
      "bin_picking_number": "",
      "layout_file": "product.html",
      "upc": "",
      "mpn": "",
      "gtin": "",
      "date_last_imported": "2025-01-30T00:14:13+00:00",
      "search_keywords": "",
      "availability": "available",
      "availability_description": "",
      "gift_wrapping_options_type": "any",
      "gift_wrapping_options_list": [],
      "sort_order": 0,
      "condition": "New",
      "is_condition_shown": false,
      "order_quantity_minimum": 0,
      "order_quantity_maximum": 0,
      "page_title": "",
      "meta_keywords": [],
      "meta_description": "",
      "date_created": "2024-09-30T07:21:54+00:00",
      "date_modified": "2025-01-30T00:14:46+00:00",
      "view_count": 0,
      "preorder_release_date": null,
      "preorder_message": "",
      "is_preorder_only": false,
      "is_price_hidden": false,
      "price_hidden_label": "",
      "custom_url": {
          "url": "/blaze-38-inch-round-concrete-propane-fire-bowl-in-phantom-blz-38-fbowl-lp/",
          "is_customized": false
      },
      "base_variant_id": 9361,
      "open_graph_type": "product",
      "open_graph_title": "",
      "open_graph_description": "",
      "open_graph_use_meta_description": true,
      "open_graph_use_product_name": true,
      "open_graph_use_image": true,
      "images": [
          {
              "id": 11488,
              "product_id": 9396,
              "is_thumbnail": false,
              "sort_order": 1,
              "description": "",
              "image_file": "p/709/Snip2024-06-2415.56.52__54874.jpg",
              "url_zoom": "https://cdn11.bigcommerce.com/s-3qyvevattr/products/9396/images/11488/Snip2024-06-2415.56.52__54874.1727934641.1280.1280.jpg?c=1",
              "url_standard": "https://cdn11.bigcommerce.com/s-3qyvevattr/products/9396/images/11488/Snip2024-06-2415.56.52__54874.1727934641.386.513.jpg?c=1",
              "url_thumbnail": "https://cdn11.bigcommerce.com/s-3qyvevattr/products/9396/images/11488/Snip2024-06-2415.56.52__54874.1727934641.220.290.jpg?c=1",
              "url_tiny": "https://cdn11.bigcommerce.com/s-3qyvevattr/products/9396/images/11488/Snip2024-06-2415.56.52__54874.1727934641.44.58.jpg?c=1",
              "date_modified": "2024-10-03T05:50:41+00:00"
          },
          {
              "id": 11489,
              "product_id": 9396,
              "is_thumbnail": false,
              "sort_order": 2,
              "description": "",
              "image_file": "c/166/Snip2024-06-2415.57.08__75396.jpg",
              "url_zoom": "https://cdn11.bigcommerce.com/s-3qyvevattr/products/9396/images/11489/Snip2024-06-2415.57.08__75396.1727934642.1280.1280.jpg?c=1",
              "url_standard": "https://cdn11.bigcommerce.com/s-3qyvevattr/products/9396/images/11489/Snip2024-06-2415.57.08__75396.1727934642.386.513.jpg?c=1",
              "url_thumbnail": "https://cdn11.bigcommerce.com/s-3qyvevattr/products/9396/images/11489/Snip2024-06-2415.57.08__75396.1727934642.220.290.jpg?c=1",
              "url_tiny": "https://cdn11.bigcommerce.com/s-3qyvevattr/products/9396/images/11489/Snip2024-06-2415.57.08__75396.1727934642.44.58.jpg?c=1",
              "date_modified": "2024-10-03T05:50:42+00:00"
          },
          {
              "id": 11490,
              "product_id": 9396,
              "is_thumbnail": false,
              "sort_order": 3,
              "description": "",
              "image_file": "o/300/Snip2024-06-2415.57.27__39345.jpg",
              "url_zoom": "https://cdn11.bigcommerce.com/s-3qyvevattr/products/9396/images/11490/Snip2024-06-2415.57.27__39345.1727934642.1280.1280.jpg?c=1",
              "url_standard": "https://cdn11.bigcommerce.com/s-3qyvevattr/products/9396/images/11490/Snip2024-06-2415.57.27__39345.1727934642.386.513.jpg?c=1",
              "url_thumbnail": "https://cdn11.bigcommerce.com/s-3qyvevattr/products/9396/images/11490/Snip2024-06-2415.57.27__39345.1727934642.220.290.jpg?c=1",
              "url_tiny": "https://cdn11.bigcommerce.com/s-3qyvevattr/products/9396/images/11490/Snip2024-06-2415.57.27__39345.1727934642.44.58.jpg?c=1",
              "date_modified": "2024-10-03T05:50:42+00:00"
          },
          {
              "id": 4799,
              "product_id": 9396,
              "is_thumbnail": true,
              "sort_order": 0,
              "description": "",
              "image_file": "f/199/Snip2024-06-2415.56.34__87746.jpg",
              "url_zoom": "https://cdn11.bigcommerce.com/s-3qyvevattr/products/9396/images/4799/Snip2024-06-2415.56.34__87746.1727680914.1280.1280.jpg?c=1",
              "url_standard": "https://cdn11.bigcommerce.com/s-3qyvevattr/products/9396/images/4799/Snip2024-06-2415.56.34__87746.1727680914.386.513.jpg?c=1",
              "url_thumbnail": "https://cdn11.bigcommerce.com/s-3qyvevattr/products/9396/images/4799/Snip2024-06-2415.56.34__87746.1727680914.220.290.jpg?c=1",
              "url_tiny": "https://cdn11.bigcommerce.com/s-3qyvevattr/products/9396/images/4799/Snip2024-06-2415.56.34__87746.1727680914.44.58.jpg?c=1",
              "date_modified": "2024-09-30T07:21:54+00:00"
          }
      ]
  }
];
const BASE_URL = process.env.NEXT_PUBLIC_SITE_BASE_URL;
const cartPageUrl = `${BASE_URL}/cart`;
function AddedToCartDialog({ onClose }) { // dont forget to re-add data params 
  const router = useRouter();
  // const { addToCart } = useCart();
  const [toggle, setToggle] = useState(true);
  const [image, setImage] = useState(null);

  const addedToCartItems = useMemo(() => {
    if (!data || data.length === 0) {
      return null;
    }

    const formattedVal = Object.values(
      data.reduce((acc, item) => {
        if (!acc[item.id]) {
          acc[item.id] = { ...item, count: 0 };
        }
        acc[item.id].count += 1;
        return acc;
      }, {})
    );
    console.log("addedToCartDataFormatted", formattedVal);
    console.log("originalData", data);

    return formattedVal[0];
  }, [data]);

  
  useEffect(() => {
    if (addedToCartItems) {
      const thumbnail =
      addedToCartItems?.images?.find(({ is_thumbnail }) => is_thumbnail)?.url_standard ??
        null;
      console.log("thumbnail", thumbnail);
      setImage(thumbnail);
      setToggle(true);
    } else {
      setToggle(false);
    }
  }, [addedToCartItems]);

  useEffect(() => {
    if (!toggle) {
      onClose();
    }
  }, [toggle]);


  const handleGoToCartClick = (e) => {
    e.preventDefault();
    router.push(cartPageUrl);
  };

  return (
    <Dialog open={toggle} onClose={setToggle} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="w-screen h-screen relative">
          <div className="absolute inset-0  flex items-end justify-center md:p-4 text-center sm:items-center sm:p-[10px]">
            <DialogPanel
              transition
              className="w-full relative transform overflow-hidden bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-[800px] data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95 overflow-y-auto rounded-lg"
            >
              <div className="flex items-center justify-center h-[100px]">
                <div className="font-bold text-xl text-stone-700">
                  <div className="flex justify-center text-green-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="27"
                      viewBox="0 0 32 27"
                    >
                      <path
                        fill="currentColor"
                        d="M26.99 0L10.13 17.17l-5.44-5.54L0 16.41L10.4 27l4.65-4.73l.04.04L32 5.1z"
                      />
                    </svg>
                  </div>
                  <div className="font-bold text-xl text-stone-700">
                    Item added to your cart
                  </div>
                </div>
              </div>
              <div className="flex bg-stone-200 px-[15px] py-[15px] gap-[10px]">
                <div className="w-[100px] h-[100px] relative rounded-md overflow-hidden">
                  {image && (
                    <Image
                      src={image}
                      alt={addedToCartItems?.name}
                      className="w-full h-full"
                      objectFit="contain"
                      fill
                    />
                  )}
                </div>
                <div className="w-[calc(100%-100px)] text-stone-700 flex flex-col gap-[10px]">
                  <div className="font-bold text-sm lg:text-xl">{addedToCartItems?.name}</div>
                  <div className="font-medium text-sm">{`$${addedToCartItems?.price}x${addedToCartItems?.count}`}</div>
                  <div className="font-extrabold text-orange-600 text-lg lg:text-2xl text-right">{`$${addedToCartItems?.count * addedToCartItems?.price}`}</div>
                </div>
              </div>
              <div className="flex items-center justify-center h-[100px]">
                <div className="font-bold text-xl text-stone-700">
                  Other Contents Here
                </div>
              </div>

              {/* action buttons */}
              <div className="flex justify-between items-center p-[10px] border-t ">
                <button
                  onClick={() => setToggle(false)}
                  className="border border-stone-300 rounded-md py-1 px-2 hover:bg-stone-50 text-sm font-medium"
                >
                  Continue Shopping
                </button>
                <Link
                  onClick={handleGoToCartClick}
                  href={cartPageUrl}
                  className="border border-stone-300 rounded-md py-1 px-2 text-white bg-orange-600 hover:bg-orange-500 text-sm font-medium"
                >
                  Go to Cart
                </Link>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

export default AddedToCartDialog;
