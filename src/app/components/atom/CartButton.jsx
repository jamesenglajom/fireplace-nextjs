"use client";
const BASE_URL = process.env.NEXT_PUBLIC_SITE_BASE_URL;

import { useState, useEffect } from "react";
import Link from "next/link";
import { CartIcon } from "@/app/components/icons/lib";

import { getCart } from "@/app/lib/cartStorage";

export default function CartButton() {
  const [cartItemsCount, setCartItemsCount] = useState(0);

  useEffect(() => {
    // On mount, load the cart from localForage
    const loadCart = async () => {
      const savedCart = await getCart();
      setCartItemsCount(savedCart.length);
    };

    loadCart();
  }, []); // Empty array to run only once when the component mounts

  return (
    <Link
      href={`${BASE_URL}/cart`}
      prefetch={false}
      className="text-gray-700 hover:text-orange-500 relative">
      {cartItemsCount > 0 && (
        <div className="absolute bg-pallete-orange w-[20px] h-[20px] overflow-hidden rounded-full text-pallete-dark bottom-[60%] left-[60%] flex justify-center items-center">
          <div className="text-[10px]">{cartItemsCount}</div>
        </div>
      )}
      <CartIcon width="24" height="24" />
    </Link>
  );
}
