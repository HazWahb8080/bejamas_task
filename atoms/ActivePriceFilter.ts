import { atom } from "recoil";

export  const ActivePriceFilterState = atom({
  key: "ActivePriceFilterState", // unique ID (with respect to other atoms/selectors)
  default: {max:null,min:null}, // default value (aka initial value)
});
