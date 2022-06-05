import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { useRecoilState } from "recoil";
import { AddedToCartState, OpenCartState } from "../../atoms/AddedToCart";
import CartItem from "../cart/CartItem";
import { Popover } from "@nextui-org/react";

function Header() {
  const [addedtoCart, setAddedtoCart] = useRecoilState(AddedToCartState);
  const [openCart, setOpenCart] = useRecoilState(OpenCartState);
  console.log(addedtoCart);
  return (
    <div className="header relative ">
      <Image alt="logo" src="/images/logo.png" height={25} width={159} />
      <div className=" w-full end flex">
        <Popover
          isOpen={openCart}
          placement="bottom-right"
          triggerType="menu"
          disableAnimation={false}
        >
          <Popover.Trigger>
            <div onClick={() => setOpenCart(!openCart)}>
              <Image
                alt="cart"
                src="/images/cart.png"
                height={30}
                width={30}
                className="cursor-pointer "
              />
              <div className="absolute bottom-[20px] text-xs -right-[15px] bg-black text-white py-[3px] px-[8px] ">
                {addedtoCart.length}
              </div>
            </div>
          </Popover.Trigger>
          <Popover.Content className="xl:w-[30%] md:w-[50%] w-full rounded-none ">
            <div className="w-full pt-4 ">
              {addedtoCart.map((product) => (
                <CartItem key={product.name} item={product} />
              ))}
              <div className="px-4 w-full flex center py-3">
                <button
                  onClick={() => {
                    setAddedtoCart([]),
                      setTimeout(() => {
                        setOpenCart(false);
                      }, 500);
                  }}
                  className={`clear-btn ${
                    addedtoCart.length === 0 && "hidden"
                  } `}
                >
                  clear
                </button>
              </div>
            </div>
          </Popover.Content>
        </Popover>
      </div>
    </div>
  );
}

export default Header;
