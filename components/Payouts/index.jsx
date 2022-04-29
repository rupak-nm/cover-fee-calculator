import { SearchBar } from "@components/common/SearchBar";
import { CoverDropdown } from "@components/CoverDropdown";
import { useCoversInfo } from "@utils/hooks/useCoversInfo";
import { useEffect, useState } from "react";
import { PayoutsTable } from "./PayoutsTable";

const availableCovers = [
  {
    projectName: "Huobi",
  },
  {
    projectName: "crystalpool",
  },
  {
    projectName: "ob1-ex",
  },
];

const Payouts = () => {
  return (
    <div
      className="px-4 py-18 sm:px-14 lg:px-28"
    >
      <h4 className="text-xl font-bold">Payouts</h4>
      <PayoutsTable />
    </div>
  );
};

export default Payouts;
