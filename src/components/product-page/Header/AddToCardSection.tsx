"use client";

import CartCounter from "@/components/ui/CartCounter";
import React, { useState } from "react";
import AddToCartBtn from "./AddToCartBtn";
import { Product } from "@/types/product.types";

const AddToCardSection = ({ data }: { data: Product }) => {
  // State to track the quantity of the product selected
  const [quantity, setQuantity] = useState<number>(1);

  return (

    <div className="fixed md:relative w-full bg-white border-t md:border-none border-black/5 bottom-0 left-0 p-4 md:p-0 z-10 flex items-center justify-between sm:justify-start md:justify-center">
      {/* CartCounter component to update the quantity */}
      <CartCounter onAdd={setQuantity} onRemove={setQuantity} />

      {/* AddToCartBtn component to trigger the addition of the product to the cart */}
      <AddToCartBtn data={{ ...data, quantity }} />
    </div>
  );
};

export default AddToCardSection;
