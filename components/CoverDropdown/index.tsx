import { FC, Fragment, ReactNode } from "react";
import { Listbox, Transition } from "@headlessui/react";
import ChevronDownIcon from "@utils/SVG/ChevronDownIcon";
import { classNames } from "@utils/functions";


/* import { getCoverImgSrc } from "@/src/helpers/cover"; */

interface CoverDropdownProps {
    prefix?: string | ReactNode;
    options: any[];
    selected?: {projectName: string};
    setSelected: (val: any) => any;
} 

export const CoverDropdown:FC<CoverDropdownProps> = ({
  prefix = "",
  options,
  selected,
  setSelected,
}) => {
  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative w-fit">
        <Listbox.Button className="w-full relative  py-3 pl-4 pr-12 border border-B0C4DB bg-white rounded-lg cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-4e7dd9">
          <span className="flex items-center truncate text-text-gray pr-3 capitalize">
            {prefix}
            {selected?.projectName} cover
          </span>
          <span className="absolute inset-y-0 right-0 flex items-center pl-3 pr-2 pointer-events-none text-9B9B9B">
            <ChevronDownIcon className="w-6 h-6" aria-hidden="true" />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none">
            {options.map((option, optionIdx) => (
              <Listbox.Option
                key={optionIdx}
                id="reporting-dropdown"
                className={({ active }) =>
                  classNames(
                    `cursor-default select-none relative px-1`,
                    active ? "text-4e7dd9" : "text-black"
                  )
                }
                value={option}
              >
                {({ _selected, active }:{_selected: any, active: boolean}) => (
                  <>
                    <span
                      className={classNames(
                        `truncate px-4 py-2 flex items-center capitalize text-text-gray`,
                        _selected ? "font-medium" : "font-normal",
                        active ? "bg-EEEEEE bg-opacity-50 rounded-lg" : ""
                      )}
                    >

                      {option.projectName} cover
                    </span>
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};
