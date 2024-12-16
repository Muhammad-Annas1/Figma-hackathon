"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { cn } from "@/lib/utils";

type CartCounterProps = {
  isZeroDelete?: boolean; // Determines if zero should delete the counter
  onAdd?: (value: number) => void; // Callback for adding an item to the cart
  onRemove?: (value: number) => void; // Callback for removing an item from the cart
  className?: string; // Custom CSS class
  initialValue?: number; // Initial counter value, default is 1
};

const CartCounter = ({
  isZeroDelete,
  onAdd,
  onRemove,
  className,
  initialValue = 1,
}: CartCounterProps) => {
  const [counter, setCounter] = useState<number>(initialValue); // State to hold the current count

  // Function to increment the counter and trigger the onAdd callback
  const addToCart = () => {
    if (onAdd) {
      onAdd(counter + 1);
    }
    setCounter(counter + 1); // Increment the counter
  };

  // Function to decrement the counter and trigger the onRemove callback
  const remove = () => {
    if ((counter === 1 && !isZeroDelete) || counter <= 0) return; // Prevent removing when counter is 1 and isZeroDelete is false

    if (onRemove) {
      onRemove(counter - 1);
    }
    if (counter - 1 <= 0) return; // Prevent decrementing the counter below 0
    
    setCounter(counter - 1); // Decrement the counter
  };

  return (
    <div
      className={cn(
        "bg-[#F0F0F0] w-full min-w-[110px] max-w-[110px] sm:max-w-[170px] py-3 md:py-3.5 px-4 sm:px-5 rounded-full flex items-center justify-between",
        className // Allows for custom className to be passed in
      )}
    >
      {/* Button to decrease the counter */}
      <Button
        variant="ghost"
        size="icon"
        type="button"
        className="h-5 w-5 sm:h-6 sm:w-6 text-xl"
        onClick={() => remove()}
      >
        <FaMinus />
      </Button>

      {/* Display the counter value */}
      <span className="font-medium text-sm sm:text-base">
        {!isZeroDelete ? counter : initialValue}
      </span>

      {/* Button to increase the counter */}
      <Button
        variant="ghost"
        size="icon"
        type="button"
        className="h-5 w-5 sm:h-6 sm:w-6 text-xl" 
        onClick={() => addToCart()}
      >
        <FaPlus />
      </Button>
    </div>
  );
};

export default CartCounter;
