import {
  collection,
  limit,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { db } from "../../firebase";
import { AddedToCartState, OpenCartState } from "../../atoms/AddedToCart";

function Featured() {
  const [featuredProductData, setFeaturedProductData] = useState([]);
  const featured = featuredProductData[0];
  const [addedtoCart, setAddedtoCart] = useRecoilState(AddedToCartState);
  const [openCart, setOpenCart] = useRecoilState(OpenCartState);
  // fetching the featured product
  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "products"),
        where("featured", "==", true),
        limit(1)
      ),
      (snapshot) => {
        setFeaturedProductData(
          snapshot.docs.map((doc) => {
            return doc.data();
          })
        );
      }
    );
  }, []);

  return (
    <div className="featured mt-8 mb-24 ">
      {/* title + btn */}
      <div className="flex justify-between items-center w-full">
        <h1 className="lg:text-2xl text-3xl font-bold"> {featured?.name} </h1>
        <button
          onClick={() => {
            setAddedtoCart([...addedtoCart, featured]), setOpenCart(true);
          }}
          className="add-to-cart-btn hidden lg:flex  "
        >
          ADD TO CART
        </button>
      </div>
      {/* image */}
      <div className="w-full relative">
        <img
          src={featured?.image.src}
          className="h-[600px] w-full object-center object-cover"
        />
        <span className="absolute bottom-0 left-0 bg-white py-3 px-8 text-lg font-bold">
          Photo of the day
        </span>
      </div>
      <button
        onClick={() => {
          setAddedtoCart([...addedtoCart, featured]), setOpenCart(true);
        }}
        className="add-to-cart-btn lg:hidden flex w-full center text-xl py-2  "
      >
        ADD TO CART
      </button>
      {/* about section */}
      <div className="xl:flex start w-full xl:space-x-24 ">
        {/* left side */}
        <div className="w-full">
          <h1 className="pb-2 pt-8 font-bold text-xl">
            About the {featured?.name}
          </h1>
          <p className="text-lg font-bold text-gray-500">
            {featured?.category}
          </p>
          <p className="xl:w-3/4 xl:text-lg text-xl text-black/75 mt-6 ">
            {featured?.details.description.substring(
              0,
              featured?.details.description.length - 131
            )}
          </p>
          <div className="py-4 w-full" />
          <p className="w-3/4">
            {featured?.details.description.substring(
              featured?.details.description.length - 131,
              featured?.details.description.length
            )}
          </p>
        </div>
        {/* right side */}
        <div className="w-full xl:items-end start xl:justify-center flex flex-col space-y-4">
          <h1 className="text-xl pb-2 pt-8 font-bold">People also buy</h1>
          <div className="flex space-x-4 xl:items-end start xl:justify-center w-full">
            {featured?.details.recommendations.map(({ src, alt }) => (
              <img
                key={src}
                src={src}
                className="md:w-44 md:h-48  w-32 h-36 object-cover object-center "
              />
            ))}
          </div>
          <div className="w-full xl:items-end start xl:justify-center flex flex-col space-y-2 pt-6">
            <h1 className="text-xl font-bold">Details</h1>
            <h1 className="text-[#656565]">
              Size: {featured?.details.dimmentions.height} X{" "}
              {featured?.details.dimmentions.width} pixel
            </h1>
            <h1 className="text-[#656565]">
              Size: {featured?.details.size / 1000} mb
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Featured;
