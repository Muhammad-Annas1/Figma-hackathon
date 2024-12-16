import React from "react";
import ProductDetails from "./ProductDetails";

// ProductDetailsContent component to display the product details section
const ProductDetailsContent = () => {
  return (
    <section>
      
      {/* Section heading for product specifications */}
      <h3 className="text-xl sm:text-2xl font-bold text-black mb-5 sm:mb-6">
        Product specifications
      </h3>

      {/* Render the ProductDetails component to display the specifications */}
      <ProductDetails />
    </section>
  );
};

export default ProductDetailsContent;
