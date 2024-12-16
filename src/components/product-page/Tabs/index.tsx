"use client";

import { Button } from "@/components/ui/button";  // Import the Button component
import { cn } from "@/lib/utils";  // Import utility function for className concatenation
import React, { useState } from "react";  // Import React and useState hook
import ProductDetailsContent from "./ProductDetailsContent";  // Import ProductDetailsContent component
import ReviewsContent from "./ReviewsContent";  // Import ReviewsContent component
import FaqContent from "./FaqContent";  // Import FaqContent component

// Define the type for each tab button
type TabBtn = {
  id: number;
  label: string;
};

// Define the tab button data
const tabBtnData: TabBtn[] = [
  {
    id: 1,
    label: "Product Details",
  },
  {
    id: 2,
    label: "Rating & Reviews",
  },
  {
    id: 3,
    label: "FAQs",
  },
];

// Tabs component to manage switching between tabs
const Tabs = () => {
  // State to keep track of the active tab
  const [active, setActive] = useState<number>(1);

  return (
    <div>
      {/* Tab buttons section */}
      <div className="flex items-center mb-6 sm:mb-8 overflow-x-auto">
        {/* Iterate through each tab button */}
        {tabBtnData.map((tab) => (
          <Button
            key={tab.id}
            variant="ghost"
            type="button"
            // Apply styles for active and inactive states
            className={cn([
              active === tab.id
                ? "border-black border-b-2 font-medium"  // Active tab styles
                : "border-b border-black/10 text-black/60 font-normal",  // Inactive tab styles
              "p-5 sm:p-6 rounded-none flex-1",  // Common button styles
            ])}
            // Update active tab when clicked
            onClick={() => setActive(tab.id)}
          >
            {tab.label}  {/* Display the label of the tab */}
          </Button>
        ))}
      </div>

      {/* Tab content section */}
      <div className="mb-12 sm:mb-16">
        {/* Render content based on the selected tab */}
        {active === 1 && <ProductDetailsContent />}
        {active === 2 && <ReviewsContent />}
        {active === 3 && <FaqContent />}
      </div>
    </div>
  );
};

export default Tabs;
