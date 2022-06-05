import React from "react";

function ProductItemSkeleton() {
  return (
    <div className="flex flex-col start w-[80%] space-y-4">
      <div className=" w-full h-[500px] bg-gray-100 animate-pulse" />
      <div className=" w-1/2 py-2 bg-gray-200 animate-pulse" />
      <div className=" w-3/4 py-3 bg-gray-100 animate-pulse" />
      <div className="w-1/2 py-2 bg-gray-200 animate-pulse " />
    </div>
  );
}

export default ProductItemSkeleton;
