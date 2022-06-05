import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { AddedToCartState, OpenCartState } from "../../atoms/AddedToCart";
import { product } from "../../typings";

interface Props {
  product: product;
}
  interface addedtoCart {
    addedtoCart : string[];
  }

function ProductItem({ product }: Props) {
  const { name, bestseller, category, currency, image, price } = product.data(); //destructring
  const [view, setView] = useState(false); // handling the display of add to cart badge on hover
  const [addedtoCart, setAddedtoCart] = useRecoilState(AddedToCartState);
  const [openCart, setOpenCart] = useRecoilState(OpenCartState);
  return (
    <div className="flex flex-col start w-[80%] space-y-1 relative">
      {bestseller && (
        <div className=" absolute top-0 left-0  z-50 bg-white py-1 px-6 font-medium">
          Best Seller
        </div>
      )}

      <div
        className="w-full overflow-hidden relative"
        onMouseEnter={() => setView(true)}
        onMouseLeave={() => setView(false)}
      >
        <img
          src={product.data().image.src}
          alt={ product.data().image.alt}
          className=" w-full h-[500px] object-cover object-center group hover:scale-110 smooth "
        />
        {view && (
          <div
            onClick={() => {
              setAddedtoCart<addedtoCart>([...addedtoCart, product.data()]),
                setOpenCart(true);
            }}
            className=" cursor-pointer center flex absolute bottom-0 w-full  z-50 bg-black text-white py-3 px-6 font-medium"
          >
            ADD TO CART
          </div>
        )}
      </div>
      <h1 className="font-bold text-[#656565] ">{category}</h1>
      <h1 className="font-bold text-2xl">{name}</h1>
      <h1 className="text-[#656565] text-xl "> ${price}</h1>
    </div>
  );
}

export default ProductItem;
