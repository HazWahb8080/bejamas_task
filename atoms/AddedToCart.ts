import { atom } from "recoil";

export const AddedToCartState = atom({
  key: "AddedToCartState", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});
export const OpenCartState = atom({
  key: "OpenCartState", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});
