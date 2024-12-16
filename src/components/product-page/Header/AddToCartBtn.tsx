"use client";

import React from "react";
import { Product } from "@/types/product.types";

const AddToCartBtn = ({ data }: { data: Product & { quantity: number } }) => {

  return (
    
    // Button to add the product to the cart
    <button
      type="button"
      className="bg-black w-full ml-3 sm:ml-5 rounded-full h-11 md:h-[52px] text-sm sm:text-base text-white"
    >
      Add to Cart
    </button>
  );
};

export default AddToCartBtn;
