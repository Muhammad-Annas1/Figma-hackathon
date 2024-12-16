"use client";

import { setSizeSelection } from "@/lib/features/products/productsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import { RootState } from "@/lib/store";
import { cn } from "@/lib/utils";
import React from "react";

const SizeSelection = () => {
  // Accessing the selected size from the Redux store
  const { sizeSelection } = useAppSelector(
    (state: RootState) => state.products
  );
  // Dispatch function to update the size selection
  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-col">
      {/* Label for the size selection */}
      <span className="text-sm sm:text-base text-black/60 mb-4">
        Choose Size
      </span>
      <div className="flex items-center flex-wrap lg:space-x-3">
        {/* Mapping through the size options and displaying each as a button */}
        {["Small", "Medium", "Large", "X-Large"].map((size, index) => (
          <button
            key={index}
            type="button"
            // Button styling, adding conditional styling if the size is selected
            className={cn([
              "bg-[#F0F0F0] flex items-center justify-center px-5 lg:px-6 py-2.5 lg:py-3 text-sm lg:text-base rounded-full m-1 lg:m-0 max-h-[46px]",
              sizeSelection === size && "bg-black font-medium text-white", // Apply selected styles
            ])}
            // Dispatch the size selection when a button is clicked
            onClick={() => dispatch(setSizeSelection(size))}
          >
            {size} {/* Display size */}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SizeSelection;
