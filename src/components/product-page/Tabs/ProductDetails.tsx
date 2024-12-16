import React from "react";

// Define the type for each specification item
export type SpecItem = {
  label: string;
  value: string;
};

// Define the specification data for the product
const specsData: SpecItem[] = [
  {
    label: "Material composition",
    value: "100% Cotton",
  },
  {
    label: "Care instructions",
    value: "Machine wash warm, tumble dry",
  },
  {
    label: "Fit type",
    value: "Classic Fit",
  },
  {
    label: "Pattern",
    value: "Solid",
  },
];

// ProductDetails component to display product specifications
const ProductDetails = () => {
  return (
    <>
    
      {/* Loop through the specification data and display each item */}
      {specsData.map((item, i) => (
        <div className="grid grid-cols-3" key={i}>
          {/* Label section */}
          <div>
            <p className="text-sm py-3 w-full leading-7 lg:py-4 pr-2 text-neutral-500">
              {item.label}  {/* Display the label of the specification */}
            </p>
          </div>

          {/* Value section */}
          <div className="col-span-2 py-3 lg:py-4 border-b">
            <p className="text-sm w-full leading-7 text-neutral-800 font-medium">

              {item.value}  {/* Display the value of the specification */}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductDetails;
