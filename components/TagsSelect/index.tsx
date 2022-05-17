import { DownArrow, RemoveBtn } from "@svg";
import { arrayIncludes, classNames } from "@utils/functions";
import { useClickOutside } from "@utils/hooks/useClickOutside";
import { ChangeEvent, FC, KeyboardEventHandler, useRef, useState } from "react";
import { DropdownList } from "./DropdownList";

export type TagValue = { name: string; [key: string]: any };

interface TagsSelectProps {
  label: string;
  value: TagValue[];
  setValue: (val: TagValue[]) => any;
  className?: string;
  itemList: TagValue[];
  placeholder?: string;
  helpText?: string;
}

export const TagsSelect: FC<TagsSelectProps> = ({
  label,
  value,
  setValue,
  itemList,
  className = "",
  placeholder = "",
  helpText,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const divRef = useRef(null);
  useClickOutside(divRef, () => setOpen(false));

  const filterList = (list: TagValue[], query: string) => {
    const filteredList: TagValue[] = [];
    if (query && list.length) {
      list.map((item) => {
        if (item.name.toLowerCase().includes(query.toLowerCase()))
          filteredList.push(item);
      });
    } else return list;
    return filteredList;
  };

  const removeTags = (index: number) => {
    const arr = value;
    arr.splice(index, 1);
    setValue(arr);
    inputRef.current?.focus();
  };

  const addTag = (tag: { name: string; [key: string]: string }) => {
    const arr = value;
    arr.push(tag);
    setValue(arr);
  };

  const removeTag = (tag: { name: string; [key: string]: string }) => {
    let arr = value;
    arr = arr.filter((e) => e.name !== tag.name);
    setValue(arr);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val) setOpen(true);
    setInputValue(val);
  };

  const handleKeyDown = (e: KeyboardEvent | any) => {
    if (
      inputValue === "" &&
      (e.key === "Backspace" || e.code === "Backspace")
    ) {
      if (value.length) removeTags(value.length - 1);
    }
    if (
      e.key === "Escape" ||
      e.code === "Escape" ||
      e.key === "Tab" ||
      e.code === "Tab"
    )
      setOpen(false);
    if (e.key === "ArrowDown" || e.code === "ArrowDown") setOpen(true);
  };

  const handleItemSelect = (item: TagValue) => {
    if (!arrayIncludes(value, item)) addTag(item);
    else removeTag(item);
    inputRef?.current?.focus();
  };

  return (
    <div className="relative">
      <label className="text-sm font-semibold tracking-wider uppercase font-poppins text-prim-blue">
        {label}
      </label>
      <div ref={divRef}>
        <div
          className={classNames(
            "p-4 text-black mt-2 bg-white border outline-none border-border-gray font-poppins relative focus-within:shadow-input",
            className,
            open ? "rounded-t-lg" : "rounded-lg"
          )}
        >
          <div className="flex flex-wrap items-center gap-2 pr-6">
            {value.map((tag, index) => (
              <div
                key={index}
                className="relative flex items-center justify-between max-w-full gap-2 p-2 py-1 overflow-hidden text-sm text-white rounded-full bg-prim-blue"
              >
                <span className="overflow-hidden text-ellipsis">
                  {tag.name}
                </span>
                <span className="ml-2 bg-white rounded-lg cursor-pointer">
                  <RemoveBtn
                    onClick={() => removeTags(index)}
                    width={16}
                    height={16}
                    innerFill={"#01052D"}
                  >
                    close
                  </RemoveBtn>
                </span>
              </div>
            ))}
            <input
              placeholder={!value.length ? placeholder ?? "" : ""}
              value={inputValue}
              onChange={handleChange}
              onKeyDown={(e) => handleKeyDown(e)}
              onFocus={() => setOpen(true)}
              className={classNames(
                "block flex-1 min-w-100px h-7 pl-1 rounded-lg focus:outline-none focus-visible:none"
              )}
              ref={inputRef}
            />
          </div>
          <button
            className={classNames(
              "absolute right-2 top-1/2 transform -translate-y-1/2 p-2 hover:bg-black hover:bg-opacity-10 rounded-full"
            )}
            onClick={() => setOpen((val) => !val)}
          >
            <span className="sr-only">Open Dropdown</span>
            <DownArrow
              className={classNames(
                "w-4 h-4 transition-all",
                open ? "rotate-180" : "rotate-0"
              )}
            />
          </button>
        </div>

        <DropdownList
          open={open}
          selectedList={value}
          displayList={filterList(itemList, inputValue)}
          handleItemClick={handleItemSelect}
        />
      </div>
      {helpText && (
        <p className="pt-1 text-xs font-poppins text-text-gray">{helpText}</p>
      )}
    </div>
  );
};
