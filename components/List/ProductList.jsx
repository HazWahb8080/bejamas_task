import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import ProductItem from "./ProductItem";
import {
  SwitchVerticalIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from "@heroicons/react/outline";
import Checkbox from "@mui/material/Checkbox";
import PriceCheck from "../mini_components/PriceCheck";
import ProductListSkeleotn from "../skeleton/ProductListSkeleotn";
import { useRecoilState } from "recoil";
import { ActivePriceFilterState } from "../../atoms/ActivePriceFilter";

function ProductList() {
  const [products, setProducts] = useState();
  let categories = [];
  let [cleansedCategories, setcleansedCategories] = useState([]);

  // for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(5);
  let indexOfLastProduct = currentPage * productsPerPage;
  let indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  let currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  let range = Number((products.length % productsPerPage) + 1);

  // filters
  const [filters, setFilters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activePriceFilter, setactivePriceFilter] = useRecoilState(
    ActivePriceFilterState
  );
  const [openMiniFilters, setOpenMiniFilters] = useState(false);

  const handleFilterCheck = (e) => {
    setLoading(true);
    filters.push(e.target.value);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [activePriceFilter]);

  // fetching the whole products
  useEffect(() => {
    onSnapshot(collection(db, "products"), (snapshot) => {
      setProducts(snapshot.docs);
    });
  }, []);

  // getting categories for filters section and clean it up
  //built in another useEffect block to solve the problem of not immediate state loading of react :)
  useEffect(() => {
    products.forEach((product) => {
      categories.push(product.data().category);
      setcleansedCategories([...new Set(categories)]); //[removing duplicates]
    });
  }, [products]);
  // let's flush the filters state whenever it is empty.
  const flushFilter = (e) => {
    setLoading(true);
    let toBeRemoved = filters.findIndex((filter) => filter === e.target.value);
    filters.splice(toBeRemoved, 1); //le't remove this badboy
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  return (
    <div className="w-full start flex flex-col relative">
      {/* filtering section */}
      <div className="flex center justify-between w-full">
        <h1 className="w-full text-md lg:text-xl">
          <b>Photography /</b>
          <span className="text-[#9B9B9B] "> Premium Photos </span>
        </h1>
        <div className="flex center justify-end w-full space-x-4">
          {/* sort */}
          <div className="flex center space-x-1 hidden xl:flex">
            <SwitchVerticalIcon className="w-4 h-4" />
            <p className="text-[#9B9B9B] font-medium ">Sort By</p>
          </div>
          {/* filter_by_price */}
          <div className="flex center font-medium hidden xl:flex">
            <p>Price</p>
            <ChevronDownIcon className="w-4 h-4" />
          </div>
          <img
            onClick={() => setOpenMiniFilters(!openMiniFilters)}
            src="/images/filters_mobile.png"
            className=" cursor-pointer w-8 h-8 xl:hidden flex object-cover object-center"
          />
        </div>
      </div>
      {/* filters + grid */}
      <div className="w-full center grid xl:grid-cols-5 mt-4 py-4">
        {/* filters */}
        <div className="xl:col-span-1 h-full hidden xl:flex xl:flex-col start w-full space-y-6 ">
          <h1 className="font-semibold text-xl">Category</h1>
          <div className="w-full flex flex-col center space-y-2">
            {cleansedCategories.map((category, i) => (
              <div key={i} className="flex w-full center ">
                <Checkbox
                  value={category}
                  onChange={(e) =>
                    e.target.checked ? handleFilterCheck(e) : flushFilter(e)
                  }
                  style={{ color: "black" }}
                  disableRipple
                />
                <h1 className="self-center w-full font-medium">{category}</h1>
              </div>
            ))}
          </div>
          <div className="border border-[#C2C2C2] w-full" />
          <div className="w-full">
            <h1 className="font-bold pb-4">Price range</h1>
            {Array.from({ length: 4 }, (_, i) => (
              <PriceCheck
                key={i}
                label={
                  i === 0
                    ? "Lower than $20"
                    : i === 1
                    ? "$20 - $100"
                    : i === 2
                    ? "$100 - $200"
                    : "More than $200"
                }
                i={i}
                max={
                  i === 0
                    ? 20
                    : i === 1
                    ? 100
                    : i === 2
                    ? 200
                    : i === 3
                    ? 99999999
                    : null
                }
                min={
                  i === 0
                    ? 0
                    : i === 1
                    ? 20
                    : i === 2
                    ? 100
                    : i === 3
                    ? 200
                    : null
                }
              />
            ))}
          </div>
        </div>
        {openMiniFilters && (
          <div
            className=" absolute z-50 shadow-lg shadow-black/10
           top-36 w-full xl:hidden space-y-4 flex flex-col h-screen bg-white rounded-md border border-gray-100 py-6 px-6 text-gray-700"
          >
            <h1 className="font-semibold text-xl">Category</h1>
            <div className="w-full flex flex-col center space-y-2">
              {cleansedCategories.map((category, i) => (
                <div key={i} className="flex w-full center ">
                  <Checkbox
                    checked={filters.includes(category)}
                    value={category}
                    onChange={(e) =>
                      e.target.checked ? handleFilterCheck(e) : flushFilter(e)
                    }
                    style={{ color: "black" }}
                    disableRipple
                  />
                  <h1 className="self-center w-full font-medium">{category}</h1>
                </div>
              ))}
            </div>
            <div className="border border-[#C2C2C2] w-full" />
            <div className="w-full">
              <h1 className="font-bold pb-4">Price range</h1>
              {Array.from({ length: 4 }, (_, i) => (
                <PriceCheck
                  key={i}
                  label={
                    i === 0
                      ? "Lower than $20"
                      : i === 1
                      ? "$20 - $100"
                      : i === 2
                      ? "$100 - $200"
                      : "More than $200"
                  }
                  i={i}
                  max={
                    i === 0
                      ? 20
                      : i === 1
                      ? 100
                      : i === 2
                      ? 200
                      : i === 3
                      ? 99999999
                      : null
                  }
                  min={
                    i === 0
                      ? 0
                      : i === 1
                      ? 20
                      : i === 2
                      ? 100
                      : i === 3
                      ? 200
                      : null
                  }
                />
              ))}
            </div>
          </div>
        )}
        {/* grid */}
        {!openMiniFilters && (
          <div className="h-full start flex flex-col col-span-4">
            {!loading ? (
              <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-y-12 gap-x-4 w-full place-items-center ">
                {currentProducts.map((product, i) => {
                  if (
                    filters.length >= 1 &&
                    activePriceFilter.max !== null &&
                    !loading
                  ) {
                    if (
                      filters.includes(product.data().category) &&
                      product.data().price <= activePriceFilter.max &&
                      product.data().price >= activePriceFilter.min
                    ) {
                      return <ProductItem key={i} product={product} />;
                    }
                  } else if (
                    (filters.length >= 1 || activePriceFilter.max !== null) &&
                    !loading
                  ) {
                    if (
                      filters.includes(product.data().category) ||
                      (product.data().price <= activePriceFilter.max &&
                        product.data().price >= activePriceFilter.min)
                    ) {
                      return <ProductItem key={i} product={product} />;
                    }
                  } else {
                    return <ProductItem key={i} product={product} />;
                  }
                })}
              </div>
            ) : (
              <ProductListSkeleotn currentProducts={currentProducts} />
            )}
            {/* pagination */}
            <div className="w-full flex center py-4 mt-6 space-x-3">
              <ChevronLeftIcon
                onClick={() => setCurrentPage(currentPage - 1)}
                className={`h-6 w-6 cursor-pointer ${
                  currentPage === 1 ? "hidden" : " flex"
                } `}
              />
              {Array.from({ length: Number(range) }, (_, i) => (
                <h1
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`text-lg cursor-pointer
               ${
                 currentPage === i + 1
                   ? "text-black font-medium"
                   : "text-[#B4B4B4]"
               } `}
                >
                  {i + 1}
                </h1>
              ))}
              <ChevronRightIcon
                onClick={() => setCurrentPage(currentPage + 1)}
                className={`h-6 w-6 cursor-pointer ${
                  currentPage === range ? "hidden" : " flex"
                } `}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductList;
