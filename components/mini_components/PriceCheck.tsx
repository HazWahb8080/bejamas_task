import React, { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import { useRecoilState } from "recoil";
import { ActivePriceFilterState } from "../../atoms/ActivePriceFilter";

interface Props {
  label: string;
  i: number;
  max: any;
  min: any;
}

function PriceCheck({ label, i, max, min }: Props) {
  // I used Recoil [state_management] in order to control the checkboxes' behavior and make it single filter
  const [activePriceFilter, setactivePriceFilter] = useRecoilState(
    ActivePriceFilterState
  );
  return (
    <div className="flex">
      <Checkbox
        value={max}
        checked={activePriceFilter.max === max && activePriceFilter.min === min}
        onChange={(e) =>
          !e.target.checked
            ? setactivePriceFilter({ max: null, min: null })
            : setactivePriceFilter({ max: max, min: min })
        }
        style={{ color: "black" }}
        disableRipple
      />
      <h1 className="self-center w-full font-medium">{label}</h1>
    </div>
  );
}

export default PriceCheck;
