import React from "react";
import { product } from "../../typings";

interface Props {
  item: product;
}

function CartItem({ item }: Props) {
  const { name, price, image } = item;
  return (
    <div className="flex w-full justify-between px-12 py-3 border-b border-black/10 center">
      <div className="flex flex-col start space-y-2 self-center">
        <h1 className="font-bold text-xl"> {name}</h1>
        <h1 className="font-medium text-gray-400 text-xl">$ {price}</h1>
      </div>
      <div className="flex center">
        <img
          src={image.src ? image.src : image}
          className="w-24 h-24 center object-cover object-center"
        />
      </div>
      
    </div>
  );
}

export default CartItem;
