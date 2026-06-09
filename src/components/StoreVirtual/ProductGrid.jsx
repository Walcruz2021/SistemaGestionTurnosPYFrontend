import React from "react";
import ProductCard from "./ProductCard";

export default function ProductGrid({ currentItems = [], slug = "" }) {

  return (

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">

    
      {currentItems.map((product, index) => (
        <ProductCard
          key={product._id}
          product={product}
          index={index}
          slug={slug}
        />
      ))}
    
    </div>
  );
}