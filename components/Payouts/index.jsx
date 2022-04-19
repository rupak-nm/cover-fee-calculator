import { SearchBar } from "@components/common/SearchBar";
import { CoverDropdown } from "@components/CoverDropdown";
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
  const [searchValue, setSearchValue] = useState("");
  const [selected, setSelected] = useState();

  useEffect(() => {
    setSelected(availableCovers[0]);
  }, []);

  return (
    <div className="py-18 mx-28">
      <h4 className="font-bold text-xl">Payouts</h4>
      <div className="py-8 pr-5 pl-11 bg-DAE2EB bg-opacity-30 mt-8 mb-6 flex">
        <SearchBar
          containerClass="w-full"
          searchValue={searchValue}
          onSearchChange={(e) => setSearchValue(e.target.value)}
        />
        <CoverDropdown
          options={availableCovers}
          selected={selected}
          setSelected={setSelected}
        />
      </div>
      <PayoutsTable />
    </div>
  );
};

export default Payouts;
