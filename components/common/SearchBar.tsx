import { FC, useState } from "react";
import SearchIcon from "@utils/SVG/SearchIcon";
import { classNames } from "@utils/functions";

interface SearchbarProps {
  containerClass?: string;
  searchClass?: string;
  searchValue: string;
  onSearchChange: Function
}

export const SearchBar:FC<SearchbarProps> = ({
  containerClass = "min-w-sm",
  searchClass = "w-full",
  searchValue = "",
  onSearchChange = () => {},
}) => {
  return (
    <div className={classNames("flex justify-between ", containerClass)}>
      <div className={classNames("flex items-center justify-end", searchClass)}>
        <div className="z-10 flex items-center justify-center text-9B9B9B">
          <SearchIcon width={16} height={16} stroke={"#9b9b9b"}/>
        </div>
        <input
          className={
            "w-full font-poppins text-base -ml-10 pl-15 pr-4 py-3 border border-B0C4DB bg-white rounded-lg placeholder-9B9B9B focus:outline-none focus-visible:ring-2 focus-visible:ring-4e7dd9"
          }
          placeholder="Search"
          value={searchValue}
          onChange={(e) => onSearchChange(e)}
        />

        
      </div>
    </div>
  );
};
