import { Checkbox } from "@components/Checkbox";
import { SVGCheckbox } from "@components/Checkbox/SVGCheckbox";
import { arrayIncludes, classNames } from "@utils/functions";
import { FC } from "react";
import { TagValue } from ".";

interface DropdownListProps {
  open: boolean;
  displayList: TagValue[];
  selectedList: TagValue[];
  handleItemClick: Function;
}

export const DropdownList: FC<DropdownListProps> = ({
  open,
  displayList,
  selectedList,
  handleItemClick,
}) => {
  return (
    <div
      className={classNames("absolute w-full z-50", open ? "block" : "hidden")}
    >
      <ul className="relative overflow-hidden overflow-y-auto bg-white border rounded-b-lg border-border-gray shadow-dropdown2 max-h-72">
        {displayList.length ? (
          <>
            {displayList.map((item, i) => (
              <li
                key={i}
                className={classNames("p-4 font-poppins hover:bg-DEEAF6")}
              >
                <SVGCheckbox
                  // id={`checkbox-${item.name}`}
                  className="w-4 h-4"
                  label={item.name}
                  checked={arrayIncludes(selectedList, item, "name")}
                  onChange={() => handleItemClick(item)}
                />
              </li>
            ))}
          </>
        ) : (
          <li className="p-2 italic text-center text-text-gray">
            No Data to show !!!
          </li>
        )}
      </ul>
    </div>
  );
};
