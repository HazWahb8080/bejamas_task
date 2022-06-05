import React from "react";
import ProductItemSkeleton from "./ProductItemSkeleton";
import { product } from "../../typings";

interface Props {
  currentProducts: Array;
}

function ProductListSkeleotn({ currentProducts }: Props) {
  return (
    <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-y-12 lg:gap-x-4 w-full place-items-center ">
      {currentProducts.map((product: product) => (
        <ProductItemSkeleton key={product.data().name} />
      ))}
    </div>
  );
}

export default ProductListSkeleotn;
